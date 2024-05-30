﻿namespace HotelBackend.Entities
{
    public class Spa
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int HallId { get; set; }
        public int DurationInMinutes { get; set; }
    }
}
