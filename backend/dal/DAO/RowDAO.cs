using Dapper;
using Npgsql;
using backend.dal.Models;
namespace backend.dal.DAO;

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
    public Row GetRowById(int id)
    {
        Row placeholderRow = null;
        try
        {
            var parameters = new { RowId = id };
            var sql = "SELECT * FROM Row WHERE RowId = @RowId";
            var result = _connection.Query<Row>(sql, parameters);
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
    public IEnumerable<Row> GetAllRows()
    {
        List<Row> rows = new List<Row>();
        try
        {
            var sql = "SELECT * FROM Row";
            var result = _connection.Query<Row>(sql);
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
    public int CreateRow(Row row)
    {
        int createdRowId = -1;
        try
        {
            var parameters = new
            {
                NoOfVines = row.noOfVines,
                Length = row.length,
                DistanceBetweenVines = row.distanceBetweenVines,
                DistanceToNextRow = row.distanceToNextRow,
                GrapeId = row.grapeId
            };
            var sql = "INSERT INTO Row (NoOfVines, Length, DistanceBetweenVines, DistanceToNextRow, GrapeId) " +
                      "VALUES (@NoOfVines, @Length, @DistanceBetweenVines, @DistanceToNextRow, @GrapeId) " +
                      "RETURNING RowId";
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
    public bool UpdateRow(Row row, int id)
    {
        bool isUpdated = false;
        try
        {
            var parameters = new
            {
                RowId = id,
                NoOfVines = row.noOfVines,
                Length = row.length,
                DistanceBetweenVines = row.distanceBetweenVines,
                DistanceToNextRow = row.distanceToNextRow,
                GrapeId = row.grapeId
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