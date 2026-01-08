using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;

public interface IAdditiveDAOV2
{
    IEnumerable<AdditiveV2> GetAdditives();
    IEnumerable<AdditiveV2> GetAdditiveByAdditiveId(int additiveId);
    int CreateAdditive(AdditiveDTOV2 additive);
    int UpdateAdditive(AdditiveDTOV2 additive, int additiveId);
    int DeleteAdditive(int additiveId);
}