using HotelBackend.Data;
using HotelBackend.Entities;
using HotelBackend.Migrations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;


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
        [HttpPost, Authorize]
        public IActionResult CreateOrder([FromBody] OrderCreationDto orderDto)
        {
            if (orderDto == null || orderDto.OrderItems == null || orderDto.OrderItems.Length == 0)
            {
                return BadRequest("Invalid order data.");
            }

            // Retrieve the user
            var user = _context.Users.Find(orderDto.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Create order
            var order = new Order
            {
               Id = orderDto.UserId,
                DeliveryLocation = orderDto.DeliveryLocation,
                DeliveryNumber = orderDto.DeliveryNumber,
                PaymentMethod = orderDto.PaymentMethod,
                OrderItems = orderDto.OrderItems.Select(item => new OrderItem
                {
                    MenuFoodId = item.MenuFoodId,
                    Quantity = item.Quantity,
                    // Populate FoodName here
                    Foodname = _context.MenuFoods.Find(item.MenuFoodId)?.FoodName,
                    // Populate Price here
                    Price = _context.MenuFoods.Find(item.MenuFoodId)?.FoodPrice ?? 0
                }).ToList()
            };

            // Calculate total order price
            order.CalculateTotalOrderPrice();

            // Add order to context and save changes
            _context.Orders.Add(order);
            _context.SaveChanges();

            // Create a DTO for the response including the user details and excluding price from order items
            var responseDto = new OrderDto
            {
                OrderId = order.OrderId,
                User = new UserDto
                {
                    UserId = user.Id,
                    Name = user.Name
                },
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderPrice = order.TotalOrderPrice,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    MenuFoodId = oi.MenuFoodId,
                    FoodName = oi.Foodname, // Use the populated FoodName property
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToArray()
            };

            return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, responseDto);
        }
        [HttpGet, Authorize]
        public IActionResult GetAllOrders()
        {
            var orders = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuFood)
                .ToList();

            // Ensure total order price is calculated for each order
            foreach (var order in orders)
            {
                order.CalculateTotalOrderPrice();
            }

            var orderDtos = orders.Select(MapOrderToDto).ToList();

            return Ok(orderDtos);
        }

        [HttpGet("{id}"), Authorize]
        public IActionResult GetOrderById(int id)
        {
            var order = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuFood)
                .FirstOrDefault(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            // Ensure total order price is calculated
            order.CalculateTotalOrderPrice();

            return Ok(MapOrderToDto(order));
        }

        // Map Order entity to OrderDto
        private OrderDto MapOrderToDto(Order order)
        {
            var user = _context.Users.Find(order.Id);
            var userDto = user != null ? new UserDto
            {
                UserId = user.Id,
                Name = user.Name
            } : null;

            return new OrderDto
            {
                OrderId = order.OrderId,
                User = userDto,
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderPrice = order.TotalOrderPrice,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    MenuFoodId = oi.MenuFoodId,
                    FoodName = oi.Foodname,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }
        [HttpDelete("{id}"), Authorize]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();

            return NoContent(); // 204 No Content response
        }
    }


    // Define DTOs for order
    public class OrderDto
    {
        public int OrderId { get; set; }
        public UserDto User { get; set; } // Include User object
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public double TotalOrderPrice { get; set; }
        public OrderItemDto[] OrderItems { get; set; }
    }

    // Define DTO for user details
    public class UserDto
    {
        public string UserId { get; set; }
        public string Name { get; set; }
    }

    // Define DTO for order item
    public class OrderItemDto
    {
        public int MenuFoodId { get; set; }
        public string FoodName { get; set; } // Add this property
        public double Price { get; set; }
        public int Quantity { get; set; }
        // Note: Price property is excluded here
    }

    // Define DTO for order creation
    public class OrderCreationDto
    {
        public string UserId { get; set; }
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public OrderItemDto[] OrderItems { get; set; }
    }
}
