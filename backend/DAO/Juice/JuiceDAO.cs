using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAO.Models;
using System.Reflection.Emit;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace _5thSemesterProject.Backend.DAO;

public class JuiceDAO : IJuiceDAO
{
    private readonly IConfiguration _connectionString;

    // NOTE 1: This is for getting tasteprofiles directly onto juices. If this is bad architecture, remove 
    // NOTE 1 elements and execute another query fetching the taste profiles inside the GetJuicesByGrapeId method
    // If this is good architecture, remove the notes :D
    private ITasteProfileDAO _tasteProfileDAO;


    public JuiceDAO(IConfiguration config, ITasteProfileDAO tasteProfileDAO) // NOTE 1
    {
        _connectionString = config;
        //NOTE 1
        _tasteProfileDAO = tasteProfileDAO;
    }

    
    public bool CreateJuiceWithGrapeId(CreateJuiceDTO juiceDTO ,int grapeId)
    {
        try{
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);
            
            var sql = @"INSERT INTO juice (volume, pressed_date, grape_id)
                      VALUES(@Volume, @Pressed_Date, @Grape_Id)";
            int affectedRows = conn.Execute(sql, new
            {
                Volume = juiceDTO.Volume,
                Pressed_Date = juiceDTO.PressedDate, 
                Grape_id = grapeId 
            });
            
            bool success = affectedRows > 0;
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception($"Juice could not be created with Grape Id: {grapeId}. {ex.Message}", ex);
        }
    }
    
    
    public IEnumerable<Juice> GetJuicesByGrapeId(int grapeId)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");

            using var conn = new NpgsqlConnection(connectionString);

            // Fetch all juices for a given grape
            var sql = @" SELECT * FROM juice WHERE grape_id = @grapeId ORDER BY pressed_date DESC";
            var juices = conn.Query<Juice>(sql, new { grapeId }).ToList();
            //NOTE 1
            // Populate taste profiles for each juice
            foreach (var juice in juices)
            {
                juice.TasteProfiles = _tasteProfileDAO.GetTasteProfilesByJuiceId(juice.Id).ToList();
            }

            return juices;
        }   
        catch (Exception ex)
        {
            throw new Exception($"Juices with grape id {grapeId} could not be fetched. {ex.Message}", ex);
        }
    }


      public Juice GetJuiceById(int id)
    {
        throw new NotImplementedException();
    }


    public bool UpdateJuiceById()
    {
        return true;
    }

    public bool DeleteJuiceById(int juiceId)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");

            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"DELETE FROM juice WHERE id = @juiceId";
            int affectedRows = conn.Execute(sql, new {id = juiceId});
            bool success = affectedRows > 0;
            return success;
        }
        catch (Exception ex)
        {
            throw new Exception($"Juice with id: {juiceId} could not be deleted. {ex.Message}", ex);
        }
    }




}