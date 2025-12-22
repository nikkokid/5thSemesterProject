using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;
namespace _5thSemesterProject.Backend.DAL.DAO;

public class HarvestDAO : IHarvestDAO
{
    private readonly IConfiguration _configuration;

    public HarvestDAO (IConfiguration configuration)
    {
        _configuration = configuration;
    }
       public IEnumerable<Harvest> GetHarvests()
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);
        
        var sql = "SELECT HarvestId, HarvestWeight, HarvestDate FROM Harvest LIMIT 3;";

        var result = connection.Query<Harvest>(sql).ToList();

        return result;
    }

    public IEnumerable<HarvestView> GetHarvestsByGrapeId(int grapeId)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql ="SELECT * FROM HarvestView WHERE GrapeId = @grapeIdLookup;";

        var result = connection.Query<HarvestView>(sql, new { grapeIdLookup = grapeId}).ToList();

        return result;
    }

    public IEnumerable<HarvestView> GetHarvestsByGrapeIdAndYear(int grapeId, int year)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql ="SELECT * FROM HarvestView WHERE GrapeId = @grapeId AND EXTRACT(YEAR FROM HarvestDate) = @year;";

        var result = connection.Query<HarvestView>(sql, new {grapeId, year}).ToList();

        return result;
    }

    public int DeleteHarvestByHarvestId(int harvestId)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql ="DELETE FROM Harvest WHERE HarvestId = @harvestId;";

        var result = connection.Execute(sql, new {harvestId});
        return result;
    }
}