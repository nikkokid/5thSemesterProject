using System.Diagnostics.Contracts;
using backend.dal.Models;

namespace backend.dal.DAO;

public class RowDAOStub : BaseDAO, IRowDAO
{
    /*
    Constructor for RowDAOStub class.
    RowDAOStub is a stub implementation for testing.
    */
    private List<Row> _rows;

    public RowDAOStub(string connectionString) : base(connectionString)
    {
        _rows = new List<Row>
        {
            new Row { rowId = 1, noOfVines = 100, length = 50.0, distanceBetweenVines = 1.0, distanceToNextRow = 2.0, grapeId = 1 },
            new Row { rowId = 2, noOfVines = 120, length = 55.0, distanceBetweenVines = 1.1, distanceToNextRow = 2.1, grapeId = 2 },
            new Row { rowId = 3, noOfVines = 90, length = 48.0, distanceBetweenVines = 0.9, distanceToNextRow = 1.8, grapeId = 1 },
            new Row { rowId = 4, noOfVines = 110, length = 52.0, distanceBetweenVines = 1.2, distanceToNextRow = 2.2, grapeId = 3 },
            new Row { rowId = 5, noOfVines = 95, length = 49.5, distanceBetweenVines = 1.0, distanceToNextRow = 2.0, grapeId = 2 },
            new Row { rowId = 6, noOfVines = 130, length = 60.0, distanceBetweenVines = 1.3, distanceToNextRow = 2.3, grapeId = 1 },
            new Row { rowId = 7, noOfVines = 105, length = 51.0, distanceBetweenVines = 1.05, distanceToNextRow = 2.05, grapeId = 3 },
            new Row { rowId = 8, noOfVines = 115, length = 53.0, distanceBetweenVines = 1.15, distanceToNextRow = 2.15, grapeId = 2 },
            new Row { rowId = 9, noOfVines = 98, length = 47.0, distanceBetweenVines = 0.98, distanceToNextRow = 1.9, grapeId = 1 },
            new Row { rowId = 10, noOfVines = 125, length = 58.0, distanceBetweenVines = 1.25, distanceToNextRow = 2.25, grapeId = 3 }
        };
    }

    public Row GetRowById(int id)
    {
        int i = 0;
        while (i <= _rows.Count)
        {
            if (_rows[i].rowId == id)
                return _rows[i];
            i++;
        }
        return null;
    }

    public IEnumerable<Row> GetAllRows()
    {
        return _rows;
    }

    public int CreateRow(Row row)
    {
        _rows.Add(row);
        return row.rowId;
    }

    public bool UpdateRow(Row row, int id)
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