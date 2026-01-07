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
                HarvestId = 1,
                HarvestWeight = 110,
                //Date = "Date1"
                //HarvestDate = new DateOnly(2025, 6, 7)
            },

            new Harvest
            {
                HarvestId = 2,
                HarvestWeight = 120,
                //Date = "Date2"
                //HarvestDate = new DateOnly(2025, 6, 7)
            },
            
            new Harvest
            {
                HarvestId = 3,
                HarvestWeight = 130,
                //Date = "Date3"
                //HarvestDate = new DateOnly(2025, 6, 7)
            },
        };
        
        return Harvests;
    }
    
    public IEnumerable<Harvest> GetHarvestsByGrapeId(int grapeId)
    
    {
        List<Harvest> Harvests = new List<Harvest>
        {
            new Harvest
            {
                
            }
        };
        
        return Harvests;
    }

    public IEnumerable<Harvest> GetHarvestsByGrapeIdAndYear(int grapeId, int year)
    
    {
        List<Harvest> Harvests = new List<Harvest>
        {
            new Harvest
            {
                
            }
        };
        
        return Harvests;
    }

    public int DeleteHarvestByHarvestId(int harvestId)
    {
        return 1;
    }

    public int UpdateHarvestByHarvestId(int harvestId, HarvestDTO harvest)
    {
        return 1;
    }

    public int CreateHarvest(HarvestDTO harvest)
    {
        return 1;
    }

    
}