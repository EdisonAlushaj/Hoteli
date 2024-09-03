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
    public class OrderSummaryController : ControllerBase
    {
        public readonly DataContext _context;

        public OrderSummaryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("summary/{userId}"), Authorize]
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

            var shezlongReservations = _context.ShezlongReservations
                .Where(sr => sr.Id == userId)
                .Include(sr => sr.Shezlong)
                .ToList();

            var orderCoffees = _context.OrderCoffees
               .Where(oc => oc.Id == userId)
                .Include(oc => oc.OrderCoffeeItems)
                .ThenInclude(oci => oci.MenuCoffee)
                .ToList();

            var activitiesReservations = _context.ActivitiesReservations
                .Where(ar => ar.UserId == userId)
                .Include(ar => ar.Activities)
                .ToList();

            var saunaReservations = _context.SaunaReservations
                .Where(sr => sr.UserId == userId)
                .Include(sr => sr.Sauna)
                .ToList();

            var spaReservations = _context.SpaReservations
                .Where(sr => sr.Id == userId)
                .Include(sr => sr.Spa)
                .ToList();

            var tableReservations = _context.TableReservations
                .Where(tr => tr.Id == userId)
                .Include(tr => tr.Table)
                .ToList();

            var fitnesApplies = _context.FitnesApplys
                .Where(fa => fa.Id == userId)
                .Include(fa => fa.Fitnes)
                .ToList();

            var summary = new OrderSummaryDto
            {
                RoomBookings = roomBookings.Select(MapRoomBookingDto).ToList(),
                Orders = orders.Select(MapOrderToDto).ToList(),
                OrderDrinks = orderDrinks.Select(MapOrderDrinkToDto).ToList(),
                ShezlongReservations = shezlongReservations.Select(MapShezlongReservationToDto).ToList(),
                OrderCoffees = orderCoffees.Select(MapOrderCoffeeToDto).ToList(),
                ActivitiesReservations = activitiesReservations.Select(MapActivitiesReservationToDto).ToList(),
                SaunaReservations = saunaReservations.Select(MapSaunaReservationToDto).ToList(),
                SpaReservations = spaReservations.Select(MapSpaReservationToDto).ToList(),
                TableReservations = tableReservations.Select(MapTableReservationToDto).ToList(),
                FitnesApplies = fitnesApplies.Select(MapFitnesApplyToDto).ToList()
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
                    userDto = null;
                }
            }
            else
            {
                userDto = null;
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
                    RoomName = oi.Roomname,
                    Price = oi.Price,
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
                    userDto = null;
                }
            }
            else
            {
                userDto = null;
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
                    FoodName = oi.Foodname,
                    Price = oi.Price,
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
        }
        private ShezlongReservationDto MapShezlongReservationToDto(ShezlongReservation shezlongReservation)
        {
            var user = _context.Users.Find(shezlongReservation.Id);
            return new ShezlongReservationDto
            {
                ReservationId = shezlongReservation.ReservationId,
                User = new UserDto
                {
                    UserId = user.Id,
                    Name = user.Name
                },
                ShezlongId = shezlongReservation.ShezlongId,
                ReservationDate = shezlongReservation.ReservationDate
            };
        }
        private OrderCoffeeDto MapOrderCoffeeToDto(OrderCoffee orderCoffee)
        {
            var user = _context.Users.Find(orderCoffee.Id);
            return new OrderCoffeeDto
            {
                OrderCoffeeId = orderCoffee.OrderCoffeeId,
                User = new UseriiDto
                {
                    Id = user.Id,
                    Name = user.Name
                },
                DeliveryLocation = orderCoffee.DeliveryLocation,
                DeliveryNumber = orderCoffee.DeliveryNumber,
                PaymentMethod = orderCoffee.PaymentMethod,
                TotalOrderPrice = orderCoffee.TotalOrderCoffeePrice,
                OrderCoffeeItems = orderCoffee.OrderCoffeeItems.Select(oi => new OrderCoffeeItemDto
                {
                    MenuCoffeeId = oi.MenuCoffeeId,
                    CafeName = oi.CafeName,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToArray()
            };
        }
        private ActivitiesReservationDto MapActivitiesReservationToDto(ActivitiesReservation activitiesReservation)
        {
            var user = _context.Users.Find(activitiesReservation.UserId);
            return new ActivitiesReservationDto
            {
                ReservationId = activitiesReservation.ReservationId,
                User = new UserDto
                {
                    UserId = user.Id,
                    Name = user.Name
                },
                ActivitiesId = activitiesReservation.ActivitiesId,
                ActivitiesName = activitiesReservation.Activities.Name
            };
        }
        private SaunaReservationDto MapSaunaReservationToDto(SaunaReservation saunaReservation)
        {
            var user = _context.Users.Find(saunaReservation.UserId);
            return new SaunaReservationDto
            {
                ReservationId = saunaReservation.ReservationId,
                User = new UserDto
                {
                    UserId = user.Id,
                    Name = user.Name
                },
                SaunaId = saunaReservation.SaunaId,
                SaunaName = saunaReservation.Sauna.Name,
                ReservationDate = saunaReservation.ReservationDate
            };
        }

        private SpaReservationDto MapSpaReservationToDto(SpaReservation spaReservation)
        {
            var user = _context.Users.Find(spaReservation.Id);
            return new SpaReservationDto
            {
                ReservationId = spaReservation.ReservationId,
                User = new UserDto
                {
                    UserId = user.Id,
                    Name = user.Name
                },
                SpaId = spaReservation.SpaId,
                SpaName = spaReservation.Spa.Name,
                ReservationDate = spaReservation.ReservationDate
            };
        }

        private TableReservationDto MapTableReservationToDto(TableReservation tableReservation)
        {
            var user = _context.Users.Find(tableReservation.Id);
            return new TableReservationDto
            {
                ReservationId = tableReservation.ReservationId,
                User = new UserDto
                {
                    UserId = user.Id,
                    Name = user.Name
                },
                TableId = tableReservation.TableId,
                ReservationDate = tableReservation.ReservationDate,
                MaxGuests = tableReservation.MaxGuests,
                SpecialRequests = tableReservation.SpecialRequests,
                Establishment = tableReservation.Establishment
            };
        }

        private FitnesApplyDto MapFitnesApplyToDto(FitnesApply fitnesApply)
        {
            var user = _context.Users.Find(fitnesApply.Id);
            return new FitnesApplyDto
            {
                ReservationId = fitnesApply.ReservationId,
                User = new UserDto
                {
                    UserId = user.Id,
                    Name = user.Name
                },
                FitnesId = fitnesApply.FitnesId,
            };
        }

        public class ShezlongReservationDto
        {
            public int ReservationId { get; set; }
            public UserDto User { get; set; }
            public int ShezlongId { get; set; }
            public DateTime ReservationDate { get; set; }
        }

        public class OrderSummaryDto
        {
            public List<RoomBookingDto> RoomBookings { get; set; }
            public List<OrderDto> Orders { get; set; }
            public List<OrderDrinkDto> OrderDrinks { get; set; }
            public List<ShezlongReservationDto> ShezlongReservations { get; set; }
            public List<OrderCoffeeDto> OrderCoffees { get; set; }
            public List<ActivitiesReservationDto> ActivitiesReservations { get; set; }
            public List<SaunaReservationDto> SaunaReservations { get; set; }
            public List<SpaReservationDto> SpaReservations { get; set; }
            public List<TableReservationDto> TableReservations { get; set; }
            public List<FitnesApplyDto> FitnesApplies { get; set; }
        }

        public class ActivitiesReservationDto
        {
            public int ReservationId { get; set; }
            public UserDto User { get; set; }
            public int ActivitiesId { get; set; }
            public string ActivitiesName { get; set; }
        }

        public class SaunaReservationDto
        {
            public int ReservationId { get; set; }
            public UserDto User { get; set; }
            public int SaunaId { get; set; }
            public string SaunaName { get; set; }
            public DateTime ReservationDate { get; set; }
        }

        public class SpaReservationDto
        {
            public int ReservationId { get; set; }
            public UserDto User { get; set; }
            public int SpaId { get; set; }
            public string SpaName { get; set; }
            public DateTime ReservationDate { get; set; }
        }

        public class TableReservationDto
        {
            public int ReservationId { get; set; }
            public UserDto User { get; set; }
            public int TableId { get; set; }
            public DateTime ReservationDate { get; set; }
            public int MaxGuests { get; set; }
            public string SpecialRequests { get; set; }
            public EstablishmentType Establishment { get; set; }
        }

        public class FitnesApplyDto
        {
            public int ReservationId { get; set; }
            public UserDto User { get; set; }
            public int FitnesId { get; set; }
        }
    }
}
