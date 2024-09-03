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
    public class HallController : ControllerBase
    {
        public readonly DataContext _context;

        public HallController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<Hall>>> GetAllHalls()
        {
            var halls = await _context.Halls.ToListAsync();

            return Ok(halls);
        }


        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<List<Hall>>> GetHall(int id)
        {
            var hall = await _context.Halls.FindAsync(id);
            if (hall == null)
                return NotFound("Hall not found");
            return Ok(hall);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<Hall>> PostHall(Hall hall)
        {
            _context.Halls.Add(hall);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHall), new { id = hall.Id }, hall);
        }

        [HttpPatch, Authorize]
        [Route("UpdateHall/{id}")]
        public async Task<Hall> UpdateHall(Hall objHall)
        {
            _context.Entry(objHall).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objHall;
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<Hall>>> DeleteHall(int id)
        {
            var dbHall = await _context.Halls.FindAsync(id);
            if (dbHall == null)
                return NotFound("Hall not found");

            _context.Halls.Remove(dbHall);

            await _context.SaveChangesAsync();

            return Ok(await _context.Halls.ToListAsync()); ;
        }
    }
}

