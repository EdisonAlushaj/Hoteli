using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderCreationDto orderDto)
        {
            if (orderDto == null)
            {
                return BadRequest();
            }

            // Retrieve the user
            var user = _context.Userrs.Find(orderDto.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Validate and process order items
            var order = new Order
            {
                UserId = orderDto.UserId,
                DeliveryLocation = orderDto.DeliveryLocation,
                DeliveryNumber = orderDto.DeliveryNumber,
                PaymentMethod = orderDto.PaymentMethod,
                OrderItems = orderDto.OrderItems.Select(item => new OrderItem
                {
                    MenuFoodId = item.MenuFoodId,
                    Quantity = item.Quantity
                }).ToList()
            };

            // Calculate prices for order items
            foreach (var item in order.OrderItems)
            {
                var menuFood = _context.MenuFoods.Find(item.MenuFoodId);
                if (menuFood == null)
                {
                    return BadRequest($"Menu food item with ID {item.MenuFoodId} not found.");
                }
                item.Price = menuFood.FoodPrice * item.Quantity;
                order.TotalOrderPrice += item.Price; // Add item price to total order price
            }

            // Calculate total order price
            order.CalculateTotalOrderPrice();

            // Add order to context and save changes
            _context.Orders.Add(order);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, order);
        }


        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuFood)
                .FirstOrDefault(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
    }


    // Define DTO (Data Transfer Object) for order creation
    public class OrderCreationDto
    {
        public int UserId { get; set; }
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public OrderItemDto[] OrderItems { get; set; }
    }

    public class OrderItemDto
    {
        public int MenuFoodId { get; set; }
        public int Quantity { get; set; }
    }
}

