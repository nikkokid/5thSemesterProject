using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;
namespace _5thSemesterProject.Backend.DAL.DAO;

public class HarvestDAOStub : IHarvestDAO
{
       public IEnumerable<Harvest> GetHarvests()
    {

        List<Harvest> Harvests = new List<Harvest> 
        {
            new Harvest
            {
                HarvestID = 1,
                HarvestWeight = 110,
                //Date = "Date1"
                HarvestDate = new DateOnly(2025, 6, 7)
            },

            new Harvest
            {
                HarvestID = 2,
                HarvestWeight = 120,
                //Date = "Date2"
                HarvestDate = new DateOnly(2025, 6, 7)
            },
            
            new Harvest
            {
                HarvestID = 3,
                HarvestWeight = 130,
                //Date = "Date3"
                HarvestDate = new DateOnly(2025, 6, 7)
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