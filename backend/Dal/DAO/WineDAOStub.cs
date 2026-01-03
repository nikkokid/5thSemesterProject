using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;

public class WineDAOStub : IWineDAO
{
    private static List<Wine> _wines = new()
    {
        new Wine { WineId = 1, WineName = "Chateau Margaux", VintageYear = 2015 },
        new Wine { WineId = 2, WineName = "Screaming Eagle", VintageYear = 2012 }
    };

    public IEnumerable<Wine> GetAllWines()
    {
        return _wines;
    }

    public IEnumerable<WineView> GetWineById(int WineId)
    {
        throw new NotImplementedException();
    }
    public int CreateWine(WineDTO wineDTO)
    {
        var newWineId = _wines.Max(w => w.WineId) + 1;
        var newWine = new Wine
        {
            WineId = newWineId,
            WineName = wineDTO.WineName,
            VintageYear = wineDTO.VintageYear
        };
        _wines.Add(newWine);
        return newWineId;
    }
    public bool UpdateWineById(int id, WineDTO wineDTO)
    {
        var wine = _wines.FirstOrDefault(w => w.WineId == id);
        if (wine == null) return false;

        wine.WineName = wineDTO.WineName;
        wine.VintageYear = wineDTO.VintageYear;
        return true;
    }
    public bool DeleteWineById(int id)
    {
        var wine = _wines.FirstOrDefault(w => w.WineId == id);
        if (wine == null) return false;

        _wines.Remove(wine);
        return true;
    }



}