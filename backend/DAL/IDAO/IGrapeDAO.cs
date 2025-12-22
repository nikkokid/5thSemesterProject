using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;
public interface IGrapeDAO
{
    IEnumerable<Grape> GetAllGrapes();
    Grape? GetGrapeById(int id);
}
