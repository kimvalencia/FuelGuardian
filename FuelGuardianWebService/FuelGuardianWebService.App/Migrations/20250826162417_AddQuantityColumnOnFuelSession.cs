using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FuelGuardianWebService.App.Migrations
{
    /// <inheritdoc />
    public partial class AddQuantityColumnOnFuelSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Quantity",
                table: "FuelSessions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "FuelSessions");
        }
    }
}
