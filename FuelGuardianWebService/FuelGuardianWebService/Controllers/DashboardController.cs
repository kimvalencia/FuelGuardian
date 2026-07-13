using FuelGuardianWebService.App;
using FuelGuardianWebService.App.DTOs.DashboardAgg;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FuelGuardianWebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly FuelGuardianDBContext dbContext;

        public DashboardController(FuelGuardianDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var rateTrend = await dbContext.FuelSessions
                .AsNoTracking()
                .Where(session => session.DateFueled >= DateTime.UtcNow.AddMonths(-6).Date)
                .OrderBy(session => session.DateFueled)
                .GroupBy(session => new { session.DateFueled.Year, session.DateFueled.Month })
                .Select(group => new DashboardChartPointDto
                {
                    Label = new DateTime(group.Key.Year, group.Key.Month, 1).ToString("MMM yyyy"),
                    Value = group.Average(session => session.Rate)
                })
                .ToListAsync();

            var monthlyBilling = await dbContext.BillingHeaders
                .AsNoTracking()
                .Where(header => header.EndDate >= DateTime.UtcNow.AddMonths(-6).Date)
                .OrderBy(header => header.EndDate)
                .GroupBy(header => new { header.EndDate.Year, header.EndDate.Month })
                .Select(group => new DashboardChartPointDto
                {
                    Label = new DateTime(group.Key.Year, group.Key.Month, 1).ToString("MMM yyyy"),
                    Value = group.Sum(header => header.Total)
                })
                .ToListAsync();

            return Ok(new DashboardSummaryDto
            {
                RateTrend = rateTrend,
                MonthlyBilling = monthlyBilling
            });
        }
    }
}
