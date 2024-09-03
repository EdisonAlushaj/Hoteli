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
    public class MenuFoodController : ControllerBase
    {
        public readonly DataContext _context;

        public MenuFoodController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<MenuFood>>> GetAllFood()
        {
            var foods = await _context.MenuFoods.ToListAsync();

            return Ok(foods);
        }


        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<List<MenuFood>>> GetFood(int id)
        {
            var food = await _context.MenuFoods.FindAsync(id);
            if (food == null)
                return NotFound("Food not found");
            return Ok(food);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<List<MenuFood>>> AddFood(MenuFood food)
        {
            _context.MenuFoods.Add(food);
            await _context.SaveChangesAsync();

            return Ok(await _context.MenuFoods.ToListAsync()); ;
        }

        [HttpPatch, Authorize]
        [Route("UpdateFood/{id}")]
        public async Task<MenuFood> UpdateFood(MenuFood objFood)
        {
            _context.Entry(objFood).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objFood;
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<MenuFood>>> DeleteFood(int id)
        {
            var dbFood = await _context.MenuFoods.FindAsync(id);
            if (dbFood == null)
                return NotFound("Food not found");

            _context.MenuFoods.Remove(dbFood);

            await _context.SaveChangesAsync();

            return Ok(await _context.MenuFoods.ToListAsync()); ;
        }
    }
}
