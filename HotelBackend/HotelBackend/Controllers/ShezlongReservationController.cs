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
    public class ShezlongReservationController : ControllerBase
    {
        private readonly DataContext _context;

        public ShezlongReservationController(DataContext context)
        {
            _context = context;
        }
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<ShezlongReservation>>> GetShezlongReservation()
        {
            var shezlongreservation = await _context.ShezlongReservations
                                        .Include(ur => ur.Userr)
                                        .Include(ur => ur.Shezlong)
                                        .ToListAsync();

            if (shezlongreservation == null || shezlongreservation.Count == 0)
                return NotFound("No user roles found");

            return Ok(shezlongreservation);
        }


        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<ShezlongReservation>> GetShezlongReservationById(int id)
        {
            var ShezlongReservation = await _context.ShezlongReservations.FindAsync(id);

            if (ShezlongReservation == null)
                return NotFound("ShezlongReservation not found");
            return Ok(ShezlongReservation);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<ShezlongReservation>> AddShezlongReservation([FromQuery] string userId, [FromQuery] int shezlongId, [FromQuery] DateTime reservationDate)
        {
            // Check if the shezlong is already reserved on the selected date
            var existingReservation = await _context.ShezlongReservations.FirstOrDefaultAsync(ur => ur.ShezlongId == shezlongId && ur.ReservationDate.Date == reservationDate.Date);

            if (existingReservation != null)
            {
                // If a reservation already exists for the same shezlong and date, return a conflict response
                return Conflict("This shezlong is already reserved on the selected date.");
            }

            // If no existing reservation, proceed with shezlong validation
            var shezlongExists = await _context.Shezlongs.AnyAsync(s => s.Id == shezlongId);
            if (!shezlongExists)
            {
                return NotFound("Shezlong not found");
            }

            // Create the reservation
            var reservation = new ShezlongReservation
            {
                Id = userId,
                ShezlongId = shezlongId,
                ReservationDate = reservationDate
            };

            _context.ShezlongReservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShezlongReservationById), new { id = reservation.ReservationId }, reservation);
        }


        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<ShezlongReservation>> DeleteShezlongReservation(int id)
        {
            var shezlongReservation = await _context.ShezlongReservations.FindAsync(id);

            if (shezlongReservation == null)
                return NotFound("Shezlong not found not found");

            _context.ShezlongReservations.Remove(shezlongReservation);
            await _context.SaveChangesAsync();

            return Ok(await _context.ShezlongReservations.ToListAsync());
        }





    }
}
