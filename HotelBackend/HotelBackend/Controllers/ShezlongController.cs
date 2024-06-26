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
        public async Task<ActionResult<IEnumerable<Shezlong>>> GetAllShezlongs()
        {
            var spa = await _context.Shezlongs.ToListAsync();
            return Ok(spa);
        }
        [HttpGet("byPool")]
        public async Task<ActionResult<IEnumerable<Shezlong>>> GetShezlongs([FromQuery] int poolId)
        {
            return await _context.Shezlongs.Where(s => s.PoolId == poolId).ToListAsync();
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
        public async Task<IActionResult> UpdateShezlong(int id, Shezlong updatedShezlong)
        {
            var existingShezlong = await _context.Shezlongs.FindAsync(id);

            if (existingShezlong == null)
            {
                return NotFound("Shezlong not found");
            }

            // Update the properties of the existing entity
            existingShezlong.PoolId = updatedShezlong.PoolId; // Assuming poolId is the property you want to update

            try
            {
                // Attempt to save changes
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // If another user has modified the same entity, handle concurrency conflict
                if (!_context.Shezlongs.Any(e => e.Id == id))
                {
                    return NotFound("Shezlong not found");
                }
                else
                {
                    // Reload the entity from the database to get the latest values
                    _context.Entry(existingShezlong).Reload();
                    // You can implement custom logic here, like merging changes or throwing an error
                    // For simplicity, let's return a conflict status with the updated entity
                    return Conflict(existingShezlong);
                }
            }

            // Return the updated entity
            return Ok(existingShezlong);
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
