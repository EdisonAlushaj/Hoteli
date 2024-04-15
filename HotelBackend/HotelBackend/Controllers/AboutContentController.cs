using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutContentController : ControllerBase
    {
        public readonly DataContext _context;

        public AboutContentController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<AboutContent>>> GetAllAbout()
        {
            var about = await _context.AboutContents.ToListAsync();

            return Ok(about);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<AboutContent>>> GetAbout(int id)
        {
            var about = await _context.AboutContents.FindAsync(id);
            if (about == null)
                return NotFound("Room not found");
            return Ok(about);
        }

        [HttpPost]
        public async Task<ActionResult<List<Room>>> AddRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return Ok(await _context.Rooms.ToListAsync()); ;
        }

        [HttpPut()]
        public async Task<ActionResult<List<AboutContent>>> UpdateAbout(AboutContent updatedAbout)
        {
            var dbAbout = await _context.AboutContents.FindAsync(updatedAbout.Id);
            if (dbAbout == null)
                return NotFound("About not found");

            dbAbout.Description = updatedAbout.Description;
            dbAbout.Image = updatedAbout.Image;
            
            

            await _context.SaveChangesAsync();

            return Ok(await _context.AboutContents.ToListAsync()); ;
        }

        [HttpDelete]
        public async Task<ActionResult<List<AboutContent>>> DeleteAbout(int id)
        {
            var dbAbout = await _context.AboutContents.FindAsync(id);
            if (dbAbout == null)
                return NotFound("Room not found");

            _context.AboutContents.Remove(dbAbout);

            await _context.SaveChangesAsync();

            return Ok(await _context.AboutContents.ToListAsync()); ;
        }
    }
}
