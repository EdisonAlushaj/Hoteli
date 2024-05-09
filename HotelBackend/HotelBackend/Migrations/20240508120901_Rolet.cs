using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Rolet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rolis",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleContractType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RoleDepartment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleUniformRequirements = table.Column<bool>(type: "bit", nullable: false),
                    RoleLanguageSkills = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RoleEndDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rolis", x => x.RoleId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rolis");
        }
    }
}
