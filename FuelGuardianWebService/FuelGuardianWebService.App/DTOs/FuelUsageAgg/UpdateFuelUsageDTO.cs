using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuelGuardianWebService.App.DTOs.FuelUsageAgg
{
    public class UpdateFuelUsageDTO
    {
        public int Id { get; set; }
        public string TripDate { get; set; }
        public decimal DistanceTraveled { get; set; }
        public decimal FuelConsumptionRate { get; set; }
        public int VehicleId { get; set; }
        public bool IsPaid { get; set; }
    }
}
