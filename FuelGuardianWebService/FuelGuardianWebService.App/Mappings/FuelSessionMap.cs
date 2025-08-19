using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FuelGuardianWebService.App.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FuelGuardianWebService.App.Mappings
{
    public class FuelSessionMap : IEntityTypeConfiguration<FuelSession>
    {
        public void Configure(EntityTypeBuilder<FuelSession> builder)
        {
            builder.HasOne(t => t.Vehicle)
                .WithMany()
                .HasForeignKey(t => t.VehicleId);
        }
    }
}
