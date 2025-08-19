using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FuelGuardianWebService.App.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FuelGuardianWebService.App.Mappings
{
    public class FuelUsageMap : IEntityTypeConfiguration<FuelUsage>
    {
        public void Configure(EntityTypeBuilder<FuelUsage> builder)
        {
            builder.HasOne(t => t.Vehicle)
                .WithMany()
                .HasForeignKey(t => t.VehicleId);
        }
    }
}
