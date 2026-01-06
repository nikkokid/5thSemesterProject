using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;

public class GrapeDAO : IGrapeDAO
{
    private readonly IConfiguration _configuration;

    public GrapeDAO (IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public IEnumerable<Grape> GetAllGrapes()
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);
        
        var sql = "SELECT GrapeId, GrapeName FROM Grape;";

        var result = connection.Query<Grape>(sql).ToList();

        return result;
    }
    public Grape? GetGrapeById(int GrapeId)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "SELECT GrapeId, GrapeName FROM Grape WHERE GrapeId = @GrapeId;";

        var result = connection.QuerySingleOrDefault<Grape>(sql, new { GrapeId });

        return result; 
    }

    public int DeleteGrapeById(int GrapeId)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "DELETE FROM Grape WHERE GrapeId = @GrapeId;";

        var result = connection.Execute(sql, new { GrapeId });

        return result;
    }

    public int UpdateGrapeById(GrapeDTO grapeDTO, int GrapeId)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "UPDATE Grape SET GrapeName = @GrapeName WHERE GrapeId = @GrapeId;";

        var result = connection.Execute(sql, new { GrapeId, grapeDTO.GrapeName });

        return result; 
    }
    public int CreateGrape(GrapeDTO grapeDTO)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "INSERT INTO Grape (GrapeName) VALUES (@GrapeName);";

        var result = connection.Execute(sql, new { grapeDTO.GrapeName }); 

        return result;
    }   

}