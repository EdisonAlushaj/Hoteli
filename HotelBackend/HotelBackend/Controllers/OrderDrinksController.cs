using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
        public IActionResult CreateOrderDrink([FromBody] OrderDrinkCreationDto orderDto)
        {
            if (orderDto == null || orderDto.OrderDrinkItems == null || orderDto.OrderDrinkItems.Length == 0)
            {
                return BadRequest("Invalid order data.");
            }

            // Retrieve the user
            var user = _context.Users.Find(orderDto.Id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Create order
            var order = new OrderDrink
            {
                Id = orderDto.Id,
                DeliveryLocation = orderDto.DeliveryLocation,
                DeliveryNumber = orderDto.DeliveryNumber,
                PaymentMethod = orderDto.PaymentMethod,
                OrderDrinkItems = orderDto.OrderDrinkItems.Select(item => new OrderDrinkItem
                {
                    MenuDrinkId = item.MenuDrinkId,
                    Quantity = item.Quantity
                }).ToList()
            };

            // Calculate prices for order items
            foreach (var item in order.OrderDrinkItems)
            {
                var menuDrink = _context.MenuDrinks.Find(item.MenuDrinkId);
                if (menuDrink == null)
                {
                    return BadRequest($"Menu drink item with ID {item.MenuDrinkId} not found.");
                }
                item.Price = menuDrink.DrinkPrice * item.Quantity;
            }

            // Calculate total order price
            order.CalculateTotalOrderDrinkPrice();

            // Add order to context and save changes
            _context.OrderDrinks.Add(order);
            _context.SaveChanges();

            // Create a DTO for the response including the user details and excluding price from order items
            var responseDto = new OrderDrinkDto
            {
                OrderDrinkId = order.OrderDrinkId,
                User = new UseriDto
                {
                    Id = user.Id,
                    Name = user.Name
                },
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderPrice = order.TotalOrderDrinkPrice, // Calculated total price
                OrderDrinkItems = orderDto.OrderDrinkItems.Select(oi => new OrderDrinkItemDto
                {
                    MenuDrinkId = oi.MenuDrinkId,
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

            // Ensure total order price is calculated for each order
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
            var order = _context.OrderDrinks
                .Include(o => o.OrderDrinkItems)
                .ThenInclude(oi => oi.MenuDrink)
                .FirstOrDefault(o => o.OrderDrinkId == id);

            if (order == null)
            {
                return NotFound();
            }

            // Ensure total order price is calculated
            order.CalculateTotalOrderDrinkPrice();

            return Ok(MapOrderDrinkToDto(order));
        }

        // Map Order entity to OrderDto
        private OrderDrinkDto MapOrderDrinkToDto(OrderDrink order)
        {
            var user = _context.Users.Find(order.Id);
            return new OrderDrinkDto
            {
                OrderDrinkId = order.OrderDrinkId,
                User = new UseriDto
                {
                    Id = user.Id,
                    Name = user.Name
                },
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderPrice = order.TotalOrderDrinkPrice,
                OrderDrinkItems = order.OrderDrinkItems.Select(oi => new OrderDrinkItemDto
                {
                    MenuDrinkId = oi.MenuDrinkId,
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteOrderDrink(int id)
        {
            var order = _context.OrderDrinks.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.OrderDrinks.Remove(order);
            _context.SaveChanges();

            return NoContent(); // 204 No Content response
        }
    }


    // Define DTOs for order
    public class OrderDrinkDto
    {
        public int OrderDrinkId { get; set; }
        public UseriDto User { get; set; } // Include User object
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public double TotalOrderPrice { get; set; }
        public OrderDrinkItemDto[] OrderDrinkItems { get; set; }
    }

    // Define DTO for user details
    public class UseriDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    // Define DTO for order item
    public class OrderDrinkItemDto
    {
        public int MenuDrinkId { get; set; }
        public int Quantity { get; set; }
        // Note: Price property is excluded here
    }

    // Define DTO for order creation
    public class OrderDrinkCreationDto
    {
        public string Id { get; set; }
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public OrderDrinkItemDto[] OrderDrinkItems { get; set; }
    }
}