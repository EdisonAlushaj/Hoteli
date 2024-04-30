using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ActionResult<List<UserRole>>> GetAllUserRoles()
        {
            var userRoles = await _context.UserRoles.ToListAsync();
            return Ok(userRoles);
        }

        [HttpGet("{userId}/{roleId}")]
        public async Task<ActionResult<UserRole>> GetUserRole(int userId, int roleId)
        {
            var userRole = await _context.UserRoles
                .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);

            if (userRole == null)
                return NotFound("UserRole not found");

            return Ok(userRole);
        }
        [HttpPost]
        public async Task<ActionResult<UserRole>> AddUserRole(UserRole userRole)
        {
            // Check if the user exists
            var user = await _context.Users.FindAsync(userRole.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // If the user already has a role assigned, check if the role exists
            if (userRole.RoleId != null)
            {
                var role = await _context.Roles.FindAsync(userRole.RoleId);
                if (role == null)
                {
                    return NotFound("Role not found");
                }
            }

            // If the user already has a role assigned or if no role is specified, proceed to add the user-role association
            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserRole), new { userId = userRole.UserId, roleId = userRole.RoleId }, userRole);
        }



        [HttpDelete("{userId}/{roleId}")]
        public async Task<ActionResult<UserRole>> DeleteUserRole(int userId, int roleId)
        {
            var userRole = await _context.UserRoles
                .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);

            if (userRole == null)
                return NotFound("UserRole not found");

            _context.UserRoles.Remove(userRole);
            await _context.SaveChangesAsync();

            return Ok(userRole);
        }

        private bool UserRoleExists(int userId, int roleId)
        {
            return _context.UserRoles.Any(ur => ur.UserId == userId && ur.RoleId == roleId);
        }
    }
}
