﻿using HotelBackend.Data;
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

            var user = _context.Users.Find(orderDto.Id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

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

            foreach (var item in order.OrderDrinkItems)
            {
                var menuDrink = _context.MenuDrinks.Find(item.MenuDrinkId);
                if (menuDrink == null)
                {
                    return BadRequest($"Menu drink item with ID {item.MenuDrinkId} not found.");
                }
                item.DrinkName = menuDrink.DrinkName;
                item.Price = menuDrink.DrinkPrice * item.Quantity;
            }

            order.CalculateTotalOrderDrinkPrice();

            _context.OrderDrinks.Add(order);
            _context.SaveChanges();

            
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
                TotalOrderPrice = order.TotalOrderDrinkPrice, 
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

            order.CalculateTotalOrderDrinkPrice();

            return Ok(MapOrderDrinkToDto(order));
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
                    DrinkName = oi.DrinkName,
                    Price = oi.Price,
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
        public double TotalOrderPrice { get; set; }
        public OrderDrinkItemDto[] OrderDrinkItems { get; set; }
    }

    public class UseriDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class OrderDrinkItemDto
    {
        public int MenuDrinkId { get; set; }
        public string DrinkName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderDrinkCreationDto
    {
        public string Id { get; set; }
        public string DeliveryLocation { get; set; }
        public string DeliveryNumber { get; set; }
        public string PaymentMethod { get; set; }
        public OrderDrinkItemDto[] OrderDrinkItems { get; set; }
    }
}