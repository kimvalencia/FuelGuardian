using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FuelGuardianWebService.App.DTOs.FuelUsageAgg;

namespace FuelGuardianWebService.App.Entities
{
    public class FuelUsage
    {
        [Key]
        public int Id { get; set; }
        public DateTime TripStart { get; set; }
        public DateTime TripEnd { get; set; }
        public decimal StartingOdometer { get; set; }
        public decimal EndingOdometer { get; set; }
        public decimal DistanceTraveled { get; set; }
        public decimal FuelConsumptionRate { get; set; }
        public decimal FuelQuantityUsed { get; set; }
        public Vehicle Vehicle { get; set; }
        public int VehicleId { get; set; }
        public bool IsPaid { get; set; }

        public void ParseTripDate(string tripDate)
        {
            if(DateTime.TryParse(tripDate, out DateTime parsedDate))
            {
                TripStart = parsedDate;
                TripEnd = parsedDate;
            }
            else
            {
                throw new FormatException("Invalid date format.");
            }
        }
        public void CalculateFuelQuantityUsed()
        {
            if (FuelConsumptionRate <= 0)
            {
                throw new InvalidOperationException("Fuel consumption rate must be greater than zero.");
            }
            FuelQuantityUsed = decimal.Round(DistanceTraveled / FuelConsumptionRate,3, MidpointRounding.AwayFromZero);
        }

        public FuelUsageDTO ToDTO()
        {
            FuelUsageDTO dto = new FuelUsageDTO
            {
                Id = Id,
                TripDate = TripStart,
                DistanceTraveled = DistanceTraveled,
                FuelConsumptionRate = FuelConsumptionRate,
                FuelQuantityUsed = FuelQuantityUsed,
                VehicleId = VehicleId,
                VehicleName = Vehicle != null ? $"{Vehicle.VehicleType} ({Vehicle.PlateNumber})"  : "Unknown",
                IsPaid = IsPaid
            };
            return dto;
        }

    }
}
