namespace _5thSemesterProject.backend.dal;

public interface IHarvestDAO
{
    IEnumerable<Harvest> GetHarvests();
    IEnumerable<HarvestView> GetHarvestsByGrapeId(int grapeId);
    IEnumerable<HarvestView> GetHarvestsByGrapeIdAndYear(int grapeId, int year);
    int DeleteHarvestByHarvestId(int harvestId);
}