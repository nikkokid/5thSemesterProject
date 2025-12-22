using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;

public class GrapeDAO : IGrapeDAO
{
    public IEnumerable<Grape> GetAllGrapes()
    {
        return new List<Grape>
        {
            new Grape { GrapeId = 1, GrapeName = "Pinot Noir" },
            new Grape { GrapeId = 2, GrapeName = "Riesling" },
            new Grape { GrapeId = 3, GrapeName = "Chardonnay" }
        };
    }
    public Grape? GetGrapeById(int id)
    {
        return GetAllGrapes().FirstOrDefault(g => g.GrapeId == id);
    }
}