using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;
public interface IGrapeDAO
{
    IEnumerable<Grape> GetAllGrapes();
    Grape? GetGrapeById(int GrapeId);
    int DeleteGrapeById(int GrapeId);
    int UpdateGrapeById(GrapeDTO grapeDTO, int GrapeId);
    int CreateGrape(GrapeDTO grapeDTO);
}
