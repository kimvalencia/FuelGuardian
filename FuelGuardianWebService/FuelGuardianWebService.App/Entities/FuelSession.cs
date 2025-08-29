using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuelGuardianWebService.App.Entities
{
    public class FuelSession
    {
        [Key]
        public int Id { get; set; }
        public Vehicle? Vehicle { get; set; }
        public int VehicleId { get; set; }
        public DateTime DateFueled { get; set; }
        public decimal Rate { get; set; }
        public decimal Quantity { get; set; }
        public decimal Amount { get; set; }
        public decimal Odometer { get; set; }

    }
}
