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
    public class BillingHeaderMap : IEntityTypeConfiguration<BillingHeader>
    {
        public void Configure(EntityTypeBuilder<BillingHeader> builder)
        {
            builder.HasMany(t => t.Details)
                .WithOne(t => t.BillingHeader)
                .HasForeignKey(t => t.BillingHeaderId);
        }
    }
}
