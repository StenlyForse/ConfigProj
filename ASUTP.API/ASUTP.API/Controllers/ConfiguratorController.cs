﻿using ASUTP.API.Data;
using Microsoft.AspNetCore.Mvc;
using ASUTP.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ASUTP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfiguratorController : Controller
    {
        private readonly ASUTPDbContext _aSUTPDbContext;

        public ConfiguratorController(ASUTPDbContext aSUTPDbContext)
        {
            _aSUTPDbContext = aSUTPDbContext;
        }

        /// <summary>
        /// Возврат модулей К3 из каталога
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCatalogK3()
        {
            var controllerElemList = await _aSUTPDbContext.Catalog.Where(x => 
            x.Reference.StartsWith("K3.DO") || 
            x.Reference.StartsWith("K3.DI") ||
            x.Reference.StartsWith("K3.AO") ||
            x.Reference.StartsWith("K3.AI")).ToListAsync();

              var cpuElemList = await _aSUTPDbContext.Catalog.Where(x => 
            x.Reference.StartsWith("K3.TM") ||
            x.Reference.StartsWith("K3.IM")).ToListAsync();

            int maxBoundlesId = await _aSUTPDbContext.Boundles.MaxAsync(x => x.Id);
            int newId = maxBoundlesId + 1;
            string description = "Стандартное описание № " + newId;

            var curDateTime = DateTime.Now.ToString("dd.MM.yyyy hh:mm");

            var elementList = new {cpu = cpuElemList, controllers = controllerElemList, description = description, datetime = curDateTime, revision = 1 };

            return Ok(elementList);
        }

        /// <summary>
        /// Добавляет конфиги со старницы конфигурации в БД
        /// </summary>
        /// <param name="requestData"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddConfig([FromBody] CpuAndControllersData requestData)
        {
            var maxBoundleId = await _aSUTPDbContext.Boundles.MaxAsync(x => x.Id);
            var newBoundId = maxBoundleId + 1;

            // Имеет 2 ConfigArr[] - cpu и controllers + cpu и pm, которые получаем из бд
            var cpu = requestData.cpu;
            var controllers = requestData.controllers;

            var actionResultInvisibleCpuElems = await GetCpuElems(requestData.DublicatingCPU, newBoundId);
            var okResult = (OkObjectResult)actionResultInvisibleCpuElems.Result;
            var InvisibleCpuElems = okResult.Value;

            foreach (var elem in cpu)
            {
                elem.BoundleID = newBoundId;
            }
            foreach (var elem in controllers)
            {
                elem.BoundleID = newBoundId;
            }

            await _aSUTPDbContext.Configs.AddRangeAsync(cpu);
            await _aSUTPDbContext.Configs.AddRangeAsync(controllers);
            await _aSUTPDbContext.Configs.AddRangeAsync((ConfigsElem[])InvisibleCpuElems);
            await _aSUTPDbContext.SaveChangesAsync();

            if (requestData.Description == string.Empty)
            {
                requestData.Description = "Standart description #" + newBoundId;
            }

            // Добавляем строку в KPs_Master, пока хардкод
            KpMasterController kpMasterController = new KpMasterController(_aSUTPDbContext);
            OkObjectResult okState = (OkObjectResult)await kpMasterController.AddRecordToKPMaster(requestData.Description, requestData.Revision);
            int masterRecId = Convert.ToInt32(okState.Value);

            // Добавляем строку в KPs_Detail, пока хардкод
            KpDetailController kpDetailController = new KpDetailController(_aSUTPDbContext);
            await kpDetailController.AddRecordToKPDetail(7, newBoundId, masterRecId, 1);

            BoundlesController boundlesController = new BoundlesController(_aSUTPDbContext);
            await boundlesController.AddRecordToBoundles("Custom boundle #" + newBoundId);

            return Ok(newBoundId);
        }

        private async Task<ActionResult<ConfigsElem[]>> GetCpuElems(bool dublicating, int boundleID)
        {
            var PMElem = await _aSUTPDbContext.Catalog.FirstOrDefaultAsync(x =>x.Reference.StartsWith("K3.PM"));
            var CpuElem = await _aSUTPDbContext.Catalog.FirstOrDefaultAsync(x => x.Reference.StartsWith("K3.CPU"));

            var pmConfigElem = new ConfigsElem { Id = 0, CatalogId = PMElem.Id, Count = dublicating ? 2 : 1, BoundleID = boundleID };
            var cpuConfigElem = new ConfigsElem { Id = 0, CatalogId = CpuElem.Id, Count = dublicating ? 2 : 1, BoundleID = boundleID };

            return Ok(new ConfigsElem[] { pmConfigElem, cpuConfigElem });
        }

        // Возвращает список сборок
        [HttpGet("configList")]
        //[ActionName("GetConfigByBoundleId")]
        public async Task<IActionResult> GetBoundlesList()
        {

                var boundlesJoinCatalogList = _aSUTPDbContext.Boundles.Join(_aSUTPDbContext.KPs_Master,
                                                           b => b.Id,
                                                           k => k.Id,
                                                           (b, k) => new
                                                           {
                                                               Desc = k.Desc,
                                                               DateTimeKP = k.DateTime/*.ToString("dd.MM.yyyy hh:mm")*/,
                                                               Id = k.Id,
                                                               Revision = k.Revision
                                                           }).ToList();


                return Ok(boundlesJoinCatalogList);
        }

        // Возвращает сборку + KPMaster по переданному id
        [HttpGet]
        [Route("configList/{BoundleID:int}")]
        public async Task<IActionResult> GetConfigByBoundleId(/*[FromQuery(Name = "BoundleID")]*/[FromRoute] int BoundleID)
        {
            var nfi = (NumberFormatInfo)CultureInfo.InvariantCulture.NumberFormat.Clone();
            nfi.NumberGroupSeparator = " ";

            var KpMaster = await _aSUTPDbContext.KPs_Master.Where(x => x.Id == BoundleID).FirstOrDefaultAsync();

            var boundlesJoinCatalogList = await _aSUTPDbContext.Configs.Join(_aSUTPDbContext.Catalog,
                                                                       con => con.CatalogId,
                                                                       cat => cat.Id,
                                                                       (con, cat) => new BoundlesJoinCatalogElem
                                                                       {
                                                                           Id = con.Id,
                                                                           CatalogId = cat.Id,
                                                                           Reference = cat.Reference,
                                                                           BoundleID = con.BoundleID,
                                                                           Count = con.Count,
                                                                           ModuleCount = CalcModuleCount(cat.Reference, con.Count),
                                                                           Desc = cat.Desc,
                                                                           Currency = cat.Currency,
                                                                           Price_w_taxStr = cat.Price_w_tax.Value.ToString("#,0.00", nfi),
                                                                           Price_wo_taxStr = cat.Price_wo_tax.Value.ToString("#,0.00", nfi),
                                                                           Price_wo_tax = cat.Price_wo_tax,
                                                                           Price_w_tax = cat.Price_w_tax,
                                                                           VendorName = cat.VendorName,
                                                                           Total = decimal.Round((decimal)(CalcModuleCount(cat.Reference, con.Count) * cat.Price_wo_tax), 2, MidpointRounding.AwayFromZero),
                                                                           TotalStr = ((decimal)(CalcModuleCount(cat.Reference, con.Count) * cat.Price_wo_tax).Value).ToString("#,0.00", nfi)
                                                                       }).Where(x => x.BoundleID == BoundleID && x.Count > 0).ToListAsync();

            // Костыль для добавления элементам цпу стоимости и количества модулей - позже перенести цпу в отдельный архив
            boundlesJoinCatalogList.Where(x => x.Reference.Contains("CPU") ||
                                               x.Reference.Contains("IM")  ||
                                               x.Reference.Contains("TM")  ||
                                               x.Reference.Contains("PM")).ToList().ForEach(y => { y.ModuleCount = y.Count; 
                                                                                                 y.Total = decimal.Round((decimal)(y.Count * y.Price_wo_tax), 2, MidpointRounding.AwayFromZero);
                                                                                                 y.TotalStr = decimal.Round((decimal)((decimal)y.Count * y.Price_wo_tax), 2, MidpointRounding.AwayFromZero).ToString("#,0.00", nfi);
            });

            //var cpuList = boundlesJoinCatalogList.Where(x => x.CatalogId >= 55 && x.CatalogId <= 58).ToList();
            //boundlesJoinCatalogList.RemoveAll(x => x.CatalogId >= 55 && x.CatalogId <= 58);

            var total = boundlesJoinCatalogList.Select(x => x.Total).Sum() /*+ cpuList.Select(x => x.Total).Sum()*/;
            var pureNDS = total * (decimal)0.2;
            var totalWithNDS = total + pureNDS;

            string totalStr = $"{total.Value.ToString("#,0.00", nfi)}";
            string pureNDSStr = $"{pureNDS.Value.ToString("#,0.00", nfi)}";
            string totalWithNDSStr = $"{totalWithNDS.Value.ToString("#,0.00", nfi)}";

            return Ok(new ConfigsData
            {
                Title = KpMaster.Desc,
                DateTime = KpMaster.DateTime.ToString("dd.MM.yyyy hh:mm"),
                Revision = KpMaster.Revision,
                СonfigsElems = boundlesJoinCatalogList,
                //CpuElems = cpuList,
                Total = totalStr,
                PureNDS = pureNDSStr,
                TotalWithNDS = totalWithNDSStr
            });


        }

        /// <summary>
        /// Подсчет количества модулей на основе вычленения количества сигналов из названия модуля
        /// </summary>
        /// <param name="name"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        private static int CalcModuleCount(string name, int count)
        {
            try
            {
                var divider = Convert.ToInt32(name.Split('.')[3]);
                if (divider == 0 || count == 0)
                    return 0;

                return Convert.ToInt32(Math.Ceiling(count / (double)divider));
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        /// <summary>
        /// Изменение данных конфигурации на странице edit-config-page
        /// Изменяем count в БД, после этого на фронте перезагружаем страницу и он пересчитывает
        /// </summary>
        /// <param name="BoundleID">Id набора элементов бандла</param>
        /// <param name="updateBoundlesDataListRequest">Реквест содержащий шапку и массив элементов конфигурации</param>
        /// <returns></returns>
        [HttpPut]
        [Route("configList/{BoundleID:int}")] // изменили {id:Guid} на {id:int}
        public async Task<IActionResult> UpdateBoundlesDataList([FromRoute] /*Guid*/int BoundleID, ConfigsData updateBoundlesDataListRequest)
        {
            var KpMaster = await _aSUTPDbContext.KPs_Master.Where(x => x.Id == BoundleID).FirstOrDefaultAsync();
            var boundlesDataList = await _aSUTPDbContext.Configs.Where(x => x.BoundleID == BoundleID).ToListAsync();
            var requestConfigList = updateBoundlesDataListRequest.СonfigsElems;
            var requestCpuList = updateBoundlesDataListRequest.CpuElems;

            if (KpMaster != null && (KpMaster.Desc != updateBoundlesDataListRequest.Title || KpMaster.Revision != updateBoundlesDataListRequest.Revision))
            {
                KpMaster.Desc = updateBoundlesDataListRequest.Title;
                KpMaster.Revision = updateBoundlesDataListRequest.Revision;
            }

            foreach (var elemFromRequest in requestConfigList)
            {
                var elemFromDb = boundlesDataList.Find(x => x.Id == elemFromRequest.Id);
                //if (elemFromDb != null && elemFromDb.Count != elemFromRequest.Count)
                //{
                    // Костыль для изменения количества сигналов от ввода количества модулей, тк при создании в Count записывается количество сигналов - позже сделать пересчет количества сигналов в модули на фронте
                    elemFromDb.Count = elemFromRequest.ModuleCount * Convert.ToInt32(elemFromRequest.Reference.Split('.')[3]);
                //}
            }

            foreach (var elemFromRequest in requestCpuList)
            {
                var elemFromDb = boundlesDataList.Find(x => x.Id == elemFromRequest.Id);
                if (elemFromDb != null && elemFromDb.Count != elemFromRequest.Count)
                {
                    elemFromDb.Count = elemFromRequest.Count;
                }
            }

            await _aSUTPDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
