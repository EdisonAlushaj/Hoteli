using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class OrderDrinks_Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDrinks_Userrs_UserId",
                table: "OrderDrinks");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "OrderDrinks",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "OrderDrinks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDrinks_AspNetUsers_UserId",
                table: "OrderDrinks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDrinks_AspNetUsers_UserId",
                table: "OrderDrinks");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "OrderDrinks");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "OrderDrinks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDrinks_Userrs_UserId",
                table: "OrderDrinks",
                column: "UserId",
                principalTable: "Userrs",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
