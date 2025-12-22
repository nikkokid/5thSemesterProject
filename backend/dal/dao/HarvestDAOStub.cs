
using System.Collections;

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
                //Date = "Date1"
                Date = new DateOnly(2025, 6, 7)
            },

            new Harvest
            {
                HarvestID = 2,
                Weight = 120,
                //Date = "Date2"
                Date = new DateOnly(2025, 6, 7)
            },
            
            new Harvest
            {
                HarvestID = 3,
                Weight = 130,
                //Date = "Date3"
                Date = new DateOnly(2025, 6, 7)
            },
        };
        
        return Harvests;
    }
    
    public IEnumerable<HarvestView> GetHarvestsByGrapeId(int grapeId)
    
    {
        List<HarvestView> HarvestViews = new List<HarvestView>
        {
            new HarvestView
            {
                
            }
        };
        
        return HarvestViews;
    }

    public IEnumerable<HarvestView> GetHarvestsByGrapeIdAndYear(int grapeId, int year)
    
    {
        List<HarvestView> HarvestViews = new List<HarvestView>
        {
            new HarvestView
            {
                
            }
        };
        
        return HarvestViews;
    }

    public int DeleteHarvestByHarvestId(int harvestId)
    {
        return 1;
    }

    
}