namespace Dal.DAO;
using Dal.Model;

public class GrapeDAO : IGrapeDAO
{
    public IEnumerable<Grape> GetAllGrapes()
    {
        return new List<Grape>
        {
            new Grape { Id = 1, Name = "Pinot Noir" },
            new Grape { Id = 2, Name = "Riesling" },
            new Grape { Id = 3, Name = "Chardonnay" }
        };
    }
    public Grape? GetGrapeById(int id)
    {
        return GetAllGrapes().FirstOrDefault(g => g.Id == id);
    }
}