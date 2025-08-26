using FuelGuardianWebService.App;
using FuelGuardianWebService.App.DTOs.FuelSessionAgg;
using FuelGuardianWebService.App.Entities;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FuelGuardianWebService.Endpoints
{
    public static class FuelSessionEndpoints
    {

        public static void MapFuelSessionEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("api/FuelSessions");
            group.MapGet("", GetAll);
            group.MapGet("{Id:int}", GetById);
            group.MapPost("", AddFuelSession);
        }

        static async Task<IResult> GetAll(FuelGuardianDBContext db)
        {
            var sessions = await db.FuelSessions.ToListAsync();

            return Results.Ok(sessions);
        }

        static async Task<IResult> GetById(FuelGuardianDBContext db, [FromRoute] int Id)
        {
            var session = await db.FuelSessions.FirstOrDefaultAsync(q=>q.Id == Id);

            return Results.Ok(session);
        }

        static async Task<IResult> AddFuelSession(FuelGuardianDBContext db, [FromBody] AddFuelSessionDTO addFuelSession)
        {
            var fuelSession = addFuelSession.Adapt<FuelSession>();
            db.FuelSessions.Add(fuelSession);
            await db.SaveChangesAsync();

            return Results.Created($"api/FuelSessions/{fuelSession.Id}", fuelSession);
        }

    }
}
