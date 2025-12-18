using Microsoft.AspNetCore.Mvc;
using Dapper;
using Npgsql;

namespace _5thSemesterProject.backend.dal;

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
        
        var sql = "SELECT HarvestId, Weight, Date FROM harvests LIMIT 3;";
        var result = connection.Query<Harvest>(sql).ToList();
        return result;
    }
}