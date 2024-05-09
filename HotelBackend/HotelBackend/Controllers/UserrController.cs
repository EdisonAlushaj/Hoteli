using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserrController : ControllerBase
    {
        public readonly DataContext _context;

        public UserrController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Userr>>> GetAllUsers()
        {
            var users = await _context.Userrs.ToListAsync();

            return Ok(users);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<Userr>>> GetUser(int id)
        {
            var user = await _context.Userrs.FindAsync(id);
            if (user == null)
                return NotFound("User not found");
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<Userr>>> AddUser(Userr user)
        {
            _context.Userrs.Add(user);
            await _context.SaveChangesAsync();

            return Ok(await _context.Userrs.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateUser/{id}")]
        public async Task<Userr> UpdateUser(Userr objUser)
        {
            _context.Entry(objUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objUser;
        }

        [HttpDelete]
        public async Task<ActionResult<List<Userr>>> DeleteUser(int id)
        {
            var dbUser = await _context.Userrs.FindAsync(id);
            if (dbUser == null)
                return NotFound("User not found");

            _context.Userrs.Remove(dbUser);

            await _context.SaveChangesAsync();

            return Ok(await _context.Userrs.ToListAsync()); ;
        }
    }
}
