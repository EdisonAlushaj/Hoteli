using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class updateprimarykeytablereservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TableReservations",
                table: "TableReservations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TableReservations",
                table: "TableReservations",
                column: "TableReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_TableReservations_UserId",
                table: "TableReservations",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TableReservations",
                table: "TableReservations");

            migrationBuilder.DropIndex(
                name: "IX_TableReservations_UserId",
                table: "TableReservations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TableReservations",
                table: "TableReservations",
                columns: new[] { "UserId", "Id" });
        }
    }
}
