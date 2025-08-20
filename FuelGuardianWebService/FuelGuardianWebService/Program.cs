using FuelGuardianWebService.App;
using FuelGuardianWebService.Endpoints;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<FuelGuardianDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FuelGuardianConn"), x=>x.MigrationsAssembly("FuelGuardianWebService.App")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFuelUsageEndpoints();

app.Run();
