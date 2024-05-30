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
        public async Task<IActionResult> CreateBooking([FromBody] RoomBookingCreationDto roomBookingDto)
        {
            if (roomBookingDto == null || roomBookingDto.RoomBookingItems == null || roomBookingDto.RoomBookingItems.Length == 0)
            {
                return BadRequest("Invalid booking data.");
            }

            var user = await _context.Userrs.FindAsync(roomBookingDto.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Check if the room is available for booking on the selected dates
            foreach (var item in roomBookingDto.RoomBookingItems)
            {
                var existingReservation = await _context.RoomBookings
                    .Where(rb => rb.RoomBookingItems.Any(rbi => rbi.RoomId == item.RoomId))
                    .AnyAsync(rb => rb.CheckInDate <= roomBookingDto.CheckOutDate && rb.CheckOutDate >= roomBookingDto.CheckInDate);

                if (existingReservation)
                {
                    return Conflict($"Room {item.RoomId} is already reserved on the selected dates.");
                }
            }

            // Create a new room booking
            var roomBooking = new RoomBooking
            {
                UserId = roomBookingDto.UserId,
                PaymentMethod = roomBookingDto.PaymentMethod,
                CheckInDate = roomBookingDto.CheckInDate,
                CheckOutDate = roomBookingDto.CheckOutDate,
                RoomBookingItems = roomBookingDto.RoomBookingItems.Select(item => new RoomBookingItem
                {
                    RoomId = item.RoomId,
                    Quantity = item.Quantity
                }).ToList()
            };

            foreach (var item in roomBooking.RoomBookingItems)
            {
                var room = await _context.Rooms.FindAsync(item.RoomId);
                if (room == null)
                {
                    return BadRequest($"Room item with ID {item.RoomId} not found.");
                }
                item.Price = room.Price * item.Quantity;
            }

            roomBooking.CalculateTotalBookingPrice();

            _context.RoomBookings.Add(roomBooking);
            await _context.SaveChangesAsync();

            var responseDto = new RoomBookingDto
            {
                RoomBookingId = roomBooking.RoomBookingId,
                User = new UserDto
                {
                    UserId = user.UserId,
                    Name = user.UserFullName
                },
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

            return CreatedAtAction(nameof(GetRoomBookingById), new { id = roomBooking.RoomBookingId }, responseDto);
        }

        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableRooms(DateTime checkInDate, DateTime checkOutDate)
        {
            if (checkInDate > checkOutDate)
            {
                return BadRequest("Check-in date must be before check-out date.");
            }

            var roomBookings = _context.RoomBookings
                .Where(rb => rb.CheckOutDate >= checkInDate && rb.CheckInDate <= checkOutDate);

            var availableRooms = await _context.Rooms
                .Where(r => !roomBookings
                    .Any(rb => rb.RoomBookingItems.Any(rbi => rbi.RoomId == r.Id)))
                .Select(r => new
                {
                    r.Id,
                    r.RoomName,
                    r.Price,
                    AvailableFrom = _context.RoomBookings
                        .Where(rb => rb.RoomBookingItems.Any(rbi => rbi.RoomId == r.Id))
                        .OrderByDescending(rb => rb.CheckOutDate)
                        .Select(rb => (DateTime?)rb.CheckOutDate)
                        .FirstOrDefault() ?? checkInDate,
                    AvailableTo = checkOutDate
                })
                .ToListAsync();

            return Ok(availableRooms);
        }


        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var roomBookings = _context.RoomBookings
                .Include(o => o.RoomBookingItems)
                .ThenInclude(oi => oi.Room)
                .ToList();

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

            roomBooking.CalculateTotalBookingPrice();

            return Ok(MapRoomBookingDto(roomBooking));
        }

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

            return NoContent();
        }
    }


    public class RoomBookingDto
    {
        public int RoomBookingId { get; set; }
        public UserDto User { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public double TotalBookingPrice { get; set; }
        public RoomBookingItemDto[] RoomBookingItems { get; set; }
    }

    public class RoomDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
    }

    public class RoomBookingItemDto
    {
        public int RoomId { get; set; }
        public int Quantity { get; set; }
    }

    public class RoomBookingCreationDto
    {
        public int UserId { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public RoomBookingItemDto[] RoomBookingItems { get; set; }
    }
}
