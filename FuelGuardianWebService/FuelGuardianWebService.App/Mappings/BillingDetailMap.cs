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
    public class BillingDetailMap : IEntityTypeConfiguration<BillingDetail>
    {
        public void Configure(EntityTypeBuilder<BillingDetail> builder)
        {
            builder.HasOne(t => t.FuelUsage)
                .WithMany()
                .HasForeignKey(t => t.FuelUsageId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(t => t.FuelSession)
                .WithMany()
                .HasForeignKey(t => t.FuelSessionId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
