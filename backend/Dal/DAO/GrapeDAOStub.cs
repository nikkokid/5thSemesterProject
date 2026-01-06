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
    public int DeleteGrapeById(int GrapeId)
    {
        var grape = _grapes.FirstOrDefault(g => g.GrapeId == GrapeId);
        if (grape != null)
        {
            _grapes.Remove(grape);
            return 1; // Indicate success
        }
        return 0; // Indicate failure
    }
    public int UpdateGrapeById(GrapeDTO grapeDTO, int GrapeId)
    {
        var grape = _grapes.FirstOrDefault(g => g.GrapeId == GrapeId);
        if (grape != null)
        {
            grape.GrapeName = grapeDTO.GrapeName;
            return 1; // Indicate success
        }
        return 0; // Indicate failure
    }
    public int CreateGrape(GrapeDTO grapeDTO)
    {
        var newGrapeId = _grapes.Max(g => g.GrapeId) + 1;
        var newGrape = new Grape
        {
            GrapeId = newGrapeId,
            GrapeName = grapeDTO.GrapeName
        };
        _grapes.Add(newGrape);
        return 1; // Indicate success
    }
    
}