using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class RoomBookingUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookingItems_Rooms_Id",
                table: "RoomBookingItems");

            migrationBuilder.DropIndex(
                name: "IX_RoomBookingItems_Id",
                table: "RoomBookingItems");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "RoomBookingItems");

            migrationBuilder.CreateIndex(
                name: "IX_RoomBookingItems_RoomId",
                table: "RoomBookingItems",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookingItems_Rooms_RoomId",
                table: "RoomBookingItems",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookingItems_Rooms_RoomId",
                table: "RoomBookingItems");

            migrationBuilder.DropIndex(
                name: "IX_RoomBookingItems_RoomId",
                table: "RoomBookingItems");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "RoomBookingItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RoomBookingItems_Id",
                table: "RoomBookingItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookingItems_Rooms_Id",
                table: "RoomBookingItems",
                column: "Id",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
