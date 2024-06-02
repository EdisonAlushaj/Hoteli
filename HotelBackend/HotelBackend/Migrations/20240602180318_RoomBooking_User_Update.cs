using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class RoomBooking_User_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_Userrs_UserId",
                table: "RoomBookings");

            migrationBuilder.DropIndex(
                name: "IX_RoomBookings_UserId",
                table: "RoomBookings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RoomBookings");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "RoomBookings",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoomBookings_Id",
                table: "RoomBookings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_AspNetUsers_Id",
                table: "RoomBookings",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_AspNetUsers_Id",
                table: "RoomBookings");

            migrationBuilder.DropIndex(
                name: "IX_RoomBookings_Id",
                table: "RoomBookings");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "RoomBookings");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "RoomBookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RoomBookings_UserId",
                table: "RoomBookings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_Userrs_UserId",
                table: "RoomBookings",
                column: "UserId",
                principalTable: "Userrs",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
