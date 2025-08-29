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

            return CreatedAtAction(nameof(AddNewBilling), header);
        }

        [HttpPost,Route("Compute/{Id}")]
        public async Task<IActionResult> ComputeBilling([FromRoute] int Id)
        {
            //get billing header
            var header = await dbContext.BillingHeaders.FirstOrDefaultAsync(q=>q.Id==Id);

            if(header == null)
            {
                return NotFound($"Billing header with Id {Id} not found.");
            }

            //remove all details
            await dbContext.Database.ExecuteSqlAsync($"DELETE FROM BillingDetails WHERE BillingHeaderId={Id}");

            //get fuel sessions
            var sessions = await dbContext.FuelSessions
                .Where(q => q.DateFueled >= header.StartDate && q.DateFueled <= header.EndDate)
                .OrderBy(q=>q.DateFueled)
                .ToListAsync();

            // get fuel usages
            var usages = await dbContext.FuelUsages
                .Where(q => q.TripEnd >= header.StartDate && q.TripEnd <= header.EndDate)
                .OrderBy(q=>q.TripEnd)
                .ToListAsync();

            header = new BillingComputation(dbContext).Compute(header, sessions, usages);

            dbContext.Update(header);
            await dbContext.SaveChangesAsync();
            return Ok(header);
        }
    }
}
