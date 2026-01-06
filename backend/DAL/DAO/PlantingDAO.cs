using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;
namespace _5thSemesterProject.Backend.DAL.DAO;

public class PlantingDAO : BaseDAO, IPlantingDAO
{
    public PlantingDAO(IConfiguration configuration) : base(configuration)
    {
        
    }

    public IEnumerable<Planting> GetPlantings()
    {
        var sql = "SELECT * FROM Planting";

        using var connection = CreateConnection();

        var result = connection.Query<Planting>(sql).ToList();

        return result;
    }

    public IEnumerable<Planting> GetPlantingsByGrapeRowId(int grapeRowId)
    {
        var sql = "SELECT * FROM Planting WHERE GrapeRowId = @grapeRowId;";

        using var connection = CreateConnection();

        var result = connection.Query<Planting>(sql, new {grapeRowId}).ToList();
        
        return result;
    }

    public IEnumerable<Planting> GetPlantingByPlantingId(int plantingId)
    {
        var sql = "SELECT * FROM Planting WHERE PlantingId = @plantingId;";

        using var connection = CreateConnection();

        var result = connection.Query<Planting>(sql, new {plantingId});
        
        return result;
    }

    public int CreatePlanting(PlantingDTO planting)
    {
        var sql = "INSERT INTO Planting (NumberOfVinesPlanted, NumberOfVinesDead, PlantingDate, GrapeRowId, GrapeId) VALUES (@numberOfVinesPlanted, @numberOfVinesDead, @plantingDate, @grapeRowId, @grapeId);";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {numberOfVinesPlanted = planting.NumberOfVinesPlanted, numberOfVinesDead = planting.NumberOfVinesDead, plantingDate = planting.PlantingDate.ToDateTime(TimeOnly.MinValue), grapeRowId = planting.GrapeRowId, grapeId = planting.GrapeId});

        return result;
    }

    public int UpdatePlanting(PlantingDTO planting, int plantingId)
    {
        var sql = "UPDATE Planting SET NumberOfVinesPlanted = @numberOfVinesPlanted, NumberOfVinesDead = @numberOfVinesDead, PlantingDate = @plantingDate, GrapeRowId = @grapeRowId, GrapeId = @grapeId WHERE PlantingId = @plantingId;";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new {plantingId, numberOfVinesPlanted = planting.NumberOfVinesPlanted, numberOfVinesDead = planting.NumberOfVinesDead, plantingDate = planting.PlantingDate.ToDateTime(TimeOnly.MinValue), grapeRowId = planting.GrapeRowId, grapeId = planting.GrapeId});

        return result;
    }

    public int DeletePlanting(int plantingId)
    {
        var sql = "DELETE FROM Planting WHERE PlantingId = @plantingId";

        using var connection = CreateConnection();

        var result = connection.Execute(sql, new{plantingId});

        return result;
    }
}