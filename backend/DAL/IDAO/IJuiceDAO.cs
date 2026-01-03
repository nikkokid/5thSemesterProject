
using System.ComponentModel;
using _5thSemesterProject.Backend.DAL.Model;
namespace _5thSemesterProject.Backend.DAL.IDAO;


public interface IJuiceDAO
{
    public bool CreateJuiceWithGrapeId(CreateJuiceDTO juiceDTO, int id);
    public Juice GetJuiceById(int id);
    public IEnumerable<Juice> GetJuicesByGrapeId(int id);

    public bool UpdateJuiceById();

    public bool DeleteJuiceById(int juiceId);
    public List<Juice> GetJuicesByGrapeIds(int[] grapeIds);


}