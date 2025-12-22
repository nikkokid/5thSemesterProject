using Dapper;
using _5thSemesterProject.Backend.DAL.Model;
using _5thSemesterProject.Backend.DAL.IDAO;

namespace _5thSemesterProject.Backend.DAL.DAO;
public class RowDAO : BaseDAO, IRowDAO
{
    /*
    Constructor for RowDAO class based on superclass BaseDAO
    */
    public RowDAO(string connectionString): base(connectionString)
    {
        _connection = CreateConnection();
    }

    /*
    Method for getting a Row by its ID.
    returns a empty placeholder if not found.
    */
    public GrapeRow GetRowById(int id)
    {
        GrapeRow placeholderRow = null;
        try
        {
            var parameters = new { GrapeRowId = id };
            var sql = "SELECT * FROM GrapeRow WHERE GrapeRowId = @GrapeRowId";
            var result = _connection.Query<GrapeRow>(sql, parameters);
            if (result != null && result.Any())
            {
                placeholderRow = result.First();
            }
        }
        catch (Exception ex)
        {
            throw new Exception("Failed trying to retrieve Row by ID: " + ex.Message, ex);
        }
            return placeholderRow;
    }
    /*
    Method for getting all Rows.
    returns an empty list if none are found.
    */
    public IEnumerable<GrapeRow> GetAllRows()
    {
        List<GrapeRow> rows = new List<GrapeRow>();
        try
        {
            var sql = "SELECT * FROM GrapeRow";
            var result = _connection.Query<GrapeRow>(sql);
            if (result != null && result.Any())
            {
                rows = result.ToList();
            }
        }
        catch (Exception ex)
        {
            throw new Exception("Failed trying to retrieve all Rows" + ex.Message, ex);
        }
            return rows;
    }
    /*
    Method for creating a new Row.
    Using parameters to prevent SQL injection.
    returns the ID of the created Row.
    */
    public int CreateRow(GrapeRow row)
    {
        int createdRowId = -1;
        try
        {
            var parameters = new
            {
                NoOfVines = row.NoOfVines,
                LengthOfRow = row.LengthOfRow,
                DistanceBetweenVines = row.DistanceBetweenVines,
                DistanceToNextRow = row.DistanceToNextRow,
                GrapeId = row.GrapeId
            };
            var sql = "INSERT INTO GrapeRow (NoOfVines, LengthOfRow, DistanceBetweenVines, DistanceToNextRow, GrapeId) " +
                      "VALUES (@NoOfVines, @LengthOfRow, @DistanceBetweenVines, @DistanceToNextRow, @GrapeId) " +
                      "RETURNING GrapeRowId";
            createdRowId = _connection.ExecuteScalar<int>(sql, parameters);
        }
        catch (Exception ex)
        {
            throw new Exception("Failed trying to create Row: " + ex.Message, ex);
        }
            return createdRowId;
    }
    /*
    Method for updating an existing Row.
    Using parameters to prevent SQL injection.
    Returns true or false based on the success.
    */
    public bool UpdateRow(GrapeRow row, int id)
    {
        bool isUpdated = false;
        try
        {
            var parameters = new
            {
                RowId = id,
                NoOfVines = row.NoOfVines,
                Length = row.LengthOfRow,
                DistanceBetweenVines = row.DistanceBetweenVines,
                DistanceToNextRow = row.DistanceToNextRow,
                GrapeId = row.GrapeId
            };
            var sql = "UPDATE Row SET NoOfVines = @NoOfVines, Length = @Length, " +
                      "DistanceBetweenVines = @DistanceBetweenVines, DistanceToNextRow = @DistanceToNextRow, " +
                      "GrapeId = @GrapeId WHERE RowId = @RowId";
            var rowsAffected = _connection.Execute(sql, parameters);
            isUpdated = (rowsAffected > 0);
        }
        catch (Exception ex)
        {
              throw new Exception("Failed trying to update Row by ID: " + ex.Message, ex);
        }
            return isUpdated;
    }
    /*
    Method for deleting an existing Row.
    Using parameters to prevent SQL injection.
    Returns true or false based on the success.
    */
    public bool DeleteRow(int id)
    {
        bool isDeleted = false;
        try
        {
            int parameters = id;
            var sql = "DELETE FROM Row WHERE RowId = @RowId";
            var rowsAffected = _connection.Execute(sql, parameters);
            isDeleted = (rowsAffected > 0);
        }
        catch (Exception ex)
        {
              throw new Exception("Failed trying to delete Row by ID: " + ex.Message, ex);
        }
            return isDeleted;
    }
}