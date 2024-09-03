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
    public class SaunaController : ControllerBase
    {
        public readonly DataContext _context;

        public SaunaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<Sauna>>> GetAllSaunas()
        {
            var saunas = await _context.Saunas.ToListAsync();

            return Ok(saunas);
        }


        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<List<Sauna>>> GetSauna(int id)
        {
            var saunas = await _context.Saunas.FindAsync(id);
            if (saunas == null)
                return NotFound("Sauna not found");
            return Ok(saunas);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<Sauna>> AddSauna(Sauna saunas)
        {
            _context.Saunas.Add(saunas);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSauna), new { id = saunas.Id }, saunas);
        }


        [HttpPatch, Authorize]
        [Route("UpdateSauna/{id}")]
        public async Task<Sauna> UpdateSauna(Sauna objSauna)
        {
            _context.Entry(objSauna).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objSauna;
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<Sauna>>> DeleteSauna(int id)
        {
            var dbSauna = await _context.Saunas.FindAsync(id);
            if (dbSauna == null)
                return NotFound("Sauna not found");

            _context.Saunas.Remove(dbSauna);

            await _context.SaveChangesAsync();

            return Ok(await _context.Saunas.ToListAsync()); ;
        }
    }
}
