using HotelBackend.Data;
using HotelBackend.Entities;
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

        [HttpGet]
        public async Task<ActionResult<List<MenuFood>>> GetAllFood()
        {
            var foods = await _context.MenuFoods.ToListAsync();

            return Ok(foods);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<MenuFood>>> GetFood(int id)
        {
            var food = await _context.MenuFoods.FindAsync(id);
            if (food == null)
                return NotFound("Food not found");
            return Ok(food);
        }

        [HttpPost]
        public async Task<ActionResult<List<MenuFood>>> AddFood(MenuFood food)
        {
            _context.MenuFoods.Add(food);
            await _context.SaveChangesAsync();

            return Ok(await _context.MenuFoods.ToListAsync()); ;
        }

        [HttpPut()]
        public async Task<ActionResult<List<MenuFood>>> UpdateFood(MenuFood updatedFood)
        {
            var dbFood = await _context.MenuFoods.FindAsync(updatedFood.Id);
            if (dbFood == null)
                return NotFound("Food not found");

            dbFood.FoodName = updatedFood.FoodName;
            dbFood.FoodDescription = updatedFood.FoodDescription;
            dbFood.FoodPrice = updatedFood.FoodPrice;
            dbFood.FoodImage = updatedFood.FoodImage;
         

            await _context.SaveChangesAsync();

            return Ok(await _context.MenuFoods.ToListAsync()); ;
        }

        [HttpDelete]
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
