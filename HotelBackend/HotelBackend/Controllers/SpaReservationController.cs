using HotelBackend.Data;
using HotelBackend.Entities;
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
        [HttpGet]
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


        [HttpGet("{id}")]
        public async Task<ActionResult<SpaReservation>> GetSpaReservationById(int id)
        {
            var SpaReservation = await _context.SpaReservations.FindAsync(id);

            if (SpaReservation == null)
                return NotFound("SpaReservation not found");
            return Ok(SpaReservation);
        }

        [HttpPost]
        public async Task<ActionResult<SpaReservation>> AddSpaReservation([FromQuery] int userId, [FromQuery] int spaId, [FromQuery] DateTime reservationDate)
        {
            var existingReservation = await _context.SpaReservations.FirstOrDefaultAsync(ur => ur.SpaId == spaId && ur.ReservationDate.Date == reservationDate.Date);

            if (existingReservation != null)
            {
                return Conflict("This spa is already reserved on the selected date.");
            }

            var spaExists = await _context.Spas.AnyAsync(s => s.Id == spaId);
            if (!spaExists)
            {
                return NotFound("Spa not found");
            }

            var reservation = new SpaReservation
            {
                UserId = userId,
                SpaId = spaId,
                ReservationDate = reservationDate
            };

            _context.SpaReservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSpaReservationById), new { id = reservation.ReservationId }, reservation);
        }


        [HttpDelete("{id}")]
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
