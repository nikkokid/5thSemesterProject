using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.DAL.IDAO;

public interface ITasteProfileDAO
{
    public IEnumerable<TasteProfile> GetTasteProfilesByJuiceId(int id);

    public bool CreateTasteProfileForJuice(CreateTasteProfileDTO tasteProfile, int id);

    public bool UpdateTasteProfileById(int id, CreateTasteProfileDTO tasteProfileToUpdate);

    public bool DeleteTasteProfileById(int id);

}