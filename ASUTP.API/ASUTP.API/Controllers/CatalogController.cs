using ASUTP.API.Data;
using ASUTP.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASUTP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : Controller
    {
        private readonly ASUTPDbContext _aSUTPDbContext;

        public CatalogController(ASUTPDbContext aSUTPDbContext)
        {
            _aSUTPDbContext = aSUTPDbContext;
        }

        [HttpGet]
        public async Task <IActionResult> GetCatalog()
        {
            var catalogElemList = await _aSUTPDbContext.Catalog.ToListAsync();

            return Ok(catalogElemList);
        }

        [HttpPost]
        public async Task<IActionResult> AddCatalogElem([FromBody] CatalogElem catalogElemRequest)
        {
            //catalogElemRequest.Id = await _aSUTPDbContext.Catalog.MaxAsync(t => t.Id) + 1; //0 /*Guid.NewGuid()*/; //переделали guid в int, также убрали Guid.NewGuid()
            // с айдишником ошибка, так как автоинкрементация включена на уровне БД
            await _aSUTPDbContext.AddAsync(catalogElemRequest);
            await _aSUTPDbContext.SaveChangesAsync();

            return Ok(catalogElemRequest);
        }

        [HttpGet]
        [Route("{id:int}")] // изменили {id:Guid} на {id:int}
        public async Task<IActionResult> GetCatalogElem([FromRoute] /*Guid*/ int id) //переделали guid в int
        {
            var catalogElem = await _aSUTPDbContext.Catalog.FirstOrDefaultAsync(x => x.Id == id);

            if (catalogElem == null)
            {
                return NotFound();
            }

            return Ok(catalogElem);
        }

        [HttpPut]
        [Route("{id:int}")] // изменили {id:Guid} на {id:int}
        public async Task<IActionResult> UpdateCatalogElem([FromRoute] /*Guid*/int id, CatalogElem updateCatalogElemRequest)
        {
            var catalogElem = await _aSUTPDbContext.Catalog.FindAsync(id);

            if(catalogElem == null)
            {
                return NotFound();
            }

            //catalogElem.Element = updateCatalogElemRequest.Element;
            catalogElem.Reference = updateCatalogElemRequest.Reference;
            catalogElem.Name = updateCatalogElemRequest.Name;
            catalogElem.Price_wo_tax = updateCatalogElemRequest.Price_wo_tax;
            catalogElem.Currency = updateCatalogElemRequest.Currency;
            catalogElem.Comment = updateCatalogElemRequest.Comment;

            await _aSUTPDbContext.SaveChangesAsync();
            return Ok(catalogElem);
        }

        [HttpDelete]
        [Route("{id:int}")] // изменили {id:Guid} на {id:int}
        public async Task<IActionResult> DeleteCatalogElem([FromRoute] /*Guid */ int id)
        {
            var catalogElem = await _aSUTPDbContext.Catalog.FindAsync(id);

            if (catalogElem == null)
            {
                return NotFound();
            }

            _aSUTPDbContext.Catalog.Remove(catalogElem);
            await _aSUTPDbContext.SaveChangesAsync();

            return Ok(catalogElem);
        }
    }
}
