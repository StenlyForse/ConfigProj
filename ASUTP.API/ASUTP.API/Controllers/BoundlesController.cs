using ASUTP.API.Data;
using Microsoft.AspNetCore.Mvc;
using ASUTP.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ASUTP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BoundlesController : Controller
    {
        private readonly ASUTPDbContext _aSUTPDbContext;

        public BoundlesController(ASUTPDbContext aSUTPDbContext)
        {
            _aSUTPDbContext = aSUTPDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddRecordToBoundles(string description)
        {
            BoundleElem boundleElem= new BoundleElem();
            boundleElem.Desc = description;

            await _aSUTPDbContext.Boundles.AddAsync(boundleElem);
            await _aSUTPDbContext.SaveChangesAsync();

            return Ok(boundleElem);

        }
    }
}
