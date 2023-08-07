using ASUTP.API.Data;
using Microsoft.AspNetCore.Mvc;
using ASUTP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ASUTP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KpDetailController : Controller
    {
        private readonly ASUTPDbContext _aSUTPDbContext;

        public KpDetailController(ASUTPDbContext aSUTPDbContext)
        {
            _aSUTPDbContext = aSUTPDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddRecordToKPDetail(int chapterId, int boundleId, int parentId, int count)
        {
            KpDetailElem kpDetailElem = new KpDetailElem();
            kpDetailElem.ChapterId = chapterId;
            kpDetailElem.BoundleId = boundleId;
            kpDetailElem.ParentId = parentId;
            kpDetailElem.Count = count;

            await _aSUTPDbContext.KPs_Detail.AddAsync(kpDetailElem);
            await _aSUTPDbContext.SaveChangesAsync();

            return Ok();

        }

    }
}
