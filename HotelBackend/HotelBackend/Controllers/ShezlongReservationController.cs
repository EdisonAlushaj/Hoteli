using HotelBackend.Data;
using HotelBackend.Entities;
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
        [HttpGet]
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


        [HttpGet("{id}")]
        public async Task<ActionResult<ShezlongReservation>> GetShezlongReservationById(int id)
        {
            var ShezlongReservation = await _context.ShezlongReservations.FindAsync(id);

            if (ShezlongReservation == null)
                return NotFound("ShezlongReservation not found");
            return Ok(ShezlongReservation);
        }

        [HttpPost]
        public async Task<ActionResult<ShezlongReservation>> AddShezlongReservation(int userId, int shezlongId, DateTime reservationDate)
        {
            var userExists = await _context.Userrs.AnyAsync(u => u.UserId == userId);
            if (!userExists)
            {
                return NotFound("User not found");
            }

            var roleExists = await _context.Shezlongs.AnyAsync(r => r.Id == shezlongId);
            if (!roleExists)
            {
                return NotFound("Shezlong not found");
            }

            var existingUserRole = await _context.ShezlongReservations.FirstOrDefaultAsync(ur => ur.UserId == userId && ur.ShezlongId == shezlongId);
            if (existingUserRole != null)
            {
                return Conflict("ShezlongReservation association already exists");
            }


            var userRole = new ShezlongReservation
            {
                UserId = userId,
                ShezlongId = shezlongId,
                 ReservationDate = reservationDate
            };

            _context.ShezlongReservations.Add(userRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShezlongReservationById), new { id = userRole.ReservationId }, userRole);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ShezlongReservation>> DeleteShezlongReservation(int id)
        {
            var shezlongReservation = await _context.ShezlongReservations.FindAsync(id);

            if (shezlongReservation == null)
                return NotFound("User Role not found");

            _context.ShezlongReservations.Remove(shezlongReservation);
            await _context.SaveChangesAsync();

            return Ok(await _context.ShezlongReservations.ToListAsync());
        }





    }
}
