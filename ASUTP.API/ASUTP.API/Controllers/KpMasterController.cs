using ASUTP.API.Data;
using Microsoft.AspNetCore.Mvc;
using ASUTP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ASUTP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KpMasterController : Controller
    {
        private readonly ASUTPDbContext _aSUTPDbContext;

        public KpMasterController(ASUTPDbContext aSUTPDbContext)
        {
            _aSUTPDbContext = aSUTPDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddRecordToKPMaster(string description, int revision)
        {
            KpMasterElem kpMasterElem = new KpMasterElem();
            kpMasterElem.DateTime = DateTime.Now;
            kpMasterElem.Desc = description;
            kpMasterElem.Revision = revision;
            await _aSUTPDbContext.KPs_Master.AddAsync(kpMasterElem);
            await _aSUTPDbContext.SaveChangesAsync();

            int id = kpMasterElem.Id;

            return Ok(id);

        }
    }
}
