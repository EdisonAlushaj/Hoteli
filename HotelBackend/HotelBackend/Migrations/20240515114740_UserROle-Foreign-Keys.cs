using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class UserROleForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersRoless_Rolis_RolesId",
                table: "UsersRoless");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersRoless_Userrs_UsersId",
                table: "UsersRoless");

            migrationBuilder.DropIndex(
                name: "IX_UsersRoless_RolesId",
                table: "UsersRoless");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "UsersRoless");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UsersRoless");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "UsersRoless",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UsersRoless",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_UsersRoless_RolesId",
                table: "UsersRoless",
                column: "RolesId");

            migrationBuilder.AddForeignKey(
                name: "FK_UsersRoless_Rolis_RolesId",
                table: "UsersRoless",
                column: "RolesId",
                principalTable: "Rolis",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersRoless_Userrs_UsersId",
                table: "UsersRoless",
                column: "UsersId",
                principalTable: "Userrs",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
