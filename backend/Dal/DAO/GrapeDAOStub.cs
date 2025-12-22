namespace Dal.DAO;
using Dal.Model;

public class GrapeDAOStub : IGrapeDAO
{
    private static readonly List<Grape> _grapes =
    [
        // New Product explicit in the List above which only takes Products.
        new() { Id = 1, Name = "Pinot Noir" },
        new() { Id = 2, Name = "Riesling" },
        new() { Id = 3, Name = "Chardonnay" },
        new() { Id = 4, Name = "Merlot" },
        new() { Id = 5, Name = "Sauvignon Blanc" },
        new() { Id = 6, Name = "Syrah" }
    ];
    public IEnumerable<Grape> GetAllGrapes()
    {
        return _grapes;
    }

    public Grape? GetGrapeById(int id)
    {
        return _grapes.FirstOrDefault(g => g.Id == id);
    }
}