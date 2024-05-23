using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomBookingController : ControllerBase
    {
        private readonly DataContext _context;

        public RoomBookingController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateBooking([FromBody] RoomBookingCreationDto roomBookingDto)
        {
            if (roomBookingDto == null || roomBookingDto.RoomBookingItems == null || roomBookingDto.RoomBookingItems.Length == 0)
            {
                return BadRequest("Invalid booking data.");
            }

            // Retrieve the user
            var user = _context.Userrs.Find(roomBookingDto.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Create order
            var roomBooking = new RoomBooking
            {
                UserId = roomBookingDto.UserId,
                PaymentMethod = roomBookingDto.PaymentMethod,
                RoomBookingItems = roomBookingDto.RoomBookingItems.Select(item => new RoomBookingItem
                {
                    RoomId = item.RoomId,
                    Quantity = item.Quantity
                }).ToList()
            };

            // Calculate prices for order items
            foreach (var item in roomBooking.RoomBookingItems)
            {
                var room = _context.Rooms.Find(item.RoomId);
                if (room == null)
                {
                    return BadRequest($"Room item with ID {item.RoomId} not found.");
                }
                item.Price = room.Price * item.Quantity;
            }

            // Calculate total order price
            roomBooking.CalculateTotalBookingPrice();

            // Add order to context and save changes
            _context.RoomBookings.Add(roomBooking);
            _context.SaveChanges();

            // Create a DTO for the response including the user details and excluding price from order items
            var responseDto = new RoomBookingDto
            {
                RoomBookingId = roomBooking.RoomBookingId,
                User = new UserDto
                {
                    UserId = user.UserId,
                    Name = user.UserFullName
                },
                PaymentMethod = roomBooking.PaymentMethod,
                TotalBookingPrice = roomBooking.TotalBookingPrice, // Calculated total price
                RoomBookingItems = roomBooking.RoomBookingItems.Select(oi => new RoomBookingItemDto
                {
                    RoomId = oi.RoomId,
                    Quantity = oi.Quantity
                }).ToArray()
            };

            return CreatedAtAction(nameof(GetRoomBookingById), new { id = roomBooking.RoomBookingId }, responseDto);
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var roomBookings = _context.RoomBookings
                .Include(o => o.RoomBookingItems)
                .ThenInclude(oi => oi.Room)
                .ToList();

            // Ensure total order price is calculated for each order
            foreach (var room in roomBookings)
            {
                room.CalculateTotalBookingPrice();
            }

            var roomDtos = roomBookings.Select(MapRoomBookingDto).ToList();

            return Ok(roomDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetRoomBookingById(int id)
        {
            var roomBooking = _context.RoomBookings
                .Include(o => o.RoomBookingItems)
                .ThenInclude(oi => oi.Room)
                .FirstOrDefault(o => o.RoomBookingId == id);

            if (roomBooking == null)
            {
                return NotFound();
            }

            // Ensure total order price is calculated
            roomBooking.CalculateTotalBookingPrice();

            return Ok(MapRoomBookingDto(roomBooking));
        }

        // Map Order entity to OrderDto
        private RoomBookingDto MapRoomBookingDto(RoomBooking roomBooking)
        {
            var user = _context.Userrs.Find(roomBooking.UserId);
            return new RoomBookingDto
            {
                RoomBookingId = roomBooking.RoomBookingId,
                User = new UserDto
                {
                    UserId = user.UserId,
                    Name = user.UserFullName
                },
                PaymentMethod = roomBooking.PaymentMethod,
                TotalBookingPrice = roomBooking.TotalBookingPrice,
                RoomBookingItems = roomBooking.RoomBookingItems.Select(oi => new RoomBookingItemDto
                {
                    RoomId = oi.RoomId,
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteRoomBooking(int id)
        {
            var roomBooking = _context.RoomBookings.Find(id);

            if (roomBooking == null)
            {
                return NotFound();
            }

            _context.RoomBookings.Remove(roomBooking);
            _context.SaveChanges();

            return NoContent(); // 204 No Content response
        }
    }


    // Define DTOs for order
    public class RoomBookingDto
    {
        public int RoomBookingId { get; set; }
        public UserDto User { get; set; } // Include User object
        public string PaymentMethod { get; set; }
        public double TotalBookingPrice { get; set; }
        public RoomBookingItemDto[] RoomBookingItems { get; set; }
    }

    // Define DTO for user details
    public class RoomDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
    }

    // Define DTO for order item
    public class RoomBookingItemDto
    {
        public int RoomId { get; set; }
        public int Quantity { get; set; }
        // Note: Price property is excluded here
    }

    // Define DTO for order creation
    public class RoomBookingCreationDto
    {
        public int UserId { get; set; }
        public string PaymentMethod { get; set; }
        public RoomBookingItemDto[] RoomBookingItems { get; set; }
    }
}
