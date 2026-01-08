using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;
namespace _5thSemesterProject.Backend.DAL.DAO;

public class GrapeRowDAO : BaseDAO, IGrapeRowDAO
{
    public GrapeRowDAO(IConfiguration configuration) : base(configuration)
    {
        
    }

    public IEnumerable<GrapeRow> GetGrapeRows()
    {
        var sql = "SELECT * FROM GrapeRow";

        using var connection = CreateConnection();

        var result = connection.Query<GrapeRow>(sql).ToList();

        return result;
    }

    public IEnumerable<GrapeRow> GetGrapeRowByGrapeRowId(int grapeRowId)
    {
        var sql = "SELECT * FROM GrapeRow WHERE GrapeRowId = @grapeRowId;";

        using var connection = CreateConnection();

        var result = connection.Query<GrapeRow>(sql, new {grapeRowId}).ToList();
        
        return result;
    }

    public int CreateGrapeRow(GrapeRowDTO grapeRow)
    {
        var sql = "INSERT INTO GrapeRow (GrapeRowName, LengthOfRow, DistanceBetweenVines, DistanceToNextRow) VALUES (@grapeRowName, @lengthOfRow, @distanceBetweenVines, @distanceToNextRow);";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {grapeRowName = grapeRow.GrapeRowName, lengthOfRow = grapeRow.LengthOfRow, distanceBetweenVines = grapeRow.DistanceBetweenVines, distanceToNextRow = grapeRow.DistanceToNextRow});

        return result;
    }

    public int UpdateGrapeRow(GrapeRowDTO grapeRow, int grapeRowId)
    {
        var sql = "UPDATE GrapeRow SET GrapeRowName = @grapeRowName, LengthOfRow = @lengthOfRow, DistanceBetweenVines = @distanceBetweenVines, DistanceToNextRow = @distanceToNextRow WHERE GrapeRowId = @grapeRowId;";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {grapeRowId, grapeRowName = grapeRow.GrapeRowName, lengthOfRow = grapeRow.LengthOfRow, distanceBetweenVines = grapeRow.DistanceBetweenVines, distanceToNextRow = grapeRow.DistanceToNextRow});

        return result;
    }

    public int DeleteGrapeRow(int grapeRowId)
    {
        var sql = "DELETE FROM GrapeRow WHERE GrapeRowId = @grapeRowId;";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {grapeRowId});

        return result;
    }
}