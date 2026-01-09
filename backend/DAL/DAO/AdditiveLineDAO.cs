using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;


public class AdditiveLineDAO : BaseDAO, IAdditiveLineDAO
{
    public AdditiveLineDAO(IConfiguration configuration) : base(configuration)
    {
    }

    public IEnumerable<AdditiveLine> GetAdditiveLines()
    {
        var sql = "SELECT * FROM AdditiveLine;";

        using var connection = CreateConnection();

        var result = connection.Query<AdditiveLine>(sql).ToList();

        return result;
    }

    public IEnumerable<AdditiveLine> GetAdditiveLineByAdditiveLineId(int additiveLineId)
    {
        var sql = "SELECT * FROM AdditiveLine WHERE AdditiveLineId = @additiveLineId;";

        using var connection = CreateConnection();

        var result = connection.Query<AdditiveLine>(sql, new {additiveLineId}).ToList();

        return result;
    }

    public IEnumerable<AdditiveLine> GetAdditiveLineByJuiceId(int juiceId)
    {
        var sql = "SELECT * FROM AdditiveLine Where JuiceId = @juiceId;";

        using var connection = CreateConnection();

        var result = connection.Query<AdditiveLine>(sql, new{juiceId}).ToList();

        return result;
    }

    public int CreateAdditiveLine(AdditiveLineDTO additiveLine)
    {
        var sql = "INSERT INTO AdditiveLine (AdditiveId, JuiceId, AdditiveAmount, AdditiveDate) VALUES (@additiveId, @juiceId, @additiveAmount, @additiveDate);";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {additiveId = additiveLine.AdditiveId, juiceId = additiveLine.JuiceId, additiveAmount = additiveLine.AdditiveAmount, additiveDate = additiveLine.AdditiveDate.ToDateTime(TimeOnly.MinValue)});

        return result;
    }

    public int UpdateAdditiveLine(AdditiveLineDTO additiveLine, int additiveLineId)
    {
        var sql = "UPDATE AdditiveLine SET AdditiveId = @additiveId, JuiceId = @juiceId, AdditiveAmount = @additiveAmount, AdditiveDate = @additiveDate WHERE AdditiveLineId = @additiveLineId;";
        
        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {additiveLineId, additiveId = additiveLine.AdditiveId, juiceId = additiveLine.JuiceId, additiveAmount = additiveLine.AdditiveAmount, additiveDate = additiveLine.AdditiveDate.ToDateTime(TimeOnly.MinValue)});

        return result;
    }

    public int DeleteAdditiveLine(int additiveLineId)
    {
        var sql = "DELETE FROM AdditiveLine WHERE AdditiveLineId = @additiveLineId;";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {additiveLineId});

        return result;
    }
}
