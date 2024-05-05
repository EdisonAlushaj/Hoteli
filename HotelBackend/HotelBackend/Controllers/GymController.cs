using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymController : ControllerBase
    {
        public readonly DataContext _context;

        public GymController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Gym>>> GetAllGyms()
        {
            var gyms = await _context.Gymss.ToListAsync();

            return Ok(gyms);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<Gym>>> GetGym(int id)
        {
            var gym = await _context.Gymss.FindAsync(id);
            if (gym == null)
                return NotFound("Gym not found");
            return Ok(gym);
        }

        [HttpPost]
        public async Task<ActionResult<List<Gym>>> AddGym(Gym gym)
        {
            _context.Gymss.Add(gym);
            await _context.SaveChangesAsync();

            return Ok(await _context.Gymss.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateGym/{id}")]
        public async Task<Gym> UpdateGym(Gym objGym)
        {
            _context.Entry(objGym).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objGym;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Gym>>> DeleteGym(int id)
        {
            var dbGym = await _context.Gymss.FindAsync(id);
            if (dbGym == null)
                return NotFound("Gym not found");

            _context.Gymss.Remove(dbGym);

            await _context.SaveChangesAsync();

            return Ok(await _context.Gymss.ToListAsync()); ;
        }
    }
}
