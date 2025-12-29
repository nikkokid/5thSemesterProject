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

    public int UpdateHarvestByHarvestId(int harvestId, HarvestDTO harvest)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "UPDATE Harvest SET GrapeRowId = @grapeRowId, HarvestWeight = @harvestWeight, HarvestDate = @harvestDate WHERE HarvestId = @harvestId;";

        var result = connection.Execute(sql, new {harvestId, grapeRowId = harvest.GrapeRowId, harvestWeight = harvest.HarvestWeight, harvestDate = harvest.HarvestDate} );

        return result;

    }

    public int CreateHarvest(HarvestDTO harvest)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "INSERT INTO Harvest (GrapeRowId, GrapeId, HarvestWeight, HarvestDate) VALUES (@grapeRowId, @grapeId, @harvestWeight, @harvestDate);";

        var result = connection.Execute(sql, new {grapeRowId = harvest.GrapeRowId, grapeId = harvest.GrapeId, harvestWeight = harvest.HarvestWeight, harvestDate = harvest.HarvestDate});
        
        return result;
    }
}