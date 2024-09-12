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
    public class MenuCafeController : ControllerBase
    {

        public readonly DataContext _context;

        public MenuCafeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<List<MenuCafe>>> GetAllCafe()
        {
            var cafes = await _context.MenuCafes.ToListAsync();

            return Ok(cafes);
        }


        [HttpGet("{id}"), Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<List<MenuCafe>>> GetCafe(int id)
        {
            var cafe = await _context.MenuCafes.FindAsync(id);
            if (cafe == null)
                return NotFound("Cafe not found");
            return Ok(cafe);
        }

        [HttpPost, Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<List<MenuCafe>>> AddFood(MenuCafe cafe)
        {
            _context.MenuCafes.Add(cafe);
            await _context.SaveChangesAsync();

            return Ok(await _context.MenuCafes.ToListAsync()); ;
        }

        [HttpPatch, Authorize(Policy = "AdminPolicy")]
        [Route("UpdateCafe/{id}")]
        public async Task<MenuCafe> UpdateCafe(MenuCafe objCafe)
        {
            _context.Entry(objCafe).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objCafe;
        }

        [HttpDelete("{id}"), Authorize(Policy = "AdminPolicy")`]
        public async Task<ActionResult<List<MenuCafe>>> DeleteCafe(int id)
        {
            var dbCafe = await _context.MenuCafes.FindAsync(id);
            if (dbCafe == null)
                return NotFound("Cafe not found");

            _context.MenuCafes.Remove(dbCafe);

            await _context.SaveChangesAsync();

            return Ok(await _context.MenuCafes.ToListAsync()); ;
        }
    }
}
