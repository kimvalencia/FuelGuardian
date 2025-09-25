using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FuelGuardianWebService.App.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "FuelQuantityUsed",
                table: "FuelUsages",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "BillingHeaders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "BillingHeaders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FuelQuantityUsed",
                table: "FuelUsages");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "BillingHeaders");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "BillingHeaders");
        }
    }
}
