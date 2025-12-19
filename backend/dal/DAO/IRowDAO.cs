using backend.dal.Models;
namespace backend.dal.DAO;
public interface IRowDAO
{
    public Row GetRowById(int id);
    public IEnumerable<Row> GetAllRows();
    public int CreateRow(Row row);
    public bool UpdateRow(Row row, int id);
    public bool DeleteRow(int id);
}