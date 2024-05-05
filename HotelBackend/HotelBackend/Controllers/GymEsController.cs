using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymEsController : ControllerBase
    {
        public readonly DataContext _context;

        public GymEsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<GymE>>> GetAllGymE()
        {
            var gymEs = await _context.GymEs.ToListAsync();

            return Ok(gymEs);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<GymE>>> GetGymE(int id)
        {
            var room = await _context.GymEs.FindAsync(id);
            if (room == null)
                return NotFound("GymE not found");
            return Ok(room);
        }

        [HttpPost]
        public async Task<ActionResult<List<GymE>>> AddGymE(GymE gymE)
        {
            _context.GymEs.Add(gymE);
            await _context.SaveChangesAsync();

            return Ok(await _context.GymEs.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateGymE/{id}")]
        public async Task<GymE> UpdateGymE(GymE objGymE)
        {
            _context.Entry(objGymE).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objGymE;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<GymE>>> DeleteGymE(int id)
        {
            var dbRoom = await _context.GymEs.FindAsync(id);
            if (dbRoom == null)
                return NotFound("GymE not found");

            _context.GymEs.Remove(dbRoom);

            await _context.SaveChangesAsync();

            return Ok(await _context.GymEs.ToListAsync()); ;
        }
    }
}
