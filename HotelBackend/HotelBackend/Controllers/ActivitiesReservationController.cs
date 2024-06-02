using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesReservationController : ControllerBase
    {
        public readonly DataContext _context;

        public ActivitiesReservationController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivitiesReservation>>> GetActivitiesReservation()
        {
            var ActivitiesReservation = await _context.ActivitiesReservations
                                        .Include(ur => ur.User)
                                        .Include(ur => ur.Activities)
                                        .ToListAsync();

            if (ActivitiesReservation == null || ActivitiesReservation.Count == 0)
                return NotFound("No activitie reservations found");

            return Ok(ActivitiesReservation);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ActivitiesReservation>> GetActivitiesReservationById(int id)
        {
            var ActivitiesReservation = await _context.ActivitiesReservations.FindAsync(id);

            if (ActivitiesReservation == null)
                return NotFound("ActivitiesReservation not found");
            return Ok(ActivitiesReservation);
        }

        [HttpPost]
        public async Task<ActionResult<ActivitiesReservation>> AddActivitiesReservation([FromQuery] string userId, [FromQuery] int activitiesId)
        {
            var activitie = await _context.Activities.FindAsync(activitiesId);
            if (activitie == null)
            {
                return NotFound("Activitie not found");
            }

            var reservation = new ActivitiesReservation
            {
                UserId = userId,
                ActivitiesId = activitiesId
            };

            _context.ActivitiesReservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetActivitiesReservationById), new { id = reservation.ReservationId }, reservation);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivitiesReservation>> DeleteActivitiesReservation(int id)
        {
            var ActivitiesReservation = await _context.ActivitiesReservations.FindAsync(id);

            if (ActivitiesReservation == null)
                return NotFound("Activities Reservation not found");

            _context.ActivitiesReservations.Remove(ActivitiesReservation);
            await _context.SaveChangesAsync();

            return Ok(await _context.ActivitiesReservations.ToListAsync());
        }
    }
}
