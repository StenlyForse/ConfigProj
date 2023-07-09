using ASUTP.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace ASUTP.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly ASUTPDbContext _aSUTPDbContext;

        public UserController(ASUTPDbContext aSUTPDbContext)
        {
            _aSUTPDbContext = aSUTPDbContext;
        }

        [HttpGet]
        [Route("auth")]
        public async Task<IActionResult> AuthUser(string username, string password)
        {
            var userElem = _aSUTPDbContext.Users.SingleOrDefault(user => user.Username == username);

            if (userElem == null)
            {
                return NotFound();
            }

            if (password == userElem.Password)
                return Ok();
            else
                return NotFound();
        }
    }
}
