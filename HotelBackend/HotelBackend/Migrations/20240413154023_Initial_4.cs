using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Initial_4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MenuCafes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CafeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CafeDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CafePrice = table.Column<double>(type: "float", nullable: false),
                    CafeImage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuCafes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MenuCafes");
        }
    }
}
