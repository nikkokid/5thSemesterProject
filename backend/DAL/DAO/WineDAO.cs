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

        var sql = "SELECT WineId, WineName, VintageYear, Percentage, JuiceId, Volume, PressedDate::timestamp AS PressedDate, GrapeId, GrapeName FROM WineView WHERE WineId = @WineId;";

        var result = connection.Query<WineView>(sql, new { WineID = WineId }).ToList();

        return result;
    }

    public int CreateWine(WineDTO wineDTO)
{
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


    public int UpdateWineById(int WineId, WineDTO wineDTO)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");
        using var connection = new NpgsqlConnection(connectionString);
        connection.Open();
        using var transaction = connection.BeginTransaction();
        try
        {
            const string updateWineSql = @"
            UPDATE Wine
            SET WineName = @WineName,
                VintageYear = @VintageYear
            WHERE WineId = @WineId;
            ";

            connection.Execute(
                updateWineSql,
                new
                {
                    WineId,
                    wineDTO.WineName,
                    wineDTO.VintageYear
                },
                transaction
            );

            const string deleteWineJuicesSql = @"
            DELETE FROM WineJuice
            WHERE WineId = @WineId;
            ";

            connection.Execute(
                deleteWineJuicesSql,
                new { WineId },
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
                        WineId,
                        JuiceId = juice.JuiceId,
                        Percentage = juice.Percentage
                    },
                    transaction
                );
            }

            transaction.Commit();
            return WineId;
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }

    public int DeleteWineById(int WineId)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");
        using var connection = new NpgsqlConnection(connectionString);
        var sql = "DELETE FROM Wine WHERE WineId = @WineId;";
        var result = connection.Execute(sql, new { WineId });
        return result;
    }
}