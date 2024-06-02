using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Table_Reservation_TableID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Tables_Id",
                table: "TableReservations");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "TableReservations",
                newName: "TableId");

            migrationBuilder.RenameIndex(
                name: "IX_TableReservations_Id",
                table: "TableReservations",
                newName: "IX_TableReservations_TableId");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_Tables_TableId",
                table: "TableReservations",
                column: "TableId",
                principalTable: "Tables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableReservations_Tables_TableId",
                table: "TableReservations");

            migrationBuilder.RenameColumn(
                name: "TableId",
                table: "TableReservations",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_TableReservations_TableId",
                table: "TableReservations",
                newName: "IX_TableReservations_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TableReservations_Tables_Id",
                table: "TableReservations",
                column: "Id",
                principalTable: "Tables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
