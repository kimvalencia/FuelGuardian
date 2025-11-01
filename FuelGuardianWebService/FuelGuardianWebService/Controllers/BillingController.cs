using FuelGuardianWebService.App;
using FuelGuardianWebService.App.BLLs;
using FuelGuardianWebService.App.DTOs.BillingAgg;
using FuelGuardianWebService.App.Entities;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FuelGuardianWebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        FuelGuardianDBContext dbContext;
        public BillingController(FuelGuardianDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [ResponseCache(Duration = 60)]
        public async Task<IActionResult> GetAllBilling()
        {
            var billings = await dbContext.BillingHeaders.ToListAsync();

            return Ok(billings);
        }

        [HttpGet, Route("{Id}")]
        public async Task<IActionResult> GetBillingById([FromRoute] int Id)
        {
            var billing = await dbContext.BillingHeaders.Include(q=>q.Details).FirstOrDefaultAsync(x => x.Id == Id);
            return Ok(billing);
        }

        [HttpPost]
        public async Task<IActionResult> AddNewBilling([FromBody] AddNewBillingHeaderDTO newBilling)
        {
            BillingHeader header = newBilling.Adapt<BillingHeader>();
            dbContext.Add(header);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBillingById),new {header.Id } , header);
        }

        [HttpPost,Route("Compute")]
        public async Task<IActionResult> ComputeBilling([FromBody] int Id)
        {
            //get billing header
            var header = await dbContext.BillingHeaders.FirstOrDefaultAsync(q=>q.Id==Id);

            if(header == null)
            {
                return NotFound($"Billing header with Id {Id} not found.");
            }

            //remove all details
            await dbContext.Database.ExecuteSqlAsync($"DELETE FROM BillingDetails WHERE BillingHeaderId={Id}");

            DateTime StartingDate = header.StartDate;

            //get previous billing and get the last session included
            var lastBilling = await dbContext.BillingHeaders.Where(q => q.EndDate < header.StartDate).OrderByDescending(q=>q.EndDate).FirstOrDefaultAsync();

            if (lastBilling is not null)
            {
                //get the last fuel usage date
                var lastFuelUsage = await dbContext.BillingDetails.Include(q => q.FuelUsage).Where(q => q.BillingHeaderId == lastBilling.Id).OrderByDescending(q=>q.FuelUsage.TripStart).FirstOrDefaultAsync();

                if(lastFuelUsage is not null)
                {
                    StartingDate = lastFuelUsage.FuelUsage.TripStart.AddDays(1);
                }
            }



            // get fuel usages
            var usages = await dbContext.FuelUsages
                .Where(q => q.TripEnd >= StartingDate && q.TripEnd <= header.EndDate)
                .OrderBy(q=>q.TripEnd)
                .ToListAsync();

            if (usages.Any())
            {
                var firstUsage = usages.FirstOrDefault();
                var lastUsage = usages.LastOrDefault();

                //get fuel sessions from the first usage's trip end to
                var sessions = await dbContext.FuelSessions
                    .Where(q => q.DateFueled >= firstUsage.TripEnd && q.DateFueled <= header.EndDate)
                    .OrderBy(q => q.DateFueled)
                    .ToListAsync();

                header = new BillingComputation(dbContext).Compute(header, sessions, usages);
            }

            dbContext.Update(header);
            await dbContext.SaveChangesAsync();
            return Ok(header);
        }
    }
}
