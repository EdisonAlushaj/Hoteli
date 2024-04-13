using Microsoft.EntityFrameworkCore;
using HotelBackend.Entities;

namespace HotelBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<SuperHero> SuperHeroes { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<MenuFood> MenuFoods { get; set; }

        public DbSet<MenuCafe> MenuCafes { get; set; }
    }
}
