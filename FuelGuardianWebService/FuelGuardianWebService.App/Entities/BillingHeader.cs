using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuelGuardianWebService.App.Entities
{
    public class BillingHeader
    {
        public BillingHeader()
        {
            Remarks= string.Empty;
        }
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Total { get; set; }
        public required List<BillingDetail> Details { get; set; } =new List<BillingDetail>();
        public bool IsPaid { get; set; }
        public string Remarks { get; set; } = default!;
    }
}
