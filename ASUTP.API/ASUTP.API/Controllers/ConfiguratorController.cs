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
            return Ok(requestData);
        }

        // Добавить страницу под это дело
        [HttpGet("configList")]
        public async Task<IActionResult> GetBoundlesList()
        {
            var boundlesDistinct = await _aSUTPDbContext.Configs.Select(x => x.BoundleID).Distinct().ToListAsync();

            return Ok(boundlesDistinct);
        }
    }
}
