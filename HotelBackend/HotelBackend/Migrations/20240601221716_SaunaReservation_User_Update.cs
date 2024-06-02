using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class SaunaReservation_User_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaunaReservations_Userrs_UserId",
                table: "SaunaReservations");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "SaunaReservations",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_SaunaReservations_AspNetUsers_UserId",
                table: "SaunaReservations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaunaReservations_AspNetUsers_UserId",
                table: "SaunaReservations");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "SaunaReservations",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_SaunaReservations_Userrs_UserId",
                table: "SaunaReservations",
                column: "UserId",
                principalTable: "Userrs",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
