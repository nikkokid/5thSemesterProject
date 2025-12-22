using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.Model;
using _5thSemesterProject.Backend.DAL.IDAO;

namespace _5thSemesterProject.Backend.DAL.DAO;

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
            
            var sql = @"INSERT INTO Juice (Volume, PressedDate, GrapeId)
                      VALUES(@Volume, @PressedDate, @GrapeId)";
            int affectedRows = conn.Execute(sql, new
            {
                Volume = juiceDTO.Volume,
                PressedDate = juiceDTO.PressedDate, 
                GrapeId = grapeId 
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
            var sql = @" SELECT * FROM Juice WHERE GrapeId = @grapeId ORDER BY pressed_date DESC";
            var juices = conn.Query<Juice>(sql, new { grapeId }).ToList();
            //NOTE 1
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