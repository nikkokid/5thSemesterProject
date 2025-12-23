using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.Model;
using _5thSemesterProject.Backend.DAL.IDAO;

namespace _5thSemesterProject.Backend.DAL.DAO;

public class JuiceDAO : IJuiceDAO
{
    private readonly IConfiguration _connectionString;

    private ITasteProfileDAO _tasteProfileDAO;


    public JuiceDAO(IConfiguration config, ITasteProfileDAO tasteProfileDAO) // NOTE 1
    {
        _connectionString = config;
        _tasteProfileDAO = tasteProfileDAO;
    }

    
    public bool CreateJuiceWithGrapeId(CreateJuiceDTO juiceDTO ,int grapeId)
    {
        try{
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);
            
            var sql = @"INSERT INTO Juice (Volume, PressedDate, GrapeId, JuiceTypeId)
                      VALUES(@Volume, @PressedDate, @GrapeId, @JuiceTypeId)";
            int affectedRows = conn.Execute(sql, new
            {
                Volume = juiceDTO.Volume,
                PressedDate = juiceDTO.PressedDate, 
                GrapeId = grapeId,
                JuiceTypeId = juiceDTO.JuiceTypeId 
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
            var sql = @" SELECT * FROM Juice WHERE GrapeId = @grapeId ORDER BY PressedDate DESC";
            var juices = conn.Query<Juice>(sql, new { grapeId }).ToList();
            // Populate taste profiles for each juice
            foreach (var juice in juices)
            {
                juice.TasteProfiles = _tasteProfileDAO.GetTasteProfilesByJuiceId(juice.JuiceId).ToList();
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


    public bool UpdateJuiceById(int id, CreateJuiceDTO juiceDTO)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");
            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"UPDATE Juice
                        SET Volume=@Volume, PressedDate=@PressedDate, JuiceTypeId=@JuiceTypeId
                        WHERE JuiceId=@JuiceId";
            int affectedRows = conn.Execute(sql, new
            {
                Volume = juiceDTO.Volume,
                PressedDate = juiceDTO.PressedDate,
                JuiceTypeId = juiceDTO.JuiceTypeId,
                JuiceId = id
            });

            bool success = affectedRows > 0;
            return success;
        }
        catch (Exception ex)
        {
            throw new Exception($"Juice with id: {id} could not be updated. {ex.Message}", ex);
        }
    }

    public bool DeleteJuiceById(int juiceId)
    {
        try
        {
            var connectionString = _connectionString.GetConnectionString("DefaultConnection");

            using var conn = new NpgsqlConnection(connectionString);

            var sql = @"DELETE FROM Juice WHERE Juiceid = @juiceId";
            int affectedRows = conn.Execute(sql, new {Juiceid = juiceId});
            bool success = affectedRows > 0;
            return success;
        }
        catch (Exception ex)
        {
            throw new Exception($"Juice with id: {juiceId} could not be deleted. {ex.Message}", ex);
        }
    }




}