using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableReservationController : ControllerBase
    {
        public readonly DataContext _context;

        public TableReservationController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableReservation>>> GetTableReservation()
        {
            var tableReservations = await _context.TableReservations
                                        .Include(ur => ur.User)
                                        .Include(ur => ur.Table)
                                        .ToListAsync();

            if (tableReservations == null || tableReservations.Count == 0)
                return NotFound("No table reservations found");

            return Ok(tableReservations);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<TableReservation>> GetTableReservationById(int id)
        {
            var tableReservations = await _context.TableReservations.FindAsync(id);

            if (tableReservations == null)
                return NotFound("TableReservation not found");

            return Ok(tableReservations);
        }
        [HttpPost]
        public async Task<ActionResult<TableReservation>> AddTableReservation(string FullName, EstablishmentType Establishment, int maxGuests, DateTime reservationDateTime, string specialRequests)
        {
            // Check if user exists
            var userExists = await _context.Users.AnyAsync(u => u.FullName == FullName);
            if (!userExists)
            {
                return NotFound("User not found");
            }

            // Check if table exists
            var tableExists = await _context.Tables.AnyAsync(r => r.Establishment == Establishment);
            if (!tableExists)
            {
                return NotFound("Table not found");
            }

            // Check if a reservation already exists for this user and establishment
            var existingTableReservation = await _context.TableReservations.FirstOrDefaultAsync(ur => ur.FullName == FullName && ur.Establishment == (int)Establishment);
            if (existingTableReservation != null)
            {
                return Conflict("TableReservation association already exists");
            }

            // Create new TableReservation instance
            var user = await _context.Users.FindAsync(FullName);
            var table = await _context.Tables.FirstOrDefaultAsync(r => r.Establishment == Establishment);

            var tableReservation = new TableReservation
            {
                FullName = FullName,
                Establishment = (int)Establishment, // Convert EstablishmentType enum to int
                MaxGuests = maxGuests,
                ReservationDateTime = reservationDateTime,
                SpecialRequests = specialRequests // Set the special requests
            };

            // Add new TableReservation to context and save changes
            _context.TableReservations.Add(tableReservation);
            await _context.SaveChangesAsync();

            // Return the newly created TableReservation with appropriate status
            return CreatedAtAction(nameof(GetTableReservation), new { userId = tableReservation.FullName, roleId = tableReservation.Establishment }, tableReservation);
        }


        [HttpPatch]
        [Route("UpdateTableReservation/{id}")]
        public async Task<TableReservation> UpdateTableReservation(TableReservation objTableReservation)
        {
            _context.Entry(objTableReservation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objTableReservation;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<TableReservation>>> DeleteTableReservation(int id)
        {
            var dbTableReservation = await _context.TableReservations.FindAsync(id);
            if (dbTableReservation == null)
                return NotFound("TableReservation not found");

            _context.TableReservations.Remove(dbTableReservation);

            await _context.SaveChangesAsync();

            return Ok(await _context.TableReservations.ToListAsync()); ;
        }
    }
}
