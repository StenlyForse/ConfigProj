using ASUTP.API.Data;
using Microsoft.AspNetCore.Mvc;
using ASUTP.API.Models;
using Microsoft.EntityFrameworkCore;

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
            string[] outputElem = new string[] { "K3.DI", "K3.DO", "K3.AI", "K3.AO" };
            //var catalogElemList = await _aSUTPDbContext.Catalog.Where(x => outputElem.All(y => x.Name.StartsWith(y))).ToListAsync();
            var catalogElemList = await _aSUTPDbContext.Catalog.Where(x => x.Name.StartsWith("K3.DO") || 
            x.Name.StartsWith("K3.DI") ||
            x.Name.StartsWith("K3.AO") ||
            x.Name.StartsWith("K3.AI")).ToListAsync();

            return Ok(catalogElemList);
        }

        /// <summary>
        /// Добавляет конфиги со старницы конфигурации в БД
        /// </summary>
        /// <param name="requestData"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddConfig([FromBody] ConfigsElem[] requestData)
        {
            var maxBoundleId = await _aSUTPDbContext.Configs.MaxAsync(x => x.BoundleID);
            foreach (var elem in requestData)
            {
                elem.BoundleID = maxBoundleId + 1;
            }
            await _aSUTPDbContext.Configs.AddRangeAsync(requestData);
            await _aSUTPDbContext.SaveChangesAsync();

            // Добавляем строку в KPs_Master, пока хардкод
            KpMasterController kpMasterController = new KpMasterController(_aSUTPDbContext);
            OkObjectResult okState = (OkObjectResult)await kpMasterController.AddRecordToKPMaster("Standart description", 1);
            int masterRecId = Convert.ToInt32(okState.Value);

            // Добавляем строку в KPs_Detail, пока хардкод
            KpDetailController kpDetailController = new KpDetailController(_aSUTPDbContext);
            await kpDetailController.AddRecordToKPDetail(7, maxBoundleId + 1, masterRecId, 1);

            return Ok(maxBoundleId + 1);
        }

        // Возвращает либо уникальные id сборок, либо саму сборку по переданному id
       [HttpGet("configList")]
        [ActionName("GetConfigByBoundleId")]
        public async Task<IActionResult> GetConfigByBoundleId([FromQuery(Name = "BoundleID")] int BoundleID)
        {
            if (BoundleID == 0)
            {
                var boundlesDistinct = await _aSUTPDbContext.Configs.Select(x => x.BoundleID).Distinct().ToListAsync();

                return Ok(boundlesDistinct);
            }
            else
            {
                var boundlesList = await _aSUTPDbContext.Configs.Where(x => x.BoundleID == BoundleID).ToListAsync();

                var boundlesJoinCatalogList = _aSUTPDbContext.Configs.Join(_aSUTPDbContext.Catalog,
                                                                           con => con.CatalogId,
                                                                           cat => cat.Id,
                                                                           (con, cat) => new
                                                                           {
                                                                               Name = cat.Name,
                                                                               BoundleID = con.BoundleID,
                                                                               Count = con.Count,
                                                                               ModuleCount = CalcModuleCount(cat.Name, con.Count)
                                                                           }).Where(x => x.BoundleID == BoundleID).ToList();


                return Ok(boundlesJoinCatalogList);
            }
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
    }
}
