using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

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
        public async Task<ActionResult<IEnumerable<TableReservation>>> GetTableReservation()
        {
            var TableReservation = await _context.TableReservations
                                        .Include(ur => ur.User)
                                        .Include(ur => ur.Table)
                                        .ToListAsync();

            if (TableReservation == null || TableReservation.Count == 0)
                return NotFound("No user roles found");

            return Ok(TableReservation);
        }



        [HttpGet("{TableReservationId}")]
        public async Task<ActionResult<TableReservation>> GetTableReservationById(int TableReservationId)
        {
            var TableReservation = await _context.TableReservations.FindAsync(TableReservationId);

            if (TableReservation == null)
                return NotFound("TableReservation not found");
            return Ok(TableReservation);
        }
        [HttpPost]
        public async Task<ActionResult<TableReservation>> AddTableReservation(int userId, int tableId, DateTime reservationDate, TimeSpan reservationTime, int maxGuests, string specialRequests, EstablishmentType establishment)
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

            // Check for existing table reservation for the same user and table
            var existingReservation = await _context.TableReservations.FirstOrDefaultAsync(tr => tr.UserId == userId && tr.Id == tableId);
            if (existingReservation != null)
            {
                return Conflict("Table reservation already exists for this user and table");
            }

            // Create a new table reservation
            var tableReservation = new TableReservation
            {
                UserId = userId,
                Id = tableId,
                ReservationDate = reservationDate,
                ReservationTime = reservationTime,
                MaxGuests = maxGuests,
                SpecialRequests = specialRequests,
                Establishment = establishment
            };

            // Add the new reservation to the context and save changes
            _context.TableReservations.Add(tableReservation);
            await _context.SaveChangesAsync();

            // Return the newly created table reservation
            return CreatedAtAction(nameof(GetTableReservation), new { userId = tableReservation.UserId, tableId = tableReservation.Id }, tableReservation);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<TableReservation>>> DeleteTableReservation(int id)
        {
            var TableReservation = await _context.TableReservations.FindAsync(id);

            if (TableReservation == null)
                return NotFound("TableReservation not found");

            _context.TableReservations.Remove(TableReservation);
            await _context.SaveChangesAsync();

            return Ok(TableReservation);
        }
    }
}
