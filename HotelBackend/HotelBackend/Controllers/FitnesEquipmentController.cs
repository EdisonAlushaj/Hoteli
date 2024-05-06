using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FitnesEquipmentController : ControllerBase
    {
        public readonly DataContext _context;

        public FitnesEquipmentController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<FitnesEquipmet>>> GetAllFitnesEquipmet()
        {
            var fitnesEquipmet = await _context.FitnesEquipmets.ToListAsync();

            return Ok(fitnesEquipmet);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<FitnesEquipmet>>> GetFitnesEquipmet(int id)
        {
            var fitnesEq = await _context.FitnesEquipmets.FindAsync(id);
            if (fitnesEq == null)
                return NotFound("FitnesEquipmet not found");
            return Ok(fitnesEq);
        }

        [HttpPost]
        public async Task<ActionResult<FitnesEquipmet>> AddFitnesEquipment(FitnesEquipmet fitnesEquipmet)
        {
            _context.FitnesEquipmets.Add(fitnesEquipmet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFitnesEquipmet), new { id = fitnesEquipmet.Id }, fitnesEquipmet);
        }

        [HttpPatch]
        [Route("UpdateFitnesEquipmet/{id}")]
        public async Task<FitnesEquipmet> UpdateFitnesEquipmet(FitnesEquipmet objFitnesEquipmet)
        {
            _context.Entry(objFitnesEquipmet).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objFitnesEquipmet;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<FitnesEquipmet>>> DeleteFitnesEquipmet(int id)
        {
            var dbFitnesEq = await _context.FitnesEquipmets.FindAsync(id);
            if (dbFitnesEq == null)
                return NotFound("FitnesEquipmet not found");

            _context.FitnesEquipmets.Remove(dbFitnesEq);

            await _context.SaveChangesAsync();

            return Ok(await _context.FitnesEquipmets.ToListAsync()); ;
        }
    }
}
