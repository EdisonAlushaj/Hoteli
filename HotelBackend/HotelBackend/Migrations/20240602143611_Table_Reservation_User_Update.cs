using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Table_Reservation_User_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Userrs_UserId",
                table: "TableReservations");

            migrationBuilder.DropIndex(
                name: "IX_TableReservations_UserId",
                table: "TableReservations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TableReservations");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "TableReservations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TableReservations_Id",
                table: "TableReservations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_AspNetUsers_Id",
                table: "TableReservations",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_AspNetUsers_Id",
                table: "TableReservations");

            migrationBuilder.DropIndex(
                name: "IX_TableReservations_Id",
                table: "TableReservations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TableReservations");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TableReservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TableReservations_UserId",
                table: "TableReservations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_Userrs_UserId",
                table: "TableReservations",
                column: "UserId",
                principalTable: "Userrs",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
