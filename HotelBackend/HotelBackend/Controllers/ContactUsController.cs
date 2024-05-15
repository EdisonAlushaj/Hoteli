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
    public class ContactUsController : ControllerBase
    {
        private readonly DataContext _context;

        public ContactUsController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Userr>> Contact(ContactRequest contactRequest)
        {


            Console.WriteLine("Received login request for Name: " + contactRequest.Name);
            var user = await _context.Userrs.FirstOrDefaultAsync(u => u.UserFullName == contactRequest.Name);

            if (user == null)
            {
                return NotFound("User not found");
            }

         
           

            if (user.UserEmail != contactRequest.Email)
            {
                return NotFound("Write invalid email");
            }
            return Ok(user);
        }
    }

    public class ContactRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }

    }
}