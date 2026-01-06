using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;
public interface IHarvestDAO
{
    IEnumerable<Harvest> GetHarvests();
    IEnumerable<HarvestView> GetHarvestsByGrapeId(int grapeId);
    IEnumerable<HarvestView> GetHarvestsByGrapeIdAndYear(int grapeId, int year);
    int DeleteHarvestByHarvestId(int harvestId);
    int UpdateHarvestByHarvestId(int harvestId, HarvestDTO harvest);
    int CreateHarvest(HarvestDTO harvest);
}