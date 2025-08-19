using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace FuelGuardianWebService.App
{
    public class FuelGuardianDbContextFactory : IDesignTimeDbContextFactory<FuelGuardianDBContext>
    {
        public FuelGuardianDBContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

            var connectionString = configuration.GetConnectionString("FuelGuardianConn");

            var optionsBuilder = new DbContextOptionsBuilder<FuelGuardianDBContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new FuelGuardianDBContext(optionsBuilder.Options);
        }
    }
}
