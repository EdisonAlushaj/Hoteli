using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Shezlong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Shezlongs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PoolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shezlongs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shezlongs_Pools_PoolId",
                        column: x => x.PoolId,
                        principalTable: "Pools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Shezlongs_PoolId",
                table: "Shezlongs",
                column: "PoolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Shezlongs");
        }
    }
}
