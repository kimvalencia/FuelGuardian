using FuelGuardianWebService.App.BLLs;
using FuelGuardianWebService.App.Entities;

namespace FuelGuardianWebService.Tests
{
    [TestClass]
    public sealed class BillingComputationTest
    {
        [TestMethod]
        public void ComputeBilling()
        {
            //Arrange
            BillingHeader header = new BillingHeader()
            {
                Id = 1,
                StartDate = DateTime.Now.AddDays(-30),
                EndDate = DateTime.Now,
                Total = 0,
                Details = new List<BillingDetail>()
            };

            List<FuelSession> fuelSessions = new List<FuelSession>()
            {
                new FuelSession()
                {
                    Id=1,
                    DateFueled= new DateTime(2025,8,5),
                    Odometer=1000,
                    Quantity=50,
                    Rate=54.50M,
                    Amount=125
                },
                new FuelSession()
                {
                    Id=2,
                    DateFueled=new DateTime(2025,8,15),
                    Odometer=1500,
                    Quantity=40,
                    Rate=56M,
                    Amount=108
                }
            };

            List<FuelUsage> fuelUsages = new List<FuelUsage>()
            {
                new FuelUsage()
                {
                    Id=1,
                    TripStart=new DateTime(2025,8,1),
                    TripEnd=new DateTime(2025,8,1),
                    StartingOdometer=800,
                    EndingOdometer=950,
                    DistanceTraveled=150,
                    FuelConsumptionRate=10M
                }, // 817.50
                new FuelUsage()
                {
                    Id=2,
                    TripStart=new DateTime(2025,8,2),
                    TripEnd=new DateTime(2025,8,2),
                    StartingOdometer=950,
                    EndingOdometer=1200,
                    DistanceTraveled=80,
                    FuelConsumptionRate=12M
                }, // 363.33
                new FuelUsage()
                {
                    Id=3,
                    TripStart=new DateTime(2025,8,10),
                    TripEnd=new DateTime(2025,8,10),
                    StartingOdometer=1200,
                    EndingOdometer=1450,
                    DistanceTraveled=100,
                    FuelConsumptionRate=9.8M
                }, // 571.43
                new FuelUsage()
                {
                    Id=4,
                    TripStart=new DateTime(2025,8,12),
                    TripEnd=new DateTime(2025,8,12),
                    StartingOdometer=1450,
                    EndingOdometer=1700,
                    DistanceTraveled=90,
                    FuelConsumptionRate = 12.3M
                } // 409.76
            };

            //Act
            var _header = new BillingComputation(null).Compute(header, fuelSessions, fuelUsages);

            //Assert
            Assert.AreEqual(4, _header.Details.Count);
            Assert.AreEqual(2162.02M, _header.Total);

        }
        }
    }
