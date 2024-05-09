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
        public DbSet<Roli> Rolis { get; set; }
        public DbSet<Userr> Userrs { get; set; }
        public DbSet<UsersRoles> UsersRoless { get; set; }
        public DbSet<Pool> Pools { get; set; }
        public DbSet<Shezlong> Shezlongs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pool>()
                 .HasOne<Hall>() 
                 .WithMany()
                 .HasForeignKey(p => p.HallId)
                 .IsRequired();

            modelBuilder.Entity<Shezlong>()
                  .HasOne(s => s.Pool)
                  .WithMany(p => p.Shezlongs)
                  .HasForeignKey(s => s.PoolId);

            modelBuilder.Entity<Fitnes>()
                 .HasOne<Hall>()
                 .WithMany()
                 .HasForeignKey(p => p.HallId)
                 .IsRequired();

            modelBuilder.Entity<FitnesEquipmet>()
                 .HasOne<Fitnes>()
                 .WithMany()
                 .HasForeignKey(p => p.FitnesId)
                 .IsRequired();

            modelBuilder.Entity<Roli>()
                .Property(r => r.RoleSalary)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<UsersRoles>()
            .HasKey(ur => new { ur.UsersId, ur.RolesId });

            modelBuilder.Entity<UsersRoles>()
                .HasOne(ur => ur.Userr)
                .WithMany()
                .HasForeignKey(ur => ur.UsersId);

            modelBuilder.Entity<UsersRoles>()
                .HasOne(ur => ur.Roles)
                .WithMany()
                .HasForeignKey(ur => ur.RolesId);

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Activities> Activities { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<FitnesEquipmet> FitnesEquipmets { get; set; }
        public DbSet<Spa> Spas { get; set; }
        public DbSet<Fitnes> Fitness { get; set; }
    
    }
}
