
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.DAL.IDAO;
public interface IRowDAO
{
    public GrapeRow GetRowById(int id);
    public IEnumerable<GrapeRow> GetAllRows();
    public int CreateRow(GrapeRow row);
    public bool UpdateRow(GrapeRow row, int id);
    public bool DeleteRow(int id);
}