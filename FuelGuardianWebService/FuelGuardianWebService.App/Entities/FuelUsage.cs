using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public Vehicle Vehicle { get; set; }
        public int VehicleId { get; set; }
        public bool IsPaid { get; set; }
    }
}
