using FuelGuardianWebService.App;
using FuelGuardianWebService.App.DTOs.FuelUsageAgg;
using FuelGuardianWebService.App.Entities;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.WebRequestMethods;

namespace FuelGuardianWebService.Endpoints
{
    public static class FuelUsageEndpoints
    {
        public static void MapFuelUsageEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("api/FuelUsages");
            group.MapGet("", GetAllFuelUsages)
                .WithMetadata(new ResponseCacheAttribute
                {
                    Duration = 60,
                    Location= ResponseCacheLocation.Any
                });
            group.MapGet("/{Id:int}", GetFuelUsageById);
            group.MapPost("", AddFuelUsage);
            group.MapPut("/{id:int}", UpdateFuelUsage);
            group.MapDelete("/{id:int}", DeleteFuelUsage);
        }

        static async Task<IResult> GetAllFuelUsages(FuelGuardianDBContext dbContext, HttpContext http)
        {
            var fuelUsages= await dbContext
                .FuelUsages
                .Include(q=>q.Vehicle)
                .Select(t=>t.ToDTO())
                .ToListAsync();

            //http.Response.GetTypedHeaders().CacheControl = new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
            //{
            //    Public = true,
            //    MaxAge = TimeSpan.FromSeconds(10)
            //};

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
            newUsage.ParseTripDate(addFuelUsage.TripDate);
            newUsage.CalculateFuelQuantityUsed();

            await db.FuelUsages.AddAsync(newUsage);
            await db.SaveChangesAsync();

            return Results.Ok(newUsage);
        }

        static async Task<IResult> UpdateFuelUsage(FuelGuardianDBContext db, [FromRoute]int id, [FromBody]UpdateFuelUsageDTO updateFuelUsageDTO)
        {
            var fuelUsage = await db.FuelUsages.FindAsync(id);

            if (fuelUsage != null)
            {
                fuelUsage = updateFuelUsageDTO.Adapt<FuelUsage>();
                fuelUsage.ParseTripDate(updateFuelUsageDTO.TripDate);
                fuelUsage.CalculateFuelQuantityUsed();

                await db.SaveChangesAsync();
                return Results.Ok(fuelUsage);
            }

            return Results.NotFound("Fuel Usage not found");
        }

        static async Task<IResult> DeleteFuelUsage(FuelGuardianDBContext db,[FromRoute] int id)
        {
            var fuelUsage = await db.FuelUsages.FindAsync(id);
            if (fuelUsage != null)
            {
                db.FuelUsages.Remove(fuelUsage);
                await db.SaveChangesAsync();
                return Results.Ok(fuelUsage);
            }
            return Results.NotFound("Fuel Usage not found");
        }
    }
}
