using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuelGuardianWebService.App.DTOs.FuelSessionAgg
{
    public class AddFuelSessionDTO
    {
        public int VehicleId { get; set; }
        public string DateFueled { get; set; }
        public decimal Rate { get; set; }
        public decimal Quantity { get; set; }
        public decimal Amount { get {
                return Rate * Quantity;
            } 
        }
        public decimal Odometer { get; set; }
    }
}
