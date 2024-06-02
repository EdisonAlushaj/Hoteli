using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class OrderDrinks_Update_Id : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDrinks_AspNetUsers_UserId",
                table: "OrderDrinks");

            migrationBuilder.DropIndex(
                name: "IX_OrderDrinks_UserId",
                table: "OrderDrinks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "OrderDrinks");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "OrderDrinks",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDrinks_Id",
                table: "OrderDrinks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDrinks_AspNetUsers_Id",
                table: "OrderDrinks",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDrinks_AspNetUsers_Id",
                table: "OrderDrinks");

            migrationBuilder.DropIndex(
                name: "IX_OrderDrinks_Id",
                table: "OrderDrinks");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "OrderDrinks",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "OrderDrinks",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDrinks_UserId",
                table: "OrderDrinks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDrinks_AspNetUsers_UserId",
                table: "OrderDrinks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
