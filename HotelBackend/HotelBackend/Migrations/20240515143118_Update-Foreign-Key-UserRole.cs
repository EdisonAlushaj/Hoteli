using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateForeignKeyUserRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersRoless",
                table: "UsersRoless");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "UsersRoless");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UsersRoless");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersRoless",
                table: "UsersRoless",
                column: "UsersRolesId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersRoless_UsersId",
                table: "UsersRoless",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersRoless",
                table: "UsersRoless");

            migrationBuilder.DropIndex(
                name: "IX_UsersRoless_UsersId",
                table: "UsersRoless");

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersRoless",
                table: "UsersRoless",
                columns: new[] { "UsersId", "RolesId" });
        }
    }
}
