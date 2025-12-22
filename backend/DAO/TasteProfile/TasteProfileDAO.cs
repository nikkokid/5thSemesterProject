using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAO.Models;
using System.Reflection.Emit;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;

namespace _5thSemesterProject.Backend.DAO;

public class TasteProfileDAO : ITasteProfileDAO
{
    private readonly IConfiguration _connectionString;

    public TasteProfileDAO(IConfiguration config)
    {
        _connectionString = config;
    }

    public IEnumerable<TasteProfile> GetTasteProfilesByJuiceId(int juiceId)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"SELECT * FROM taste_profiles WHERE juice_id = @juiceId ORDER BY date";

            var tasteProfiles = conn.Query<TasteProfile>(sql, new { juiceId });
            return tasteProfiles;
        }
        catch (Exception ex)
        {
            throw new Exception($"Taste Profiles for Juice id {juiceId} could not be fetched. {ex.Message}", ex);
        }
}


    public bool CreateTasteProfileForJuice(CreateTasteProfileDTO tasteProfileDTO, int juiceId)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @" INSERT INTO taste_profiles (sweetness, acidity, aroma, dryness, color, description, rating, date, juice_id)
                         VALUES (@Sweetness, @Acidity, @Aroma, @Dryness, @Color, @Description, @Rating, @Date, @JuiceId)";
            
            int affectedRows = conn.Execute(sql, new
            {
                Sweetness = tasteProfileDTO.Sweetness,
                Acidity = tasteProfileDTO.Acidity,
                Aroma = tasteProfileDTO.Aroma,
                Dryness = tasteProfileDTO.Dryness,
                Color = tasteProfileDTO.Color,
                Description = tasteProfileDTO.Description,
                Rating = tasteProfileDTO.Rating,
                Date = tasteProfileDTO.Date,
                JuiceId = juiceId
            });

            bool success = affectedRows > 0;
            
            return success;
        }
        catch(Exception ex)
        {
            throw new Exception($"Taste profile could not be created for juice with id: {juiceId}. {ex.Message}", ex);
        }
        
    }

    public bool UpdateTasteProfileById(int id, CreateTasteProfileDTO tasteProfileToUpdate)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"UPDATE taste_profiles
                SET sweetness=@Sweetness, acidity=@Acidity, aroma=@Aroma, dryness=@Dryness,
                color=@Color, description=@Description, rating=@Rating, date=@Date
                WHERE id=@Id";
            int affectedRows = conn.Execute(sql, new
            {
                Sweetness = tasteProfileToUpdate.Sweetness,
                Acidity = tasteProfileToUpdate.Acidity,
                Aroma = tasteProfileToUpdate.Aroma,
                Dryness = tasteProfileToUpdate.Dryness,
                Color = tasteProfileToUpdate.Color,
                Description = tasteProfileToUpdate.Description,
                Rating = tasteProfileToUpdate.Rating,
                Date = tasteProfileToUpdate.Date,
                Id = id
            });

            bool success = affectedRows > 0;
            
            return success;

        }catch(Exception ex)
        {
            throw new Exception($"Taste profile with id: {id} could not be updated. {ex.Message}", ex);
        }
        
    }


    public bool DeleteTasteProfileById(int id)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"DELETE FROM taste_profiles WHERE id=@tasteProfileId";

            int affectedRows = conn.Execute(sql, new {tasteProfileId = id});
            //is it better to do afftectedRows == 1; ? hmm
            bool success = affectedRows > 0;
            
            return success;

        }catch(Exception ex)
        {
            throw new Exception($"Taste profile with id: {id} could not be deleted. {ex.Message}", ex);
        }
        
    }

}