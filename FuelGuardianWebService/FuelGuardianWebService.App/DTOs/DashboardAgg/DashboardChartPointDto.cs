namespace FuelGuardianWebService.App.DTOs.DashboardAgg
{
    public class DashboardChartPointDto
    {
        public string Label { get; set; } = string.Empty;
        public decimal Value { get; set; }
    }

    public class DashboardSummaryDto
    {
        public List<DashboardChartPointDto> RateTrend { get; set; } = new();
        public List<DashboardChartPointDto> MonthlyBilling { get; set; } = new();
    }
}
