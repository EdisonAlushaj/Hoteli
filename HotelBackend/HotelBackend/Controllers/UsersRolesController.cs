using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersRolesController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersRolesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersRoles>>> GetUserRole()
        {
            var userRoles = await _context.UsersRoless
                                        .Include(ur => ur.Userr)
                                        .Include(ur => ur.Roles)
                                        .ToListAsync();

            if (userRoles == null || userRoles.Count == 0)
                return NotFound("No user roles found");

            return Ok(userRoles);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<UsersRoles>> GetUserRoleById(int id)
        {
            var userRole = await _context.UsersRoless.FindAsync(id);

            if (userRole == null)
                return NotFound("UserRole not found");
            return Ok(userRole);
        }

        [HttpPost]
        public async Task<ActionResult<UsersRoles>> AddUserRole(int userId, int roleId)
        {
            var userExists = await _context.Userrs.AnyAsync(u => u.UserId == userId);
            if (!userExists)
            {
                return NotFound("User not found");
            }

            var roleExists = await _context.Rolis.AnyAsync(r => r.RoleId == roleId);
            if (!roleExists)
            {
                return NotFound("Role not found");
            }

            var existingUserRole = await _context.UsersRoless.FirstOrDefaultAsync(ur => ur.UsersId == userId && ur.RolesId == roleId);
            if (existingUserRole != null)
            {
                return Conflict("User-Role association already exists");
            }

            var userRole = new UsersRoles
            {
                UsersId = userId,
                RolesId = roleId
            };

            _context.UsersRoless.Add(userRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserRoleById), new { id = userRole.UsersRolesId }, userRole);
        }




        [HttpDelete("{id}")]
        public async Task<ActionResult<UsersRoles>> DeleteUserRole(int id)
        {
            var userRole = await _context.UsersRoless.FindAsync(id);

            if (userRole == null)
                return NotFound("User Role not found");

            _context.UsersRoless.Remove(userRole);
            await _context.SaveChangesAsync();

            return Ok(await _context.UsersRoless.ToListAsync());
        }

    }
}
