using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.Model;
using _5thSemesterProject.Backend.DAL.IDAO;

namespace _5thSemesterProject.Backend.DAL.DAO;

public class JuiceDAO : BaseDAO, IJuiceDAO
{

    private ITasteProfileDAO _tasteProfileDAO;   
    private IAdditiveDAO _additiveDAO;


    public JuiceDAO(IConfiguration configuration, ITasteProfileDAO tasteProfileDAO, IAdditiveDAO additiveDAO) : base(configuration)
    {
        _tasteProfileDAO = tasteProfileDAO;
        _additiveDAO = additiveDAO;
    }

    
    public bool CreateJuiceWithGrapeId(CreateJuiceDTO juiceDTO, int grapeId)
    {
        try{
            using var connection = CreateConnection();

            
            var sql = @"INSERT INTO Juice (Volume, PressedDate, GrapeId, JuiceTypeId)
                      VALUES(@Volume, @PressedDate, @GrapeId, @JuiceTypeId)";
            int affectedRows = connection.Execute(sql, new
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
            using var connection = CreateConnection();


            // Fetch all juices for a given grape
            var sql = @" SELECT 
                         JuiceId,
                         GrapeId,
                         JuiceTypeId,
                         Volume,
                         PressedDate::timestamp AS PressedDate
                         FROM Juice 
                         WHERE GrapeId = @grapeId 
                         ORDER BY PressedDate DESC";
            var juices = connection.Query<Juice>(sql, new { grapeId }).ToList();
            // Populate taste profiles for each juice
            foreach (var juice in juices)
            {
                juice.TasteProfiles = _tasteProfileDAO.GetTasteProfilesByJuiceId(juice.JuiceId).ToList();
                juice.Additives = _additiveDAO.GetAdditivesByJuiceId(juice.JuiceId).ToList();
            }

            return juices;
        }   
        catch (Exception ex)
        {
            throw new Exception($"Juices with grape id {grapeId} could not be fetched. {ex.Message}", ex);
        }
    }

    public IEnumerable<Juice> GetJuicesByGrapeIdAndYear(int grapeId, int year)
    {
        try
        {
            using var connection = CreateConnection();


            // Fetch all juices for a given grape and year
            var sql = @" SELECT 
                         JuiceId,
                         GrapeId,
                         JuiceTypeId,
                         Volume,
                         PressedDate::timestamp AS PressedDate
                         FROM Juice 
                         WHERE GrapeId = @grapeId 
                         AND EXTRACT(YEAR FROM PressedDate) = @year
                         ORDER BY PressedDate DESC";
            var juices = connection.Query<Juice>(sql, new { grapeId, year }).ToList();
            // Populate taste profiles for each juice AND ADDITIVES
            foreach (var juice in juices)
            {
                juice.TasteProfiles = _tasteProfileDAO.GetTasteProfilesByJuiceId(juice.JuiceId).ToList();
                juice.Additives = _additiveDAO.GetAdditivesByJuiceId(juice.JuiceId).ToList();
            }

            return juices;
        }   
        catch (Exception ex)
        {
            throw new Exception($"Juices with grape id {grapeId} for year {year} could not be fetched. {ex.Message}", ex);
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
            using var connection = CreateConnection();

            var sql = @"UPDATE Juice
                        SET Volume=@Volume, PressedDate=@PressedDate
                        WHERE JuiceId=@JuiceId";
            int affectedRows = connection.Execute(sql, new
            {
                Volume = juiceDTO.Volume,
                PressedDate = juiceDTO.PressedDate?.Date,
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
        using var connection = CreateConnection();


            var sql = @"DELETE FROM Juice WHERE Juiceid = @juiceId";
            int affectedRows = connection.Execute(sql, new {Juiceid = juiceId});
            bool success = affectedRows > 0;
            return success;
        }
        catch (Exception ex)
        {
            throw new Exception($"Juice with id: {juiceId} could not be deleted. {ex.Message}", ex);
        }
    }

    public List<Juice> GetJuicesByGrapeIds(int[] grapeIds)
    {
        using var connection = CreateConnection();

        var sql = @"SELECT
                    JuiceId,
                    Volume,
                    PressedDate::timestamp AS PressedDate,
                    GrapeId,
                    JuiceTypeId
                    FROM Juice WHERE GrapeId = ANY(@grapeIds)";
        return connection.Query<Juice>(sql, new { grapeIds }).ToList();
    }

}