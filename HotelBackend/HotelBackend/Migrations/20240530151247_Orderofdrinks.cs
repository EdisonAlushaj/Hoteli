using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Orderofdrinks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderDrinks",
                columns: table => new
                {
                    OrderDrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DeliveryLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeliveryNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDrinks", x => x.OrderDrinkId);
                    table.ForeignKey(
                        name: "FK_OrderDrinks_Userrs_UserId",
                        column: x => x.UserId,
                        principalTable: "Userrs",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDrinkItems",
                columns: table => new
                {
                    OrderDrinkItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderDrinkId = table.Column<int>(type: "int", nullable: false),
                    MenuDrinkId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDrinkItems", x => x.OrderDrinkItemId);
                    table.ForeignKey(
                        name: "FK_OrderDrinkItems_MenuDrinks_MenuDrinkId",
                        column: x => x.MenuDrinkId,
                        principalTable: "MenuDrinks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDrinkItems_OrderDrinks_OrderDrinkId",
                        column: x => x.OrderDrinkId,
                        principalTable: "OrderDrinks",
                        principalColumn: "OrderDrinkId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDrinkItems_MenuDrinkId",
                table: "OrderDrinkItems",
                column: "MenuDrinkId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDrinkItems_OrderDrinkId",
                table: "OrderDrinkItems",
                column: "OrderDrinkId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDrinks_UserId",
                table: "OrderDrinks",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDrinkItems");

            migrationBuilder.DropTable(
                name: "OrderDrinks");
        }
    }
}
