using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class SpaReservation_Id_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpaReservations_AspNetUsers_UserId",
                table: "SpaReservations");

            migrationBuilder.DropIndex(
                name: "IX_SpaReservations_UserId",
                table: "SpaReservations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SpaReservations");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "SpaReservations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SpaReservations_Id",
                table: "SpaReservations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SpaReservations_AspNetUsers_Id",
                table: "SpaReservations",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpaReservations_AspNetUsers_Id",
                table: "SpaReservations");

            migrationBuilder.DropIndex(
                name: "IX_SpaReservations_Id",
                table: "SpaReservations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "SpaReservations");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "SpaReservations",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_SpaReservations_UserId",
                table: "SpaReservations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SpaReservations_AspNetUsers_UserId",
                table: "SpaReservations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
