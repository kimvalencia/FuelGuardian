using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FuelGuardianWebService.App.Entities;

namespace FuelGuardianWebService.App.DTOs.FuelUsageAgg
{
    public class AddFuelUsageDTO
    {
        public string TripStart { get; set; }
        public string TripEnd { get; set; }
        public decimal DistanceTraveled { get; set; }
        public decimal FuelConsumptionRate { get; set; }
        public int VehicleId { get; set; }
    }
}
