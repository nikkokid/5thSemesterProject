using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;

public class WineDAO : IWineDAO
{
    private readonly IConfiguration _configuration;
    public WineDAO(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public IEnumerable<Wine> GetAllWines()
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "SELECT WineId, WineName, VintageYear FROM Wine;";
        var result = connection.Query<Wine>(sql).ToList();
        return result;
    }

    public IEnumerable<WineView> GetWineById(int WineId)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using var connection = new NpgsqlConnection(connectionString);

        var sql = "SELECT * FROM WineView WHERE WineId = @WineId;";

        var result = connection.Query<WineView>(sql, new { WineID = WineId }).ToList();

        return result;
    }

    public int CreateWine(WineDTO wineDTO)
{
    if (wineDTO.Juices == null || wineDTO.Juices.Count == 0)
        return 0;

    if (wineDTO.Juices.Sum(j => j.Percentage) != 100)
        return 0;

    var connectionString = _configuration.GetConnectionString("DefaultConnection");

    using var connection = new NpgsqlConnection(connectionString);
    connection.Open();
    using var transaction = connection.BeginTransaction();

    try
    {
        const string insertWineSql = @"
        INSERT INTO Wine (WineName, VintageYear)
        VALUES (@WineName, @VintageYear)
        RETURNING WineId;
        ";

        int wineId = connection.ExecuteScalar<int>(
            insertWineSql,
            new
            {
                wineDTO.WineName,
                wineDTO.VintageYear
            },
            transaction
        );

        const string insertWineJuiceSql = @"
        INSERT INTO WineJuice (WineId, JuiceId, WineJuicePercentage)
        VALUES (@WineId, @JuiceId, @Percentage);
        ";

        foreach (var juice in wineDTO.Juices)
        {
            connection.Execute(
                insertWineJuiceSql,
                new
                {
                    WineId = wineId,
                    JuiceId = juice.JuiceId,
                    Percentage = juice.Percentage
                },
                transaction
            );
        }

        transaction.Commit();
        return wineId;
    }
    catch
    {
        transaction.Rollback();
        throw;
    }
}


    public bool UpdateWineById(int id, WineDTO wineDTO)
    {
        throw new NotImplementedException();
    }

    public bool DeleteWineById(int id)
    {
        throw new NotImplementedException();
    }
}