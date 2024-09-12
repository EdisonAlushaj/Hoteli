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
    public class FitnesApplyController : ControllerBase
    {
        private readonly DataContext _context;

        public FitnesApplyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<IEnumerable<FitnesApply>>> GetFitnesApply()
        {
            var FitnesApply = await _context.FitnesApplys
                                        .Include(ur => ur.Userr)
                                        .Include(ur => ur.Fitnes)
                                        .ToListAsync();

            if (FitnesApply == null || FitnesApply.Count == 0)
                return NotFound("No FitnesApplies found");

            return Ok(FitnesApply);
        }


        [HttpGet("{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<FitnesApply>> GetFitnesApplyById(int id)
        {
            var FitnesApply = await _context.FitnesApplys.FindAsync(id);

            if (FitnesApply == null)
                return NotFound("FitnesApply not found");
            return Ok(FitnesApply);
        }

        [HttpPost, Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<FitnesApply>> AddFitnesApply([FromQuery] string userId, [FromQuery] int fitnesId)
        {

            var applyExists = await _context.Fitness.AnyAsync(s => s.Id == fitnesId);
            if (!applyExists)
            {
                return NotFound("Fitnes Apply not found");
            }

            var reservation = new FitnesApply
            {
                Id = userId,
                FitnesId = fitnesId
            };

            _context.FitnesApplys.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFitnesApplyById), new { id = reservation.ReservationId }, reservation);
        }


        [HttpDelete("{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<FitnesApply>> DeleteFitnesApply(int id)
        {
            var FitnesApply = await _context.FitnesApplys.FindAsync(id);

            if (FitnesApply == null)
                return NotFound("Fitnes Apply not found not found");

            _context.FitnesApplys.Remove(FitnesApply);
            await _context.SaveChangesAsync();

            return Ok(await _context.FitnesApplys.ToListAsync());
        }
    }
}
