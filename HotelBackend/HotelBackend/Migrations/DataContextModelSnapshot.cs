﻿// <auto-generated />
using System;
using HotelBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HotelBackend.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AboutContent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AboutContents");
                });

            modelBuilder.Entity("ContactRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ContactRequests");
                });

            modelBuilder.Entity("HotelBackend.Entities.Activities", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Cost")
                        .HasColumnType("float");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("HotelBackend.Entities.Fitnes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FitnesName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HallId")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("PriceDaily")
                        .HasColumnType("float");

                    b.Property<double>("PriceMonthly")
                        .HasColumnType("float");

                    b.Property<double>("PriceOffers")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("HallId");

                    b.ToTable("Fitness");
                });

            modelBuilder.Entity("HotelBackend.Entities.FitnesEquipmet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FitnesId")
                        .HasColumnType("int");

                    b.Property<string>("GymEqName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FitnesId");

                    b.ToTable("FitnesEquipmets");
                });

            modelBuilder.Entity("HotelBackend.Entities.Hall", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Floor")
                        .HasColumnType("int");

                    b.Property<string>("HallName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Halls");
                });

            modelBuilder.Entity("HotelBackend.Entities.MenuCafe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CafeDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CafeImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CafeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("CafePrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("MenuCafes");
                });

            modelBuilder.Entity("HotelBackend.Entities.MenuDrink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DrinkDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DrinkImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DrinkName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("DrinkPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("MenuDrinks");
                });

            modelBuilder.Entity("HotelBackend.Entities.MenuFood", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FoodDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FoodImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FoodName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("FoodPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("MenuFoods");
                });

            modelBuilder.Entity("HotelBackend.Entities.Pool", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HallId")
                        .HasColumnType("int");

                    b.Property<int>("NumberofGuests")
                        .HasColumnType("int");

                    b.Property<string>("PoolArea")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("HallId");

                    b.ToTable("Pools");
                });

            modelBuilder.Entity("HotelBackend.Entities.Roli", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleContractType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleDepartment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("RoleEndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("RoleLanguageSkills")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("RoleSalary")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("RoleStartDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("RoleUniformRequirements")
                        .HasColumnType("bit");

                    b.HasKey("RoleId");

                    b.ToTable("Rolis");
                });

            modelBuilder.Entity("HotelBackend.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Capacity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<string>("RoomName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Size")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("HotelBackend.Entities.Sauna", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Cost")
                        .HasColumnType("float");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HallId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("HallId");

                    b.ToTable("Saunas");
                });

            modelBuilder.Entity("HotelBackend.Entities.Shezlong", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PoolId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PoolId");

                    b.ToTable("Shezlongs");
                });

            modelBuilder.Entity("HotelBackend.Entities.Spa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HallId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Spas");
                });

            modelBuilder.Entity("HotelBackend.Entities.SuperHero", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Place")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SuperHeroes");
                });

            modelBuilder.Entity("HotelBackend.Entities.Table", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Establishment")
                        .HasColumnType("int");

                    b.Property<int>("MaxGuests")
                        .HasColumnType("int");

                    b.Property<int>("TableNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Tables");
                });

            modelBuilder.Entity("HotelBackend.Entities.TableReservation", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<int>("Establishment")
                        .HasColumnType("int");

                    b.Property<int>("MaxGuests")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReservationDate")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("ReservationTime")
                        .HasColumnType("time");

                    b.Property<string>("SpecialRequests")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<int>("TableReservationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TableReservationId"));

                    b.HasKey("UserId", "Id");

                    b.HasIndex("Id");

                    b.ToTable("TableReservations");
                });

            modelBuilder.Entity("HotelBackend.Entities.Userr", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("UserContactNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserFullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Userrs");
                });

            modelBuilder.Entity("HotelBackend.Entities.UsersRoles", b =>
                {
                    b.Property<int>("UsersRolesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UsersRolesId"));

                    b.Property<int>("RolesId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("UsersRolesId");

                    b.HasIndex("RolesId");

                    b.HasIndex("UsersId");

                    b.ToTable("UsersRoless");
                });

            modelBuilder.Entity("HotelBackend.Entities.Fitnes", b =>
                {
                    b.HasOne("HotelBackend.Entities.Hall", null)
                        .WithMany()
                        .HasForeignKey("HallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HotelBackend.Entities.FitnesEquipmet", b =>
                {
                    b.HasOne("HotelBackend.Entities.Fitnes", null)
                        .WithMany()
                        .HasForeignKey("FitnesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HotelBackend.Entities.Pool", b =>
                {
                    b.HasOne("HotelBackend.Entities.Hall", null)
                        .WithMany()
                        .HasForeignKey("HallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HotelBackend.Entities.Sauna", b =>
                {
                    b.HasOne("HotelBackend.Entities.Hall", null)
                        .WithMany()
                        .HasForeignKey("HallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HotelBackend.Entities.Shezlong", b =>
                {
                    b.HasOne("HotelBackend.Entities.Pool", "Pool")
                        .WithMany()
                        .HasForeignKey("PoolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pool");
                });

            modelBuilder.Entity("HotelBackend.Entities.TableReservation", b =>
                {
                    b.HasOne("HotelBackend.Entities.Table", "Table")
                        .WithMany()
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HotelBackend.Entities.Userr", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Table");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HotelBackend.Entities.UsersRoles", b =>
                {
                    b.HasOne("HotelBackend.Entities.Roli", "Roles")
                        .WithMany()
                        .HasForeignKey("RolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HotelBackend.Entities.Userr", "Userr")
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Roles");

                    b.Navigation("Userr");
                });
#pragma warning restore 612, 618
        }
    }
}
