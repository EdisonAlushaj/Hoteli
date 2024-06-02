using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Shezlong_Reservation_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShezlongReservations_Userrs_UserId",
                table: "ShezlongReservations");

            migrationBuilder.DropIndex(
                name: "IX_ShezlongReservations_UserId",
                table: "ShezlongReservations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ShezlongReservations");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "ShezlongReservations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShezlongReservations_Id",
                table: "ShezlongReservations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShezlongReservations_AspNetUsers_Id",
                table: "ShezlongReservations",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShezlongReservations_AspNetUsers_Id",
                table: "ShezlongReservations");

            migrationBuilder.DropIndex(
                name: "IX_ShezlongReservations_Id",
                table: "ShezlongReservations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ShezlongReservations");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ShezlongReservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ShezlongReservations_UserId",
                table: "ShezlongReservations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShezlongReservations_Userrs_UserId",
                table: "ShezlongReservations",
                column: "UserId",
                principalTable: "Userrs",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
