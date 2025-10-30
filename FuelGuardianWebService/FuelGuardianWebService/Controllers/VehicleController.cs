using FuelGuardianWebService.App;
using FuelGuardianWebService.App.DTOs.VehicleAgg;
using FuelGuardianWebService.App.Entities;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FuelGuardianWebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly FuelGuardianDBContext dbContext;
        private readonly ILogger<VehicleController> logger;
        public VehicleController(FuelGuardianDBContext context, ILogger<VehicleController> logger)
        {
            dbContext = context;
            this.logger = logger;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var vehicles = dbContext.Vehicles.ToList() ;

            return Ok(vehicles); 
        }

        [HttpGet,Route("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var vehicle = dbContext.Vehicles.SingleOrDefault(x => x.Id == id);

            if (vehicle == null)
                return NoContent();
            return Ok(vehicle);
        }

        [HttpPost]
        public IActionResult Post([FromBody] AddVehicleDTO addVehicle)
        {
            Vehicle vehicle = addVehicle.Adapt<Vehicle>();
            dbContext.Vehicles.Add(vehicle);
            dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = vehicle.Id }, vehicle);
        }

        [HttpPut, Route("{id}")]
        public IActionResult Put([FromRoute] int id, [FromBody] UpdateVehicleDTO updateVehicleDTO)
        {

            var _vehicle = updateVehicleDTO.Adapt<Vehicle>();
            _vehicle.Id = id;

            dbContext.Vehicles.Update(_vehicle);
            dbContext.SaveChanges();

            return Ok(_vehicle);
        }
    }
}
