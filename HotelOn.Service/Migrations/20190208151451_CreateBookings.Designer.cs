﻿// <auto-generated />
using System;
using HotelOn.Service.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HotelOn.Service.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190208151451_CreateBookings")]
    partial class CreateBookings
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HotelOn.Service.Models.Booking", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BookingName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int>("Capacity");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("Duration");

                    b.Property<bool>("IsActive");

                    b.Property<int>("RoomID");

                    b.Property<DateTime>("StartOn");

                    b.Property<double>("Total");

                    b.HasKey("ID");

                    b.HasIndex("RoomID");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("HotelOn.Service.Models.PaymentOption", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("Index");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.Property<double>("Ratio");

                    b.HasKey("ID");

                    b.ToTable("PaymentOptions");
                });

            modelBuilder.Entity("HotelOn.Service.Models.Room", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<bool>("IsAvailable");

                    b.Property<int>("RoomNumber");

                    b.Property<int>("RoomTypeID");

                    b.HasKey("ID");

                    b.HasIndex("RoomTypeID");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("HotelOn.Service.Models.RoomType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.Property<double>("Price");

                    b.Property<double>("Tax");

                    b.HasKey("ID");

                    b.ToTable("RoomTypes");
                });

            modelBuilder.Entity("HotelOn.Service.Models.Booking", b =>
                {
                    b.HasOne("HotelOn.Service.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HotelOn.Service.Models.Room", b =>
                {
                    b.HasOne("HotelOn.Service.Models.RoomType", "RoomType")
                        .WithMany()
                        .HasForeignKey("RoomTypeID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
