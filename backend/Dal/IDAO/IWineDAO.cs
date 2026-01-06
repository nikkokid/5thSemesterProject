using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;

public interface IWineDAO
{
    IEnumerable<Wine> GetAllWines();
    IEnumerable<WineView> GetWineById(int WineId);
    int CreateWine(WineDTO wineDTO);
    int UpdateWineById(int WineId, WineDTO wineDTO);
    int DeleteWineById(int WineId);
}