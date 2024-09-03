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
    public class FitnesController : ControllerBase
    {
        public readonly DataContext _context;

        public FitnesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<Fitnes>>> GetAllFitness()
        {
            var Fitness = await _context.Fitness.ToListAsync();
            return Ok(Fitness);
        }


        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<List<Fitnes>>> GetFitnes(int id)
        {
            var Fitnes = await _context.Fitness.FindAsync(id);
            if (Fitnes == null)
                return NotFound("Fitnes not found");
            return Ok(Fitnes);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<Fitnes>> AddFitness(Fitnes fitnes)
        {
            _context.Fitness.Add(fitnes);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFitnes), new { id = fitnes.Id }, fitnes);
        }

        [HttpPatch, Authorize]
        [Route("UpdateFitnes/{id}")]
        public async Task<Fitnes> UpdateFitnes(Fitnes objFitnes)
        {
            _context.Entry(objFitnes).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objFitnes;
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<Fitnes>>> DeleteFitnes(int id)
        {
            var dbFitnes = await _context.Fitness.FindAsync(id);
            if (dbFitnes == null)
                return NotFound("Fitnes not found");

            _context.Fitness.Remove(dbFitnes);

            await _context.SaveChangesAsync();

            return Ok(await _context.Fitness.ToListAsync()); ;
        }
    }
}
