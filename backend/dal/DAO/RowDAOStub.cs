
using _5thSemesterProject.Backend.DAL.Model;
using _5thSemesterProject.Backend.DAL.IDAO;

namespace _5thSemesterProject.Backend.DAL.DAO;
public class RowDAOStub : BaseDAO, IRowDAO
{
    /*
    Constructor for RowDAOStub class.
    RowDAOStub is a stub implementation for testing.
    */
    private List<GrapeRow> _rows;

    public RowDAOStub(string connectionString) : base(connectionString)
    {
        _rows = new List<GrapeRow>
        {
            new GrapeRow { GrapeRowId = 1, NoOfVines = 100, LengthOfRow = 50.0, DistanceBetweenVines = 1.0, DistanceToNextRow = 2.0, GrapeId = 1 },
            new GrapeRow { GrapeRowId = 2, NoOfVines = 120, LengthOfRow = 55.0, DistanceBetweenVines = 1.1, DistanceToNextRow = 2.1, GrapeId = 2 },
            new GrapeRow { GrapeRowId = 3, NoOfVines = 90, LengthOfRow = 48.0, DistanceBetweenVines = 0.9, DistanceToNextRow = 1.8, GrapeId = 1 },
            new GrapeRow { GrapeRowId = 4, NoOfVines = 110, LengthOfRow = 52.0, DistanceBetweenVines = 1.2, DistanceToNextRow = 2.2, GrapeId = 3 },
            new GrapeRow { GrapeRowId = 5, NoOfVines = 95, LengthOfRow = 49.5, DistanceBetweenVines = 1.0, DistanceToNextRow = 2.0, GrapeId = 2 },
            new GrapeRow { GrapeRowId = 6, NoOfVines = 130, LengthOfRow = 60.0, DistanceBetweenVines = 1.3, DistanceToNextRow = 2.3, GrapeId = 1 },
            new GrapeRow { GrapeRowId = 7, NoOfVines = 105, LengthOfRow = 51.0, DistanceBetweenVines = 1.05, DistanceToNextRow = 2.05, GrapeId = 3 },
            new GrapeRow { GrapeRowId = 8, NoOfVines = 115, LengthOfRow = 53.0, DistanceBetweenVines = 1.15, DistanceToNextRow = 2.15, GrapeId = 2 },
            new GrapeRow { GrapeRowId = 9, NoOfVines = 98, LengthOfRow = 47.0, DistanceBetweenVines = 0.98, DistanceToNextRow = 1.9, GrapeId = 1 },
            new GrapeRow { GrapeRowId = 10, NoOfVines = 125, LengthOfRow = 58.0, DistanceBetweenVines = 1.25, DistanceToNextRow = 2.25, GrapeId = 3 }
        };
    }

    public GrapeRow GetRowById(int id)
    {
        int i = 0;
        while (i <= _rows.Count)
        {
            if (_rows[i].GrapeRowId == id)
                return _rows[i];
            i++;
        }
        return null;
    }

    public IEnumerable<GrapeRow> GetAllRows()
    {
        return _rows;
    }

    public int CreateRow(GrapeRow row)
    {
        _rows.Add(row);
        return row.GrapeRowId;
    }

    public bool UpdateRow(GrapeRow row, int id)
    {
        if (id > 0 && id <= _rows.Count)
        {
            _rows[id - 1] = row;
            return true;
        }
        return false;
    }

    public bool DeleteRow(int id)
    {
        if (id > 0 && id <= _rows.Count)
        {
            _rows.RemoveAt(id - 1);
            return true;
        }
        return false;
    }
}