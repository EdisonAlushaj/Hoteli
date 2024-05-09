using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowReactApp")] // Ensure this policy name matches the one you defined
    public class LoginController : ControllerBase
    {
        private readonly DataContext _context;

        public LoginController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Userr>> Login(LoginRequest loginRequest)
        {
            Console.WriteLine("Received login request for email: " + loginRequest.Email);
            var user = await _context.Userrs.FirstOrDefaultAsync(u => u.UserEmail == loginRequest.Email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (user.UserPassword != loginRequest.Password)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(user);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
