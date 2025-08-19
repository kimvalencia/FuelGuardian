using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FuelGuardianWebService.App.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BillingHeaders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingHeaders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VehicleType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlateNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FuelSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VehicleId = table.Column<int>(type: "int", nullable: false),
                    DateFueled = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Odometer = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FuelSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FuelSessions_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FuelUsages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TripEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartingOdometer = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EndingOdometer = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DistanceTraveled = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FuelConsumptionRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    VehicleId = table.Column<int>(type: "int", nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FuelUsages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FuelUsages_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BillingDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillingHeaderId = table.Column<int>(type: "int", nullable: false),
                    FuelUsageId = table.Column<int>(type: "int", nullable: false),
                    FuelSessionId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillingDetails_BillingHeaders_BillingHeaderId",
                        column: x => x.BillingHeaderId,
                        principalTable: "BillingHeaders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillingDetails_FuelSessions_FuelSessionId",
                        column: x => x.FuelSessionId,
                        principalTable: "FuelSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BillingDetails_FuelUsages_FuelUsageId",
                        column: x => x.FuelUsageId,
                        principalTable: "FuelUsages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillingDetails_BillingHeaderId",
                table: "BillingDetails",
                column: "BillingHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingDetails_FuelSessionId",
                table: "BillingDetails",
                column: "FuelSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingDetails_FuelUsageId",
                table: "BillingDetails",
                column: "FuelUsageId");

            migrationBuilder.CreateIndex(
                name: "IX_FuelSessions_VehicleId",
                table: "FuelSessions",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_FuelUsages_VehicleId",
                table: "FuelUsages",
                column: "VehicleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillingDetails");

            migrationBuilder.DropTable(
                name: "BillingHeaders");

            migrationBuilder.DropTable(
                name: "FuelSessions");

            migrationBuilder.DropTable(
                name: "FuelUsages");

            migrationBuilder.DropTable(
                name: "Vehicles");
        }
    }
}
