using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FuelGuardianWebService.App.Entities;
using FuelGuardianWebService.App.Mappings;
using Microsoft.EntityFrameworkCore;

namespace FuelGuardianWebService.App
{
    public class FuelGuardianDBContext : DbContext
    {
        public FuelGuardianDBContext(DbContextOptions<FuelGuardianDBContext> options)
            : base(options)
        {
            
        }

        public DbSet<FuelSession> FuelSessions { get; set; }
        public DbSet<FuelUsage> FuelUsages { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<BillingHeader> BillingHeaders { get; set; }
        public DbSet<BillingDetail> BillingDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new FuelUsageMap());
            modelBuilder.ApplyConfiguration(new FuelSessionMap());
            modelBuilder.ApplyConfiguration(new BillingHeaderMap());
            modelBuilder.ApplyConfiguration(new BillingDetailMap());
        }

    }
}
