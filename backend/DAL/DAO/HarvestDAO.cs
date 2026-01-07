using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;
namespace _5thSemesterProject.Backend.DAL.DAO;

public class HarvestDAO : BaseDAO, IHarvestDAO
{

    public HarvestDAO (IConfiguration configuration) : base(configuration)
    {
    }
       public IEnumerable<Harvest> GetHarvests()
    {
        using var connection = CreateConnection();
        
        var sql = "SELECT HarvestId, HarvestWeight, HarvestDate FROM Harvest LIMIT 3;";

        var result = connection.Query<Harvest>(sql).ToList();

        return result;
    }

    public IEnumerable<Harvest> GetHarvestsByGrapeId(int grapeId)
    {
        using var connection = CreateConnection();

        var sql ="SELECT * FROM Harvest WHERE GrapeId = @grapeIdLookup;";

        var result = connection.Query<Harvest>(sql, new { grapeIdLookup = grapeId}).ToList();

        return result;
    }

    public IEnumerable<Harvest> GetHarvestsByGrapeIdAndYear(int grapeId, int year)
    {
        using var connection = CreateConnection();

        var sql ="SELECT * FROM Harvest WHERE GrapeId = @grapeId AND EXTRACT(YEAR FROM HarvestDate) = @year;";

        var result = connection.Query<Harvest>(sql, new {grapeId, year}).ToList();

        return result;
    }

    public int DeleteHarvestByHarvestId(int harvestId)
    {
        using var connection = CreateConnection();

        var sql ="DELETE FROM Harvest WHERE HarvestId = @harvestId;";

        var result = connection.Execute(sql, new {harvestId});

        return result;
    }

    public int UpdateHarvestByHarvestId(int harvestId, HarvestDTO harvest)
    {
        using var connection = CreateConnection();

        var sql = "UPDATE Harvest SET GrapeRowId = @grapeRowId, HarvestWeight = @harvestWeight, HarvestDate = @harvestDate WHERE HarvestId = @harvestId;";

        var result = connection.Execute(sql, new {harvestId, grapeRowId = harvest.GrapeRowId, harvestWeight = harvest.HarvestWeight, harvestDate = harvest.HarvestDate.ToDateTime(TimeOnly.MinValue)} );

        return result;

    }

    public int CreateHarvest(HarvestDTO harvest)
    {
        using var connection = CreateConnection();

        var sql = "INSERT INTO Harvest (GrapeRowId, GrapeId, HarvestWeight, HarvestDate) VALUES (@grapeRowId, @grapeId, @harvestWeight, @harvestDate);";

        var result = connection.Execute(sql, new {grapeRowId = harvest.GrapeRowId, grapeId = harvest.GrapeId, harvestWeight = harvest.HarvestWeight, harvestDate = harvest.HarvestDate.ToDateTime(TimeOnly.MinValue)});
        
        return result;
    }
}