using ASUTP.API.Data;
using Microsoft.AspNetCore.Mvc;
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
    }
}
