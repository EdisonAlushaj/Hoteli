using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class OrderCoffee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderCoffees",
                columns: table => new
                {
                    OrderCoffeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DeliveryLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeliveryNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderCoffees", x => x.OrderCoffeeId);
                    table.ForeignKey(
                        name: "FK_OrderCoffees_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrderCoffeeItems",
                columns: table => new
                {
                    OrderCoffeeItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderCoffeeId = table.Column<int>(type: "int", nullable: false),
                    MenuCoffeeId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderCoffeeItems", x => x.OrderCoffeeItemId);
                    table.ForeignKey(
                        name: "FK_OrderCoffeeItems_MenuCafes_MenuCoffeeId",
                        column: x => x.MenuCoffeeId,
                        principalTable: "MenuCafes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderCoffeeItems_OrderCoffees_OrderCoffeeId",
                        column: x => x.OrderCoffeeId,
                        principalTable: "OrderCoffees",
                        principalColumn: "OrderCoffeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderCoffeeItems_MenuCoffeeId",
                table: "OrderCoffeeItems",
                column: "MenuCoffeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderCoffeeItems_OrderCoffeeId",
                table: "OrderCoffeeItems",
                column: "OrderCoffeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderCoffees_Id",
                table: "OrderCoffees",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderCoffeeItems");

            migrationBuilder.DropTable(
                name: "OrderCoffees");
        }
    }
}
