using _5thSemesterProject.Backend.DAO.Models;

namespace _5thSemesterProject.Backend.DAO;


public interface IJuiceDAO
{
    public bool CreateJuiceWithGrapeId(CreateJuiceDTO juiceDTO, int id);
    public Juice GetJuiceById(int id);
    public IEnumerable<Juice> GetJuicesByGrapeId(int id);

    public bool UpdateJuiceById();

    public bool DeleteJuiceById(int juiceId);


}