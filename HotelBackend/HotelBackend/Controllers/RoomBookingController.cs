using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomBookingController : ControllerBase
    {
        public readonly DataContext _context;

        public RoomBookingController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<RoomBooking>>> GetAllRoomsBooking()
        {
            var RoomBooking = await _context.RoomBookings.ToListAsync();

            return Ok(RoomBooking);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<RoomBooking>>> GetRoomBooking(int id)
        {
            var RoomBooking = await _context.RoomBookings.FindAsync(id);
            if (RoomBooking == null)
                return NotFound("RoomBooking not found");
            return Ok(RoomBooking);
        }

        [HttpPost]
        public async Task<ActionResult<RoomBooking>> AddRoomBooking(int roomId, bool availability, DateTime date)
        {
            // Check if the provided roomId exists
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return NotFound("Room not found");
            }

            // Create a new RoomBooking entity
            var roomBooking = new RoomBooking
            {
                RoomId = roomId,
                Availability = availability,
                DataEBooking = date
            };

            _context.RoomBookings.Add(roomBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomBooking), new { id = roomBooking.RoomBookingId }, roomBooking);
        }


        [HttpPatch]
        [Route("UpdateRoomBooking/{id}")]
        public async Task<RoomBooking> UpdateRoomBookings(RoomBooking objroomBookings)
        {
            _context.Entry(objroomBookings).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objroomBookings;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<RoomBooking>>> DeleteRoomBooking(int id)
        {
            var dbPool = await _context.RoomBookings.FindAsync(id);
            if (dbPool == null)
                return NotFound("RoomBooking not found");

            _context.RoomBookings.Remove(dbPool);

            await _context.SaveChangesAsync();

            return Ok(await _context.RoomBookings.ToListAsync()); ;
        }
    }
}
