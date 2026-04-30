using FuelGuardianWebService.App;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace FuelGuardianWebService.Endpoints
{
    public static class TestEndpoints
    {
        public static void MapTestEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("api/Test");
            group.MapGet("webconnection", TestWebConnection);
            group.MapGet("database", TestDatabase);
            group.MapGet("update-database", UpdateDatabase);
        }

        private static IResult TestWebConnection(HttpContext context)
        {
            return Results.Ok("Web Connection is working");
        }

        private static async Task<IResult> TestDatabase(FuelGuardianDBContext db)
        {
            try
            {
                var result = await db.FuelUsages.FirstOrDefaultAsync();

                return Results.Ok("Database is working");
            }
            catch (Exception ex)
            {
                return Results.InternalServerError(ex);
            }
        }

        private static async Task<IResult> UpdateDatabase(FuelGuardianDBContext db)
        {
            try
            {
                await Task.Run(db.Database.Migrate);
                return Results.Ok("DB migration successful");
            }
            catch (Exception ex)
            {
                return Results.InternalServerError(ex);
            }
        }
    }
}
