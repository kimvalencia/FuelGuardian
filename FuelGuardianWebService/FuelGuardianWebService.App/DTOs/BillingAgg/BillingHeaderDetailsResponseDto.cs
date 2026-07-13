using System;
using System.Collections.Generic;

namespace FuelGuardianWebService.App.DTOs.BillingAgg
{
    public class BillingHeaderDetailReadDto
    {
        public int Id { get; set; }
        public int FuelUsageId { get; set; }
        public int FuelSessionId { get; set; }
        public decimal Amount { get; set; }
        public DateTime? TripDate { get; set; }
        public DateTime? DateFueled { get; set; }
    }

    public class BillingHeaderDetailsResponseDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Total { get; set; }
        public bool IsPaid { get; set; }
        public string Remarks { get; set; } = string.Empty;
        public List<BillingHeaderDetailReadDto> Details { get; set; } = new();
    }
}
