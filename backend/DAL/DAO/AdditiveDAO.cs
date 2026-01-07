using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;


public class AdditiveDAO : BaseDAO, IAdditiveDAO
{
    public AdditiveDAO(IConfiguration configuration) : base(configuration)
    {
    }

    public bool CreateAdditiveForJuice(CreateAdditiveDTO additiveDTO, int juiceId)
    {
        try
        {
            
        using var connection = CreateConnection();

            var sql = @"INSERT INTO Additive (AdditiveName, AdditiveAmount, AdditiveDescription, AdditiveDate, JuiceId)
                        VALUES (@AdditiveName, @AdditiveAmount, @AdditiveDescription, @AdditiveDate, @JuiceId)";
        
        int affectedRows = connection.Execute(sql, new
        {
            AdditiveName = additiveDTO.AdditiveName,
            AdditiveAmount = additiveDTO.AdditiveAmount,
            AdditiveDescription = additiveDTO.AdditiveDescription,
            AdditiveDate = additiveDTO.AdditiveDate,
            JuiceId = juiceId
        });

        bool success = affectedRows > 0;

        return success;
        }
        catch(Exception ex)
        {
            throw new Exception($"Additive could not be created for juice with id: {juiceId}. {ex.Message}", ex);
        }
    }
    public IEnumerable<Additive> GetAdditivesByJuiceId(int juiceId)
    {
        try
        {
            using var connection = CreateConnection();

            var sql = @"SELECT
                        AdditiveId,
                        AdditiveName,
                        AdditiveAmount,
                        AdditiveDescription,
                        AdditiveDate::timestamp AS AdditiveDate,
                        JuiceId
                        FROM Additive WHERE JuiceId = @juiceId ORDER BY AdditiveDate";
            var additives = connection.Query<Additive>(sql, new {juiceId});
            return additives;

        }catch(Exception ex)
        {
            throw new Exception($"Additives with Juice Id {juiceId} could not be found. {ex.Message}", ex);
        }
    }

    public bool UpdateAdditiveById(int id, CreateAdditiveDTO additiveDTO)
    {
        try
        {
            using var connection = CreateConnection();


            var sql = @"UPDATE Additive
                        SET AdditiveName = @AdditiveName, AdditiveAmount = @AdditiveAmount, AdditiveDescription = @AdditiveDescription, AdditiveDate = @AdditiveDate
                        WHERE AdditiveId = @AdditiveId";
            int affectedRows = connection.Execute(sql, new
            {
                AdditiveName = additiveDTO.AdditiveName,
                AdditiveAmount = additiveDTO.AdditiveAmount,
                AdditiveDescription = additiveDTO.AdditiveDescription,
                AdditiveDate = additiveDTO.AdditiveDate,
                AdditiveId = id
            });
            bool success = affectedRows > 0;

            return success;
        }catch(Exception ex)
        {
            throw new Exception($"Additive with id: {id} could not be updated. {ex.Message}", ex);
        }
    }

    public bool DeleteAdditiveById(int id)
    {
        try
        {
            using var connection = CreateConnection();


            var sql = @"DELETE FROM Additive WHERE AdditiveId = @AdditiveId";
            int affectedRows = connection.Execute(sql, new
            {
                AdditiveId = id
            });
            bool success = affectedRows > 0;
            
            return success;


        }catch(Exception ex)
        {
            throw new Exception($"Additive with id: {id} could not be deleted. {ex.Message}", ex);
        }
    }

}