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
    public class OrderCoffeeController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderCoffeeController(DataContext context)
        {
            _context = context;
        }

        [HttpPost, Authorize]
        public IActionResult CreateOrderCoffee([FromBody] OrderCoffeeCreationDto orderDto)
        {
            if (orderDto == null || orderDto.OrderCoffeeItems == null || orderDto.OrderCoffeeItems.Length == 0)
            {
                return BadRequest("Invalid order data.");
            }

            var user = _context.Users.Find(orderDto.Id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var order = new OrderCoffee
            {
                Id = orderDto.Id,
                DeliveryLocation = orderDto.DeliveryLocation,
                DeliveryNumber = orderDto.DeliveryNumber,
                PaymentMethod = orderDto.PaymentMethod,
                OrderCoffeeItems = orderDto.OrderCoffeeItems.Select(item => new OrderCoffeeItem
                {
                    MenuCoffeeId = item.MenuCoffeeId,
                    Quantity = item.Quantity,
                    CafeName = _context.MenuCafes.Find(item.MenuCoffeeId)?.CafeName,
                    Price = _context.MenuCafes.Find(item.MenuCoffeeId)?.CafePrice ?? 0
                }).ToList()
            };

            order.CalculateTotalOrderCoffeePrice();

            _context.OrderCoffees.Add(order);
            _context.SaveChanges();

            var responseDto = new OrderCoffeeDto
            {
                OrderCoffeeId = order.OrderCoffeeId,
                User = new UseriiDto
                {
                    Id = user.Id,
                    Name = user.Name
                },
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderPrice = order.TotalOrderCoffeePrice, 
                OrderCoffeeItems = orderDto.OrderCoffeeItems.Select(oi => new OrderCoffeeItemDto
                {
                    MenuCoffeeId = oi.MenuCoffeeId,
                    CafeName = oi.CafeName,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToArray()
            };

            return CreatedAtAction(nameof(GetOrderCoffeeById), new { id = order.OrderCoffeeId }, responseDto);
        }

        [HttpGet, Authorize]
        public IActionResult GetAllOrderCoffees()
        {
            var orders = _context.OrderCoffees
                .Include(o => o.OrderCoffeeItems)
                .ThenInclude(oi => oi.MenuCoffee)
                .ToList();

            foreach (var order in orders)
            {
                order.CalculateTotalOrderCoffeePrice();
            }

            var orderDtos = orders.Select(MapOrderCoffeeToDto).ToList();

            return Ok(orderDtos);
        }

        [HttpGet("{id}"), Authorize]
        public IActionResult GetOrderCoffeeById(int id)
        {
            var order = _context.OrderCoffees
                .Include(o => o.OrderCoffeeItems)
                .ThenInclude(oi => oi.MenuCoffee)
                .FirstOrDefault(o => o.OrderCoffeeId == id);

            if (order == null)
            {
                return NotFound();
            }

            order.CalculateTotalOrderCoffeePrice();

            return Ok(MapOrderCoffeeToDto(order));
        }

        private OrderCoffeeDto MapOrderCoffeeToDto(OrderCoffee order)
        {
            var user = _context.Users.Find(order.Id);
            return new OrderCoffeeDto
            {
                OrderCoffeeId = order.OrderCoffeeId,
                User = new UseriiDto
                {
                    Id = user.Id,
                    Name = user.Name
                },
                DeliveryLocation = order.DeliveryLocation,
                DeliveryNumber = order.DeliveryNumber,
                PaymentMethod = order.PaymentMethod,
                TotalOrderPrice = order.TotalOrderCoffeePrice,
                OrderCoffeeItems = order.OrderCoffeeItems.Select(oi => new OrderCoffeeItemDto
                {
                    MenuCoffeeId = oi.MenuCoffeeId,
                    CafeName = oi.CafeName,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }
        [HttpDelete("{id}"), Authorize]
        public IActionResult DeleteOrderCoffee(int id)
        {
            var order = _context.OrderCoffees.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.OrderCoffees.Remove(order);
            _context.SaveChanges();

            return NoContent(); 
        }
    }


    public class OrderCoffeeDto
    {
        public int OrderCoffeeId { get; set; }
        public UseriiDto User { get; set; } 
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public double TotalOrderPrice { get; set; }
        public OrderCoffeeItemDto[] OrderCoffeeItems { get; set; }
    }

    public class UseriiDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class OrderCoffeeItemDto
    {
        public int MenuCoffeeId { get; set; }
        public string CafeName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderCoffeeCreationDto
    {
        public string Id { get; set; }
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public OrderCoffeeItemDto[] OrderCoffeeItems { get; set; }
    }
}