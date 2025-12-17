
namespace _5thSemesterProject.backend.dal;

public class HarvestDAOStub : IHarvestDAO
{
       public IEnumerable<Harvest> GetHarvests()
    {
        List<Harvest> Harvests = new List<Harvest> 
        {
            new Harvest
            {
                HarvestID = 1,
                Weight = 110,
                Date = new DateOnly(2025, 6, 7)
            },

            new Harvest
            {
                HarvestID = 2,
                Weight = 120,
                Date = new DateOnly(2025, 6, 7)
            },
            
            new Harvest
            {
                HarvestID = 3,
                Weight = 130,
                Date = new DateOnly(2025, 6, 7)
            },
        };
        return Harvests;
    }
}