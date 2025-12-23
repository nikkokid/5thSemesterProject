using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;
public interface IAdditiveDAO
{
    bool CreateAdditiveWithJuiceId(CreateAdditiveDTO additiveDTO, int id);
    IEnumerable<Additive> GetAdditivesByJuiceId(int id);
    bool UpdateAdditiveById(CreateAdditiveDTO additiveDTO, int id);
    bool DeleteAdditiveById(int id);
}