using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpaController : ControllerBase
    {
        public readonly DataContext _context;

        public SpaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<Spa>>> GetAllSpas()
        {
            var spa = await _context.Spas.ToListAsync();

            return Ok(spa);
        }


        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<List<Spa>>> GetSpa(int id)
        {
            var spa = await _context.Spas.FindAsync(id);
            if (spa == null)
                return NotFound("Spa not found");
            return Ok(spa);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<List<Spa>>> AddSpa(Spa spa)
        {
            _context.Spas.Add(spa);
            await _context.SaveChangesAsync();

            return Ok(await _context.Spas.ToListAsync()); ;
        }

        [HttpPatch, Authorize]
        [Route("UpdateSpa/{id}")]
        public async Task<Spa> UpdateSpa(Spa objSpa)
        {
            _context.Entry(objSpa).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objSpa;
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<Spa>>> DeleteSpa(int id)
        {
            var dbSpa = await _context.Spas.FindAsync(id);
            if (dbSpa == null)
                return NotFound("Spa not found");

            _context.Spas.Remove(dbSpa);

            await _context.SaveChangesAsync();

            return Ok(await _context.Spas.ToListAsync()); ;
        }
    }
}
