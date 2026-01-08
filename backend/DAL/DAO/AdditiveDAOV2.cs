using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;


public class AdditiveDAOV2 : BaseDAO, IAdditiveDAOV2
{
    public AdditiveDAOV2(IConfiguration configuration) : base(configuration)
    {
    }

    public IEnumerable<AdditiveV2> GetAdditives()
    {
        var sql = "SELECT * FROM AdditiveV2;";

        using var connection = CreateConnection();

        var result = connection.Query<AdditiveV2>(sql).ToList();

        return result;
    }

    public IEnumerable<AdditiveV2> GetAdditiveByAdditiveId(int additiveId)
    {
        var sql = "SELECT * FROM AdditiveV2 WHERE AdditiveId = @additiveId;";

        using var connection = CreateConnection();

        var result = connection.Query<AdditiveV2>(sql, new {additiveId}).ToList();

        return result;
    }

    public int CreateAdditive(AdditiveDTOV2 additive)
    {
        var sql = "INSERT INTO AdditiveV2 (AdditiveName, AdditiveDescription, AdditiveURL) VALUES (@additiveName, @additiveDescription, @additiveURL);";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {additiveName = additive.AdditiveName, additiveDescription = additive.AdditiveDescription, additiveURL = additive.AdditiveURL});

        return result;
    }

    public int UpdateAdditive(AdditiveDTOV2 additive, int additiveId)
    {
        var sql = "UPDATE AdditiveV2 SET AdditiveName = @additiveName, AdditiveDescription = @additiveDescription, AdditiveURL = @additiveURL WHERE AdditiveId = @additiveId;";
        
        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {additiveId, additiveName = additive.AdditiveName, additiveDescription = additive.AdditiveDescription, additiveURL = additive.AdditiveURL});

        return result;
    }

    public int DeleteAdditive(int additiveId)
    {
        var sql = "DELETE FROM AdditiveV2 WHERE AdditiveId = @additiveId;";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {additiveId});

        return result;
    }
}
