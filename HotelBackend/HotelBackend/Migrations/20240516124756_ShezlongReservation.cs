using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class ShezlongReservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShezlongReservations",
                columns: table => new
                {
                    ReservationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ShezlongId = table.Column<int>(type: "int", nullable: false),
                    ReservationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShezlongReservations", x => x.ReservationId);
                    table.ForeignKey(
                        name: "FK_ShezlongReservations_Shezlongs_ShezlongId",
                        column: x => x.ShezlongId,
                        principalTable: "Shezlongs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShezlongReservations_Userrs_UserId",
                        column: x => x.UserId,
                        principalTable: "Userrs",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShezlongReservations_ShezlongId",
                table: "ShezlongReservations",
                column: "ShezlongId");

            migrationBuilder.CreateIndex(
                name: "IX_ShezlongReservations_UserId",
                table: "ShezlongReservations",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShezlongReservations");
        }
    }
}
