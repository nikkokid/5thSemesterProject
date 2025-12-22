namespace Dal.DAO;
using Dal.Model;

public interface IGrapeDAO
{
    IEnumerable<Grape> GetAllGrapes();
    Grape? GetGrapeById(int id);
}
