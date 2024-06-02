using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class FitnesApply : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceDaily",
                table: "Fitness");

            migrationBuilder.DropColumn(
                name: "PriceMonthly",
                table: "Fitness");

            migrationBuilder.RenameColumn(
                name: "PriceOffers",
                table: "Fitness",
                newName: "Price");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Fitness",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "FitnesApplys",
                columns: table => new
                {
                    ReservationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FitnesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FitnesApplys", x => x.ReservationId);
                    table.ForeignKey(
                        name: "FK_FitnesApplys_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FitnesApplys_Fitness_FitnesId",
                        column: x => x.FitnesId,
                        principalTable: "Fitness",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FitnesApplys_FitnesId",
                table: "FitnesApplys",
                column: "FitnesId");

            migrationBuilder.CreateIndex(
                name: "IX_FitnesApplys_Id",
                table: "FitnesApplys",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FitnesApplys");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Fitness");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Fitness",
                newName: "PriceOffers");

            migrationBuilder.AddColumn<double>(
                name: "PriceDaily",
                table: "Fitness",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PriceMonthly",
                table: "Fitness",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
