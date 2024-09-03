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
    public class RoomController : ControllerBase
    {
        public readonly DataContext _context;

        public RoomController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<Room>>> GetAllRooms()
        {
            var rooms = await _context.Rooms.ToListAsync();

            return Ok(rooms);
        }

        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<List<Room>>> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
                return NotFound("Room not found");
            return Ok(room);
        }
        
        [HttpPost, Authorize]
        public async Task<ActionResult<List<Room>>> AddRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return Ok(await _context.Rooms.ToListAsync()); ;
        }

        [HttpPatch, Authorize]
        [Route("UpdateRoom/{id}")]
        public async Task<Room> UpdateRoom(Room objRoom)
        {
            _context.Entry(objRoom).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objRoom;
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<Room>>> DeleteRoom(int id)
        {
            var dbRoom = await _context.Rooms.FindAsync(id);
            if (dbRoom == null)
                return NotFound("Room not found");

            _context.Rooms.Remove(dbRoom);

            await _context.SaveChangesAsync();

            return Ok(await _context.Rooms.ToListAsync()); ;
        }
    }
}
