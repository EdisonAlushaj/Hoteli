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

        public DbSet<AboutContent> AboutContents { get; set; }
        public DbSet<MenuCafe> MenuCafes { get; set; }
        public DbSet<MenuDrink> MenuDrinks { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .Property(r => r.Salary)
                .HasColumnType("decimal(18, 2)"); 
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Activities> Activities { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<GymE> GymEs { get; set; }
        public DbSet<Spa> Spas { get; set; }
    }
}
