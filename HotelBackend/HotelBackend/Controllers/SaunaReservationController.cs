using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaunaReservationController : ControllerBase
    {
        private readonly DataContext _context;

        public SaunaReservationController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaunaReservation>>> GetSaunaReservation()
        {
            var SaunaReservation = await _context.SaunaReservations
                                        .Include(ur => ur.Userr)
                                        .Include(ur => ur.Sauna)
                                        .ToListAsync();

            if (SaunaReservation == null || SaunaReservation.Count == 0)
                return NotFound("No sauna reservations found");

            return Ok(SaunaReservation);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<SaunaReservation>> GetSaunaReservationById(int id)
        {
            var SaunaReservation = await _context.SaunaReservations.FindAsync(id);

            if (SaunaReservation == null)
                return NotFound("SaunaReservation not found");
            return Ok(SaunaReservation);
        }

        [HttpPost]
        public async Task<ActionResult<SaunaReservation>> AddSaunaReservation([FromQuery] int userId, [FromQuery] int saunaId, [FromQuery] DateTime reservationDate)
        {
            var existingReservation = await _context.SaunaReservations.FirstOrDefaultAsync(ur => ur.SaunaId == saunaId && ur.ReservationDate.Date == reservationDate.Date);

            if (existingReservation != null)
            {
                return Conflict("This sauna is already reserved on the selected date.");
            }

            var saunaExists = await _context.Saunas.AnyAsync(s => s.Id == saunaId);
            if (!saunaExists)
            {
                return NotFound("Sauna not found");
            }

            var reservation = new SaunaReservation
            {
                UserId = userId,
                SaunaId = saunaId,
                ReservationDate = reservationDate
            };

            _context.SaunaReservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSaunaReservationById), new { id = reservation.ReservationId }, reservation);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<SaunaReservation>> DeleteSaunaReservation(int id)
        {
            var SaunaReservation = await _context.SaunaReservations.FindAsync(id);

            if (SaunaReservation == null)
                return NotFound("Sauna Reservation not found");

            _context.SaunaReservations.Remove(SaunaReservation);
            await _context.SaveChangesAsync();

            return Ok(await _context.SaunaReservations.ToListAsync());
        }
    }
}

