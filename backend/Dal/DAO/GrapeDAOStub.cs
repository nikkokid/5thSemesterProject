using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;
public class GrapeDAOStub : IGrapeDAO
{
    private static readonly List<Grape> _grapes =
    [
        // New Product explicit in the List above which only takes Products.
        new() { GrapeId = 1, GrapeName = "Pinot Noir" },
        new() { GrapeId = 2, GrapeName = "Riesling" },
        new() { GrapeId = 3, GrapeName = "Chardonnay" },
        new() { GrapeId = 4, GrapeName = "Merlot" },
        new() { GrapeId = 5, GrapeName = "Sauvignon Blanc" },
        new() { GrapeId = 6, GrapeName = "Syrah" }
    ];
    public IEnumerable<Grape> GetAllGrapes()
    {
        return _grapes;
    }

    public Grape? GetGrapeById(int id)
    {
        return _grapes.FirstOrDefault(g => g.GrapeId == id);
    }
}