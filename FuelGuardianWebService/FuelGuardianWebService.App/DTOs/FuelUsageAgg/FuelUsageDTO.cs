using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuelGuardianWebService.App.DTOs.FuelUsageAgg
{
    public class FuelUsageDTO
    {
        public int Id { get; set; }
        public DateTime TripDate { get; set; }
        public decimal DistanceTraveled { get; set; }
        public decimal FuelConsumptionRate { get; set; }
        public decimal FuelQuantityUsed { get; set; }
        public int VehicleId { get; set; }
        public string VehicleName { get; set; }
        public bool IsPaid { get; set; }
    }
}
