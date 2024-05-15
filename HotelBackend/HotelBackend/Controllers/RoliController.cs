using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoliController : ControllerBase
    {
        public readonly DataContext _context;

        public RoliController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Roli>>> GetAllRoles()
        {
            var roles = await _context.Rolis.ToListAsync();

            return Ok(roles);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<Roli>>> GetRole(int id)
        {
            var role = await _context.Rolis.FindAsync(id);
            if (role == null)
                return NotFound("Role not found");
            return Ok(role);
        }

        [HttpPost]
        public async Task<ActionResult<List<Roli>>> AddRole(Roli role)
        {
            _context.Rolis.Add(role);
            await _context.SaveChangesAsync();

            return Ok(await _context.Rolis.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateRole/{id}")]
        public async Task<Roli> UpdateRole(Roli objRole)
        {
            _context.Entry(objRole).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objRole;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Roli>>> DeleteRole(int id)
        {
            var dbRole = await _context.Rolis.FindAsync(id);
            if (dbRole == null)
                return NotFound("Role not found");

            _context.Rolis.Remove(dbRole);

            await _context.SaveChangesAsync();

            return Ok(await _context.Rolis.ToListAsync()); ;
        }
    }
}
