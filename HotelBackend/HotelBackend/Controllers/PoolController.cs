using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoolController : ControllerBase
    {
        public readonly DataContext _context;

        public PoolController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Pool>>> GetAllPools()
        {
            var Pools = await _context.Pools.ToListAsync();

            return Ok(Pools);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<Pool>>> GetPool(int id)
        {
            var Pool = await _context.Pools.FindAsync(id);
            if (Pool == null)
                return NotFound("Pool not found");
            return Ok(Pool);
        }

        [HttpPost]
        public async Task<ActionResult<Pool>> AddPool(Pool pool)
        {
            _context.Pools.Add(pool);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPool), new { id = pool.Id }, pool);
        }


        [HttpPatch]
        [Route("UpdatePool/{id}")]
        public async Task<Pool> UpdatePool(Pool objPool)
        {
            _context.Entry(objPool).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objPool;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Pool>>> DeletePool(int id)
        {
            var dbPool = await _context.Pools.FindAsync(id);
            if (dbPool == null)
                return NotFound("Pool not found");

            _context.Pools.Remove(dbPool);

            await _context.SaveChangesAsync();

            return Ok(await _context.Pools.ToListAsync()); ;
        }
    }
}
