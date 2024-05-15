using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactRequest>>> GetAllContactRequests()
        {
            var contactRequests = await _context.ContactRequests.ToListAsync();
            return Ok(contactRequests);
        }
        [HttpPost]
        public async Task<ActionResult<ContactRequest>> Contact(ContactRequest contactRequest)
        {
            Console.WriteLine("Received contact request for Name: " + contactRequest.Name);

            var user = await _context.Userrs.FirstOrDefaultAsync(u => u.UserFullName == contactRequest.Name);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (user.UserEmail != contactRequest.Email)
            {
                return BadRequest("Invalid email");
            }

            // Create a response object with name, email, and message
            var contactResponse = new ContactRequest
            {
                Name = contactRequest.Name,
                Email = contactRequest.Email,
                Message = contactRequest.Message
            };

            // Add the contact request to the context and save changes
            _context.ContactRequests.Add(contactResponse);
            await _context.SaveChangesAsync();

            return Ok(contactResponse);
        }
    }
    }
    public class ContactRequest
        {
    [Key] // Define Id as the primary key
    public int Id { get; set; }
    public string Name { get; set; }
            public string Email { get; set; }
            public string Message { get; set; }
        }
    
