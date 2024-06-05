using HotelBackend.Data;
using HotelBackend.Entities;
using HotelBackend.Migrations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDrinksController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderDrinksController(DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderDrinksCreationDto orderDto)
        {
            if (orderDto == null || orderDto.OrderDrinkItems == null || orderDto.OrderDrinkItems.Length == 0)
            {
                return BadRequest("Invalid order data.");
            }

            // Retrieve the user
            var user = _context.Users.Find(orderDto.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var order = new OrderDrink
            {
                Id = orderDto.UserId,
                DeliveryLocation = orderDto.DeliveryLocation,
                DeliveryNumber = orderDto.DeliveryNumber,
                PaymentMethod = orderDto.PaymentMethod,
                OrderDrinkItems = orderDto.OrderDrinkItems.Select(item => new OrderDrinkItem
                {
                    MenuDrinkId = item.MenuDrinkId,
                    Quantity = item.Quantity,
                    DrinkkName = _context.MenuDrinks.Find(item.MenuDrinkId)?.DrinkName,
                    Price = _context.MenuDrinks.Find(item.MenuDrinkId)?.DrinkPrice ?? 0
                }).ToList()
            };

            order.CalculateTotalOrderDrinkPrice();

            _context.OrderDrinks.Add(order);
            _context.SaveChanges();

            
            var responseDto = new OrderDrinkDto
            {
                OrderDrinkId = order.OrderDrinkId,
                User = new UseriDto
                {
                    UserrId = user.Id,
                    Namee = user.Name
                },
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderDrinkPrice = order.TotalOrderDrinkPrice,
                OrderDrinkItems = order.OrderDrinkItems.Select(oi => new OrderDrinkItemDto
                {
                    MenuDrinkId = oi.MenuDrinkId,
                    DrinkkName = oi.DrinkkName, 
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToArray()
            };

            return CreatedAtAction(nameof(GetOrderDrinkById), new { id = order.OrderDrinkId }, responseDto);
        }
        [HttpGet]
        public IActionResult GetAllOrderDrinks()
        {
            var orders = _context.OrderDrinks
                .Include(o => o.OrderDrinkItems)
                .ThenInclude(oi => oi.MenuDrink)
                .ToList();

            foreach (var order in orders)
            {
                order.CalculateTotalOrderDrinkPrice();
            }

            var orderDtos = orders.Select(MapOrderDrinkToDto).ToList();

            return Ok(orderDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderDrinkById(int id)
        {
            var orderi = _context.OrderDrinks
                .Include(o => o.OrderDrinkItems)
                .ThenInclude(oi => oi.MenuDrink)
                .FirstOrDefault(o => o.OrderDrinkId == id);

            if (orderi == null)
            {
                return NotFound();
            }

            orderi.CalculateTotalOrderDrinkPrice();

            return Ok(MapOrderDrinkToDto(orderi));
        }

        private OrderDrinkDto MapOrderDrinkToDto(OrderDrink order)
        {
            var user = _context.Users.Find(order.Id);
            var useriDto = user != null ? new UseriDto
            {
                UserrId = user.Id,
                Namee = user.Name
            } : null;

            return new OrderDrinkDto
            {
                OrderDrinkId = order.OrderDrinkId,
                User = useriDto,
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderDrinkPrice = order.TotalOrderDrinkPrice,
                OrderDrinkItems = order.OrderDrinkItems.Select(oi => new OrderDrinkItemDto
                {
                    MenuDrinkId = oi.MenuDrinkId,
                    DrinkkName = oi.DrinkkName,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.OrderDrinks.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.OrderDrinks.Remove(order);
            _context.SaveChanges();

            return NoContent(); 
        }
    }


    public class OrderDrinkDto
    {
        public int OrderDrinkId { get; set; }
        public UseriDto User { get; set; } 
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public double TotalOrderDrinkPrice { get; set; }
        public OrderDrinkItemDto[] OrderDrinkItems { get; set; }
    }

    public class UseriDto
    {
        public string UserrId { get; set; }
        public string Namee { get; set; }
    }

    public class OrderDrinkItemDto
    {
        public int MenuDrinkId { get; set; }
        public string DrinkkName { get; set; } 
        public double Price { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderDrinksCreationDto
    {
        public string UserId { get; set; }
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public OrderDrinkItemDto[] OrderDrinkItems { get; set; }
    }
}
