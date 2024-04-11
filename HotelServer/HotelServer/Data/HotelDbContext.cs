using HotelServer.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelServer.Data
{
    public class HotelDbContext : DbContext
    {   

        public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options)
        {
        }

        public DbSet<Room> rooms {  get; set; } 
    }
}
