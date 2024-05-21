using HotelBackend.Entities;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<ShezlongReservation> ShezlongReservations { get; set; }
        public DbSet<SpaReservation> SpaReservations { get; set; }
        public DbSet<Pool> Pools { get; set; }
        public DbSet<ContactRequest> ContactRequests { get; set; }
        public DbSet<Shezlong> Shezlongs { get; set; }
        public DbSet<TableReservation> TableReservations { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pool>()
                 .HasOne<Hall>()
                 .WithMany()
                 .HasForeignKey(p => p.HallId)
                 .IsRequired();

            modelBuilder.Entity<Shezlong>()
                  .HasOne<Pool>()
                  .WithMany()
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

            modelBuilder.Entity<Sauna>()
                 .HasOne<Hall>()
                 .WithMany()
                 .HasForeignKey(p => p.HallId)
                 .IsRequired();

            modelBuilder.Entity<Roli>()
                .Property(r => r.RoleSalary)
                .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<UsersRoles>()
            .HasKey(ur => new { ur.UsersRolesId });

            modelBuilder.Entity<UsersRoles>()
                .HasOne(ur => ur.Userr)
                .WithMany()
                .HasForeignKey(ur => ur.UsersId);

            modelBuilder.Entity<UsersRoles>()
                .HasOne(ur => ur.Roles)
                .WithMany()
                .HasForeignKey(ur => ur.RolesId);

            modelBuilder.Entity<ShezlongReservation>()
          .HasKey(sr => new { sr.ReservationId });

            modelBuilder.Entity<ShezlongReservation>()
                .HasOne(sr => sr.Userr)
                .WithMany()
                .HasForeignKey(sr => sr.UserId);

            modelBuilder.Entity<ShezlongReservation>()
                .HasOne(sr => sr.Shezlong)
                .WithMany()
                .HasForeignKey(sr => sr.ShezlongId);

            modelBuilder.Entity<SpaReservation>()
          .HasKey(sr => new { sr.ReservationId });

            modelBuilder.Entity<SpaReservation>()
                .HasOne(sr => sr.Userr)
                .WithMany()
                .HasForeignKey(sr => sr.UserId);

            modelBuilder.Entity<SpaReservation>()
                .HasOne(sr => sr.Spa)
                .WithMany()
                .HasForeignKey(sr => sr.SpaId);

            modelBuilder.Entity<TableReservation>()
        .HasKey(ur => new { ur.TableReservationId });

            modelBuilder.Entity<TableReservation>()
                .HasOne(tr => tr.User)
                .WithMany()
                .HasForeignKey(tr => tr.UserId);

            modelBuilder.Entity<TableReservation>()
                .HasOne(tr => tr.Table)
                .WithMany()
                .HasForeignKey(tr => tr.Id);
     

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Activities> Activities { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<FitnesEquipmet> FitnesEquipmets { get; set; }
        public DbSet<Spa> Spas { get; set; }
        public DbSet<Fitnes> Fitness { get; set; }
        public DbSet<Sauna> Saunas { get; set; }
    }
}
