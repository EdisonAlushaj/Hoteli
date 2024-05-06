using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShezlongController : ControllerBase
    {
        public readonly DataContext _context;

        public ShezlongController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Shezlong>>> GetAllShezlongs()
        {
            var Shezlongs = await _context.Shezlongs.ToListAsync();

            return Ok(Shezlongs);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<Shezlong>>> GetShezlong(int id)
        {
            var Shezlong = await _context.Shezlongs.FindAsync(id);
            if (Shezlong == null)
                return NotFound("Shezlong not found");
            return Ok(Shezlong);
        }

        [HttpPost]
        public async Task<ActionResult<Shezlong>> AddShezlong(Shezlong shezlong)
        {
            _context.Shezlongs.Add(shezlong);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShezlong), new { id = shezlong.Id }, shezlong);
        }


        [HttpPatch]
        [Route("UpdateShezlong/{id}")]
        public async Task<Shezlong> UpdateShezlong(Shezlong objShezlong)
        {
            _context.Entry(objShezlong).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objShezlong;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Shezlong>>> DeleteShezlong(int id)
        {
            var dbShezlong = await _context.Shezlongs.FindAsync(id);
            if (dbShezlong == null)
                return NotFound("Shezlong not found");

            _context.Shezlongs.Remove(dbShezlong);

            await _context.SaveChangesAsync();

            return Ok(await _context.Shezlongs.ToListAsync()); ;
        }
    }
}
