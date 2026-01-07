using Dapper;
using Npgsql;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.DAO;

public class WineDAO : BaseDAO, IWineDAO
{
    public WineDAO(IConfiguration configuration) : base(configuration)
    {
    }
    public IEnumerable<Wine> GetAllWines()
    {
        using var connection = CreateConnection();

        var sql = "SELECT WineId, WineName, VintageYear FROM Wine;";
        var result = connection.Query<Wine>(sql).ToList();
        return result;
    }

    public IEnumerable<WineView> GetWineById(int WineId)
    {
        using var connection = CreateConnection();

        var sql = "SELECT WineId, WineName, VintageYear, Percentage, JuiceId, Volume, PressedDate::timestamp AS PressedDate, GrapeId, GrapeName FROM WineView WHERE WineId = @WineId;";

        var result = connection.Query<WineView>(sql, new { WineID = WineId }).ToList();

        return result;
    }

    public int CreateWine(WineDTO wineDTO)
    {
        using var connection = CreateConnection();

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
        using var connection = CreateConnection();

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
        using var connection = CreateConnection();

        var sql = "DELETE FROM Wine WHERE WineId = @WineId;";
        var result = connection.Execute(sql, new { WineId });
        return result;
    }
}