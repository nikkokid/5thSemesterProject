using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;

public interface IAdditiveLineDAO
{
    IEnumerable<AdditiveLine> GetAdditiveLines();
    IEnumerable<AdditiveLine> GetAdditiveLineByAdditiveLineId(int additiveLineId);
    IEnumerable<AdditiveLine> GetAdditiveLineByJuiceId(int juiceId);
    int CreateAdditiveLine(AdditiveLineDTO additiveLine);
    int UpdateAdditiveLine(AdditiveLineDTO additiveLine, int additiveLineId);
    int DeleteAdditiveLine(int additiveLineId);
}