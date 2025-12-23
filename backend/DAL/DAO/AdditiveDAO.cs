using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;


public class AdditiveDAO : IAdditiveDAO
{
        private readonly IConfiguration _connectionString;

    public AdditiveDAO(IConfiguration config)
    {
        _connectionString = config;
    }

    public bool CreateAdditiveWithJuiceId(CreateAdditiveDTO additiveDTO, int id)
    {
        try
        {
            
        var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"INSERT INTO Additive ()
                        VALUES ()";
        
        int affectedRows = conn.Execute(sql, new
        {
            

        });

        bool success = affectedRows > 0;

        return success;
        }
        catch(Exception ex)
        {
            throw new Exception($"Additive could not be created for juice with id: {id}. {ex.Message}", ex);
        }
    }
    public IEnumerable<Additive> GetAdditivesByJuiceId(int id)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"SELECT * FROM Additive WHERE JuiceId = @JuiceId ORDER BY AdditiveDate";
            var additives = conn.Query<Additive>(sql, new {JuiceId = id});
            return additives;

        }catch(Exception ex)
        {
            throw new Exception($"Additives with Juice Id {id} could not be found. {ex.Message}", ex);
        }
    }

    public bool UpdateAdditiveById(CreateAdditiveDTO additiveDTO, int id)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"UPDATE Additive
                        SET
                        WHERE JuiceId = @JuiceId";
            int affectedRows = conn.Execute(sql, new
            {
               JuiceId = id 
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
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"DELETE FROM Additive WHERE JuiceId = @JuiceId";
            int affectedRows = conn.Execute(sql, new
            {
                JuiceId = id
            });
            bool success = affectedRows > 0;
            
            return success;


        }catch(Exception ex)
        {
            throw new Exception($"Additive with id: {id} could not be deleted. {ex.Message}", ex);
        }
    }

}