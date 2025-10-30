using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuelGuardianWebService.App.DTOs.VehicleAgg
{
    public class UpdateVehicleDTO
    {
        public string VehicleType { get; set; } = string.Empty;
        public string PlateNumber { get; set; } = string.Empty;
    }
}
