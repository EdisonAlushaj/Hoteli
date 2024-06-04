using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderSummaryController : ControllerBase
    {
        public readonly DataContext _context;

        public OrderSummaryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("summary/{userId}")]
        public IActionResult GetOrderSummary(string userId)
        {
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                return NotFound();
            }

            var roomBookings = _context.RoomBookings
                .Where(rb => rb.Id == userId)
                .Include(rb => rb.RoomBookingItems)
                .ThenInclude(rbi => rbi.Room)
            .ToList();

            var orders = _context.Orders
                .Where(o => o.Id == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuFood)
            .ToList();

            var orderDrinks = _context.OrderDrinks
                .Where(od => od.Id == userId)
                .Include(od => od.OrderDrinkItems)
                .ThenInclude(odi => odi.MenuDrink)
                .ToList();

            var summary = new OrderSummaryDto
            {
                RoomBookings = roomBookings.Select(MapRoomBookingDto).ToList(),
                Orders = orders.Select(MapOrderToDto).ToList(),
                OrderDrinks = orderDrinks.Select(MapOrderDrinkToDto).ToList()
            };

            return Ok(summary);
        }

        private RoomBookingDto MapRoomBookingDto(RoomBooking roomBooking)
        {
            //var user = _context.Users.Find(roomBooking.Id);

            UserrDto userDto;
            if (roomBooking.Id != null)
            {
                var user = _context.Users.Find(roomBooking.Id);
                if (user != null)
                {
                    userDto = new UserrDto
                    {
                        Id = user.Id,
                        Name = user.Name
                    };
                }
                else
                {
                    // Handle the case where the user is not found
                    userDto = null; // or some default value
                }
            }
            else
            {
                // Handle the case where roomBooking.Id is null
                userDto = null; // or some default value
            }

            return new RoomBookingDto
            {
                RoomBookingId = roomBooking.RoomBookingId,
                User = userDto,
                PaymentMethod = roomBooking.PaymentMethod,
                CheckInDate = roomBooking.CheckInDate,
                CheckOutDate = roomBooking.CheckOutDate,
                TotalBookingPrice = roomBooking.TotalBookingPrice,
                RoomBookingItems = roomBooking.RoomBookingItems.Select(oi => new RoomBookingItemDto
                {
                    RoomId = oi.RoomId,
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }

        private OrderDto MapOrderToDto(Order order)
        {
            UserDto userDto;
            if (order.Id != null)
            {
                var user = _context.Users.Find(order.Id);
                if (user != null)
                {
                    userDto = new UserDto
                    {
                        UserId = user.Id,
                        Name = user.Name
                    };
                }
                else
                {
                    // Handle the case where the user is not found
                    userDto = null; // or some default value
                }
            }
            else
            {
                // Handle the case where roomBooking.Id is null
                userDto = null; // or some default value
            }

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
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }

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

        public class OrderSummaryDto
        {
            public List<RoomBookingDto> RoomBookings { get; set; }
            public List<OrderDto> Orders { get; set; }
            public List<OrderDrinkDto> OrderDrinks { get; set; }
        }
    }
}
