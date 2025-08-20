using FuelGuardianWebService.App;
using FuelGuardianWebService.App.DTOs.FuelUsageAgg;
using FuelGuardianWebService.App.Entities;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FuelGuardianWebService.Endpoints
{
    public static class FuelUsageEndpoints
    {
        public static void MapFuelUsageEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("api/FuelUsages");
            group.MapGet("", GetAllFuelUsages);
            group.MapGet("/{Id:int}", GetFuelUsageById);
            group.MapPost("", AddFuelUsage);
        }

        static async Task<IResult> GetAllFuelUsages(FuelGuardianDBContext dbContext)
        {
            var fuelUsages= await dbContext.FuelUsages.ToListAsync();

            return Results.Ok(fuelUsages);
        }

        static async Task<IResult> GetFuelUsageById(FuelGuardianDBContext dBContext, int Id)
        {
            var fuelUsage = await dBContext.FuelUsages.FirstOrDefaultAsync(q => q.Id == Id);

            if(fuelUsage == null)
            {
                return Results.NoContent();
            }
            return Results.Ok(fuelUsage);
        }

        static async Task<IResult> AddFuelUsage(FuelGuardianDBContext db, AddFuelUsageDTO addFuelUsage)
        {
            var newUsage = addFuelUsage.Adapt<FuelUsage>();
            await db.FuelUsages.AddAsync(newUsage);
            await db.SaveChangesAsync();

            return Results.Ok(newUsage);
        }
    }
}
