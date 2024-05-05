using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class GymEEs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "GymEs",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                GymEqName = table.Column<string>(nullable: false),
                Description = table.Column<string>(nullable: true),
                Image = table.Column<string>(nullable: true),
                GymId = table.Column<int>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_GymEs", x => x.Id);
                table.ForeignKey(
                    name: "FK_GymEs_Gymss_GymId",
                    column: x => x.GymId,
                    principalTable: "Gymss",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });
            migrationBuilder.CreateIndex(
               name: "IX_GymEs_GymId",
               table: "GymEs",
               column: "GymId");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
            name: "GymEs");

        }
    }
}
