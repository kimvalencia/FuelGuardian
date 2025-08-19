using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuelGuardianWebService.App.Entities
{
    public class BillingDetail
    {
        [Key]
        public int Id { get; set; }
        public required BillingHeader BillingHeader { get; set; }
        public int BillingHeaderId { get; set; }
        public required FuelUsage FuelUsage { get; set; }
        public int FuelUsageId { get; set; }
        public required FuelSession FuelSession { get; set; }
        public int FuelSessionId { get; set; }
        public decimal Amount { get; set; }
    }
}
