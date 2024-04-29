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
    public class RolesController : ControllerBase
    {
        public readonly DataContext _context;

        public RolesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Role>>> GetAllRoles()
        {
            var roles = await _context.Roles.ToListAsync();

            return Ok(roles);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<Role>>> GetRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null)
                return NotFound("Role not found");
            return Ok(role);
        }

        [HttpPost]
        public async Task<ActionResult<List<Role>>> AddRole(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return Ok(await _context.Roles.ToListAsync()); ;
        }

    

        [HttpPatch]
        [Route("UpdateRole/{id}")]
        public async Task<Role> UpdateRole(Role objRole)
        {
            _context.Entry(objRole).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objRole;
        }

        [HttpDelete]
        public async Task<ActionResult<List<Role>>> DeleteRole(int id)
        {
            var dbRole = await _context.Roles.FindAsync(id);
            if (dbRole == null)
                return NotFound("Role not found");

            _context.Roles.Remove(dbRole);

            await _context.SaveChangesAsync();

            return Ok(await _context.Roles.ToListAsync()); ;
        }
    }
}
