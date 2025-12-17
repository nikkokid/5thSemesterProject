namespace _5thSemesterProject.backend.dal;

public interface IHarvestDAO
{
    IEnumerable<Harvest> GetHarvests();
}