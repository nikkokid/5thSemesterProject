using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.Model;
using _5thSemesterProject.Backend.DAL.IDAO;

namespace _5thSemesterProject.Backend.DAL.DAO;
public class TasteProfileDAO : ITasteProfileDAO
{
    private readonly IConfiguration _connectionString;

    public TasteProfileDAO(IConfiguration config)
    {
        _connectionString = config;
    }

    public bool CreateTasteProfileForJuice(CreateTasteProfileDTO tasteProfileDTO, int juiceId)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @" INSERT INTO TasteProfile (Sweetness, Acidity, Aroma, Dryness, Color, TasteProfileDescription, Rating, TasteProfileDate, JuiceId)
                         VALUES (@Sweetness, @Acidity, @Aroma, @Dryness, @Color, @TasteProfileDescription, @Rating, @TasteProfileDate, @JuiceId)";
            
            int affectedRows = conn.Execute(sql, new
            {
                Sweetness = tasteProfileDTO.Sweetness,
                Acidity = tasteProfileDTO.Acidity,
                Aroma = tasteProfileDTO.Aroma,
                Dryness = tasteProfileDTO.Dryness,
                Color = tasteProfileDTO.Color,
                TasteProfileDescription = tasteProfileDTO.TasteProfileDescription,
                Rating = tasteProfileDTO.Rating,
                TasteProfileDate = tasteProfileDTO.TasteProfileDate,
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
    public IEnumerable<TasteProfile> GetTasteProfilesByJuiceId(int juiceId)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"SELECT 
                        TasteProfileId,
                        Sweetness,
                        Acidity,
                        Aroma,
                        Dryness,
                        Color,
                        TasteProfileDescription,
                        Rating,
                        TasteProfileDate::timestamp AS TasteProfileDate,
                        JuiceId
                        FROM TasteProfile WHERE JuiceId = @juiceId ORDER BY TasteProfileDate";

            var tasteProfiles = conn.Query<TasteProfile>(sql, new { juiceId });
            return tasteProfiles;
        }
        catch (Exception ex)
        {
            throw new Exception($"Taste Profiles for Juice id {juiceId} could not be fetched. {ex.Message}", ex);
        }
    }



    public bool UpdateTasteProfileById(int id, CreateTasteProfileDTO tasteProfileToUpdate)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"UPDATE TasteProfile
                SET Sweetness=@Sweetness, Acidity=@Acidity, Aroma=@Aroma, Dryness=@Dryness,
                Color=@Color, TasteProfileDescription=@TasteProfileDescription, Rating=@Rating, TasteProfileDate=@TasteProfileDate
                WHERE TasteProfileId=@TasteProfileId";
                
                int affectedRows = conn.Execute(sql, new
                {
                    Sweetness = tasteProfileToUpdate.Sweetness,
                    Acidity = tasteProfileToUpdate.Acidity,
                    Aroma = tasteProfileToUpdate.Aroma,
                    Dryness = tasteProfileToUpdate.Dryness,
                    Color = tasteProfileToUpdate.Color,
                    TasteProfileDescription = tasteProfileToUpdate.TasteProfileDescription,
                    Rating = tasteProfileToUpdate.Rating,
                    TasteProfileDate = tasteProfileToUpdate.TasteProfileDate?.Date,
                    TasteProfileId = id
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

            var sql = @"DELETE FROM TasteProfile WHERE TasteProfileId=@TasteProfileId";

            int affectedRows = conn.Execute(sql, new {TasteProfileId = id});
            //is it better to do afftectedRows == 1; ? hmm
            bool success = affectedRows > 0;
            
            return success;

        }catch(Exception ex)
        {
            throw new Exception($"Taste profile with id: {id} could not be deleted. {ex.Message}", ex);
        }
        
    }

}