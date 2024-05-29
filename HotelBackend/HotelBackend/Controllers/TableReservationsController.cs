using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableReservationsController : ControllerBase
    {
        private readonly DataContext _context;

        public TableReservationsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableReservation>>> GetTableReservations()
        {
            var tableReservations = await _context.TableReservations
                .Include(ur => ur.User)
                .Include(ur => ur.Table)
                .ToListAsync();

            if (tableReservations.Count == 0)
            {
                return NotFound();
            }

            return Ok(tableReservations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TableReservation>> GetTableReservationById(int id)
        {
            var tableReservation = await _context.TableReservations
                .Include(tr => tr.User)
                .Include(tr => tr.Table)
                .FirstOrDefaultAsync(tr => tr.ReservationId == id);

            if (tableReservation == null)
            {
                return NotFound();
            }

            return Ok(tableReservation);
        }

        [HttpPost]
        public async Task<ActionResult<TableReservation>> AddTableReservation([FromQuery] int userId, [FromQuery] int tableId, [FromQuery] DateTime reservationDate, [FromQuery] int maxGuests, [FromQuery] string specialRequests, [FromQuery] EstablishmentType establishment)
        {
            // Check if the user exists
            var userExists = await _context.Userrs.AnyAsync(u => u.UserId == userId);
            if (!userExists)
            {
                return NotFound("User not found");
            }

            // Check if the table exists
            var tableExists = await _context.Tables.AnyAsync(t => t.Id == tableId);
            if (!tableExists)
            {
                return NotFound("Table not found");
            }

            // Check for existing reservation for the same table and time window
            var startTime = reservationDate;
            var endTime = reservationDate.AddHours(3);
            var existingReservation = await _context.TableReservations
                .FirstOrDefaultAsync(tr => tr.Id == tableId
                                           && tr.ReservationDate >= startTime
                                           && tr.ReservationDate < endTime);
            if (existingReservation != null)
            {
                return Conflict("Table is already reserved for this date and time or within the next 3 hours");
            }

            // Create a new table reservation
            var tableReservation = new TableReservation
            {
                UserId = userId,
                Id = tableId,
                ReservationDate = reservationDate,
                MaxGuests = maxGuests,
                SpecialRequests = specialRequests,
                Establishment = establishment
            };

            // Add the new reservation to the context and save changes
            _context.TableReservations.Add(tableReservation);
            await _context.SaveChangesAsync();

            // Return the newly created table reservation
            return CreatedAtAction(nameof(GetTableReservations), new { id = tableReservation.ReservationId }, tableReservation);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTableReservation(int id)
        {
            var tableReservation = await _context.TableReservations.FindAsync(id);

            if (tableReservation == null)
            {
                return NotFound();
            }

            _context.TableReservations.Remove(tableReservation);
            await _context.SaveChangesAsync();

            return NoContent(); // Ensure this returns 204 No Content
        }

    }
}