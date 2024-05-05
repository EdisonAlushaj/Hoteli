using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly DataContext _context;

        public UserRoleController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRole>>> GetUserRole()
        {
            var userRoles = await _context.UserRoles
                                        .Include(ur => ur.User)
                                        .Include(ur => ur.Role)
                                        .ToListAsync();

            if (userRoles == null || userRoles.Count == 0)
                return NotFound("No user roles found");

            return Ok(userRoles);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<UserRole>> GetUserRoleById(int id)
        {
            var userRole = await _context.UserRoles.FindAsync(id);

            if (userRole == null)
                return NotFound("UserRole not found");

            return Ok(userRole);
        }

        [HttpPost]
        public async Task<ActionResult<UserRole>> AddUserRole(int userId, int roleId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return NotFound("User not found");
            }

            var roleExists = await _context.Roles.AnyAsync(r => r.Id == roleId);
            if (!roleExists)
            {
                return NotFound("Role not found");
            }

            var existingUserRole = await _context.UserRoles.FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);
            if (existingUserRole != null)
            {
                return Conflict("User-Role association already exists");
            }

            var user = await _context.Users.FindAsync(userId);
            var role = await _context.Roles.FindAsync(roleId);

            var userRole = new UserRole
            {
                UserId = userId,
                RoleId = roleId,
                User = user,
                Role = role
            };

            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserRole), new { userId = userRole.UserId, roleId = userRole.RoleId }, userRole);
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult<UserRole>> DeleteUserRole(int id)
        {
            var userRole = await _context.UserRoles.FindAsync(id);

            if (userRole == null)
                return NotFound("UserRole not found");

            _context.UserRoles.Remove(userRole);
            await _context.SaveChangesAsync();

            return Ok(userRole);
        }
    }
}