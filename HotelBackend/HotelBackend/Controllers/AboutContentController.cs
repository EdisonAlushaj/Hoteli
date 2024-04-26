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
        public async Task<ActionResult<List<AboutContent>>> AddAbout(AboutContent about)
        {
            _context.AboutContents.Add(about);
            await _context.SaveChangesAsync();

            return Ok(await _context.AboutContents.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateAbout/{id}")]
        public async Task<AboutContent> UpdateAbout(AboutContent objAbout)
        {
            _context.Entry(objAbout).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objAbout;
        }

        [HttpDelete("{id}")]
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
