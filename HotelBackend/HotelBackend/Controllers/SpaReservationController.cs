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
    public class SpaReservationController : ControllerBase
    {
        private readonly DataContext _context;

        public SpaReservationController(DataContext context)
        {
            _context = context;
        }
        [HttpGet, Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<IEnumerable<SpaReservation>>> GetSpaReservation()
        {
            var SpaReservation = await _context.SpaReservations
                                        .Include(ur => ur.Userr)
                                        .Include(ur => ur.Spa)
                                        .ToListAsync();

            if (SpaReservation == null || SpaReservation.Count == 0)
                return NotFound("No spa reservations found");

            return Ok(SpaReservation);
        }

        [HttpGet("{id}"), Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<SpaReservation>> GetSpaReservationById(int id)
        {
            var SpaReservation = await _context.SpaReservations.FindAsync(id);

            if (SpaReservation == null)
                return NotFound("SpaReservation not found");
            return Ok(SpaReservation);
        }

        [HttpPost, Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<SpaReservation>> AddSpaReservation([FromQuery] string userId, [FromQuery] int spaId, [FromQuery] DateTime reservationStart)
        {
            var spa = await _context.Spas.FindAsync(spaId);
            if (spa == null)
            {
                return NotFound("Spa not found");
            }

            var reservationEnd = reservationStart.AddMinutes(spa.DurationInMinutes);

            // Check for overlapping reservations
            var overlappingReservations = await _context.SpaReservations
                .AnyAsync(r =>
                    r.SpaId == spaId &&
                    ((reservationStart >= r.ReservationDate && reservationStart < r.ReservationDate.AddMinutes(r.Spa.DurationInMinutes)) ||
                    (reservationEnd > r.ReservationDate && reservationEnd <= r.ReservationDate.AddMinutes(r.Spa.DurationInMinutes))));

            if (overlappingReservations)
            {
                return Conflict("This spa is already reserved during the selected time slot.");
            }

            var reservation = new SpaReservation
            {
                Id = userId,
                SpaId = spaId,
                ReservationDate = reservationStart
            };

            _context.SpaReservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSpaReservationById), new { id = reservation.ReservationId }, reservation);
        }
    

        [HttpDelete("{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<SpaReservation>> DeleteSpaReservation(int id)
        {
            var SpaReservation = await _context.SpaReservations.FindAsync(id);

            if (SpaReservation == null)
                return NotFound("Spa Reservation not found");

            _context.SpaReservations.Remove(SpaReservation);
            await _context.SaveChangesAsync();

            return Ok(await _context.SpaReservations.ToListAsync());
        }
    }
}
