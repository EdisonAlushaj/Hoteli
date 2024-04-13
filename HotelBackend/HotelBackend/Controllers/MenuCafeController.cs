using HotelBackend.Data;
using HotelBackend.Entities;
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

        [HttpGet]
        public async Task<ActionResult<List<MenuCafe>>> GetAllCafe()
        {
            var cafes = await _context.MenuCafes.ToListAsync();

            return Ok(cafes);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<MenuCafe>>> GetCafe(int id)
        {
            var cafe = await _context.MenuCafes.FindAsync(id);
            if (cafe == null)
                return NotFound("Cafe not found");
            return Ok(cafe);
        }

        [HttpPost]
        public async Task<ActionResult<List<MenuCafe>>> AddFood(MenuCafe cafe)
        {
            _context.MenuCafes.Add(cafe);
            await _context.SaveChangesAsync();

            return Ok(await _context.MenuCafes.ToListAsync()); ;
        }

        [HttpPut()]
        public async Task<ActionResult<List<MenuCafe>>> UpdateCafe(MenuCafe updatedCafe)
        {
            var dbCafe = await _context.MenuCafes.FindAsync(updatedCafe.Id);
            if (dbCafe == null)
                return NotFound("Cafe not found");

            dbCafe.CafeName = updatedCafe.CafeName;
            dbCafe.CafeDescription = updatedCafe.CafeDescription;
            dbCafe.CafePrice = updatedCafe.CafePrice;
            dbCafe.CafeImage = updatedCafe.CafeImage;


            await _context.SaveChangesAsync();

            return Ok(await _context.MenuCafes.ToListAsync()); ;
        }

        [HttpDelete]
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
