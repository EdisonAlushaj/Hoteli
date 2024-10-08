﻿using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<ContactRequest>>> GetAllContactRequests()
        {
            var contactRequests = await _context.ContactRequests.ToListAsync();
            return Ok(contactRequests);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<ContactRequest>> Contact([FromBody] ContactRequest contactRequest)
        {
            Console.WriteLine("Received contact request for Name: " + contactRequest.Name);

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
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
}
