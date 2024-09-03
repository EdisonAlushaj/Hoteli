using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoolController : ControllerBase
    {
        private readonly DataContext _context;

        public PoolController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Pool
        [HttpGet, Authorize]
        public async Task<ActionResult<List<Pool>>> GetAllPools()
        {
            var pools = await _context.Pools.ToListAsync();
            return Ok(pools);
        }

        // GET: api/Pool/{id}
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<Pool>> GetPool(int id)
        {
            var pool = await _context.Pools.FindAsync(id);
            if (pool == null)
                return NotFound("Pool not found");
            return Ok(pool);
        }

        // POST: api/Pool
        [HttpPost, Authorize]
        public async Task<ActionResult<Pool>> AddPool(Pool pool)
        {
            _context.Pools.Add(pool);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPool), new { id = pool.Id }, pool);
        }

        // PATCH: api/Pool/{id}
        [HttpPatch("{id}"), Authorize]
        public async Task<IActionResult> UpdatePool(int id, Pool pool)
        {
            if (id != pool.Id)
                return BadRequest("ID mismatch");

            _context.Entry(pool).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Pools.Any(e => e.Id == id))
                    return NotFound("Pool not found");
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Pool/{id}
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeletePool(int id)
        {
            var pool = await _context.Pools.FindAsync(id);
            if (pool == null)
                return NotFound("Pool not found");

            _context.Pools.Remove(pool);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
