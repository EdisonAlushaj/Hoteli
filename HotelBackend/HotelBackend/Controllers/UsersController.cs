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
    public class UsersController : ControllerBase
    {
        public readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();

            return Ok(users);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found");
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateUser/{id}")]
        public async Task<User> UpdateUser(User objUser)
        {
            _context.Entry(objUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objUser;
        }

        [HttpDelete]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
                return NotFound("User not found");

            _context.Users.Remove(dbUser);

            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync()); ;
        }
    }
}
