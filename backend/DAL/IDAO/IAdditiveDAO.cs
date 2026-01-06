using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;

public interface IAdditiveDAO
{
    bool CreateAdditiveForJuice(CreateAdditiveDTO additiveDTO, int juiceId);
    IEnumerable<Additive> GetAdditivesByJuiceId(int juiceId);
    bool UpdateAdditiveById(int id, CreateAdditiveDTO additiveDTO);
    bool DeleteAdditiveById(int id);
}