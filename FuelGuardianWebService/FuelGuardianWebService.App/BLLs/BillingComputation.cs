using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FuelGuardianWebService.App.Entities;
using Microsoft.EntityFrameworkCore;

namespace FuelGuardianWebService.App.BLLs
{
    public class BillingComputation
    {
        private readonly FuelGuardianDBContext _db;

        public BillingComputation(FuelGuardianDBContext dBContext)
        {
            _db = dBContext;
        }

        public BillingHeader Compute(BillingHeader header, List<FuelSession> FuelSessions, List<FuelUsage> FuelUsages)
        {
            var usages = FuelUsages;
            DateTime lastComputedDate = usages is not null ? usages.OrderBy(q=>q.TripStart).FirstOrDefault().TripStart : header.StartDate;

            foreach (var session in FuelSessions.OrderBy(q=>q.DateFueled).ToList()) 
            {
                //get fuel usages before datefueled
                var _usages = usages.Where(q => q.TripEnd>= lastComputedDate && q.TripEnd < session.DateFueled).ToList();
                foreach (var usage in _usages) 
                {
                    var detail = new BillingDetail();
                    detail.BillingHeaderId= header.Id;
                    detail.FuelUsageId= usage.Id;
                    detail.FuelSessionId= session.Id;
                    detail.Amount = Decimal.Round(usage.DistanceTraveled / usage.FuelConsumptionRate * session.Rate,2, MidpointRounding.AwayFromZero);
                    header.Details.Add(detail);
                }

                lastComputedDate = session.DateFueled;

                //if (_usages.Any())
                //{
                //    //remove computed usages
                //    usages.RemoveAll(_usages.Contains);
                //}
            }

            header.Total = header.Details.Sum(q => q.Amount);

            return header;
        }

    }
}
