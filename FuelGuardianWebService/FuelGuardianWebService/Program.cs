using System.Text.Json.Serialization;
using FuelGuardianWebService.App;
using FuelGuardianWebService.Endpoints;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler= ReferenceHandler.IgnoreCycles)
    ;
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<FuelGuardianDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FuelGuardianConn"), x=>x.MigrationsAssembly("FuelGuardianWebService.App")));

//add cahing
builder.Services.AddResponseCaching();

var app = builder.Build();

app.UseResponseCaching();

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
app.MapFuelSessionEndpoints();

app.Run();
