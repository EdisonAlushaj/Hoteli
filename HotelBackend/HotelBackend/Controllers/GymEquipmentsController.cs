using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymEquipmentsController : ControllerBase
    {
        public readonly DataContext _context;

        public GymEquipmentsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<GymEquipment>>> GetAllGymEq()
        {
            var gymEq = await _context.GymEquipments.ToListAsync();

            return Ok(gymEq);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<GymEquipment>>> GetGymEq(int id)
        {
            var gymEq = await _context.GymEquipments.FindAsync(id);
            if (gymEq == null)
                return NotFound("Gym Equipment not found");
            return Ok(gymEq);
        }

        [HttpPost]
        public async Task<ActionResult<List<GymEquipment>>> AddGymEq(GymEquipment gymEq)
        {
            _context.GymEquipments.Add(gymEq);
            await _context.SaveChangesAsync();

            return Ok(await _context.GymEquipments.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateGymEquipment/{id}")]
        public async Task<GymEquipment> UpdateGymEq(GymEquipment objGymEq)
        {
            _context.Entry(objGymEq).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objGymEq;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<GymEquipment>>> DeleteGymEq(int id)
        {
            var dbGymEq = await _context.GymEquipments.FindAsync(id);
            if (dbGymEq == null)
                return NotFound("Gym Equipment not found");

            _context.GymEquipments.Remove(dbGymEq);

            await _context.SaveChangesAsync();

            return Ok(await _context.GymEquipments.ToListAsync()); ;
        }
    }
}
