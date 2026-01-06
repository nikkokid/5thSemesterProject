using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;

public interface IPlantingDAO
{
    IEnumerable<Planting> GetPlantings();
    IEnumerable<Planting> GetPlantingsByGrapeRowId(int grapeRowId);
    IEnumerable<Planting> GetPlantingByPlantingId(int plantingId);
    int CreatePlanting(PlantingDTO planting);
    int UpdatePlanting(PlantingDTO planting, int plantingId);
    int DeletePlanting(int plantingId);
}