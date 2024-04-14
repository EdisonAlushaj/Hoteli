using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuDrinkController : ControllerBase
    {
        public readonly DataContext _context;

        public MenuDrinkController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<MenuDrink>>> GetAllDrink()
        {
            var drinks = await _context.MenuDrinks.ToListAsync();

            return Ok(drinks);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<MenuDrink>>> GetDrink(int id)
        {
            var drink = await _context.MenuDrinks.FindAsync(id);
            if (drink == null)
                return NotFound("Drink not found");
            return Ok(drink);
        }

        [HttpPost]
        public async Task<ActionResult<List<MenuDrink>>> AddDrink(MenuDrink drink)
        {
            _context.MenuDrinks.Add(drink);
            await _context.SaveChangesAsync();

            return Ok(await _context.MenuDrinks.ToListAsync()); ;
        }

        [HttpPut()]
        public async Task<ActionResult<List<MenuDrink>>> UpdateDrink(MenuDrink updatedDrink)
        {
            var dbDrink = await _context.MenuDrinks.FindAsync(updatedDrink.Id);
            if (dbDrink == null)
                return NotFound("Drink not found");

            dbDrink.DrinkName = updatedDrink.DrinkName;
            dbDrink.DrinkDescription = updatedDrink.DrinkDescription;
            dbDrink.DrinkPrice = updatedDrink.DrinkPrice;
            dbDrink.DrinkImage = updatedDrink.DrinkImage;


            await _context.SaveChangesAsync();

            return Ok(await _context.MenuDrinks.ToListAsync()); ;
        }

        [HttpDelete]
        public async Task<ActionResult<List<MenuDrink>>> DeleteDrink(int id)
        {
            var dbDrink = await _context.MenuDrinks.FindAsync(id);
            if (dbDrink == null)
                return NotFound("Drink not found");

            _context.MenuDrinks.Remove(dbDrink);

            await _context.SaveChangesAsync();

            return Ok(await _context.MenuDrinks.ToListAsync()); ;
        }
    }
}
