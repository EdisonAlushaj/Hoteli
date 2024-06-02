using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Spa_Reservation_User_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpaReservations_Userrs_UserId",
                table: "SpaReservations");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "SpaReservations",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_SpaReservations_AspNetUsers_UserId",
                table: "SpaReservations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpaReservations_AspNetUsers_UserId",
                table: "SpaReservations");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "SpaReservations",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_SpaReservations_Userrs_UserId",
                table: "SpaReservations",
                column: "UserId",
                principalTable: "Userrs",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
