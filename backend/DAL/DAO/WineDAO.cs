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
        using var connection = new CreateConnection();
        var sql = "SELECT WineId, WineName, VintageYear FROM Wine;";
        var result = connection.Query<Wine>(sql).ToList();
        return result;
    }

    public IEnumerable<WineView> GetWineById(int WineId)
    {
        using var connection = CreateConnection();
        var sql = "SELECT WineId, WineName, VintageYear, Percentage, JuiceId, VolumeUsed, PressedDate::timestamp AS PressedDate, GrapeId, GrapeName FROM WineView WHERE WineId = @WineId;";

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
        // ----------------------------------
        // 1. Insert wine
        // ----------------------------------
        const string insertWineSql = @"
            INSERT INTO Wine (WineName, VintageYear)
            VALUES (@WineName, @VintageYear)
            RETURNING WineId;
        ";

        int wineId = connection.ExecuteScalar<int>(
            insertWineSql,
            new { wineDTO.WineName, wineDTO.VintageYear },
            transaction
        );

        // ----------------------------------
        // 2. Calculate total volume
        // ----------------------------------
        var percentages = CalculatePercentages(
            wineDTO.Juices.Select(j => (j.JuiceId, j.VolumeUsed))
        );

        // ----------------------------------
        // 3. Insert WineJuice + subtract juice volume
        // ----------------------------------
        const string insertWineJuiceSql = @"
            INSERT INTO WineJuice
                (WineId, JuiceId, VolumeUsed, WineJuicePercentage)
            VALUES
                (@WineId, @JuiceId, @VolumeUsed, @Percentage);
        ";

        const string updateJuiceSql = @"
            UPDATE Juice
            SET Volume = Volume - @VolumeUsed
            WHERE JuiceId = @JuiceId
              AND Volume >= @VolumeUsed;
        ";

        foreach (var juice in wineDTO.Juices)
        {
            // Calculate percentage

            decimal percentage = percentages[juice.JuiceId];


            // Insert wine-juice relation
            connection.Execute(
                insertWineJuiceSql,
                new
                {
                    WineId = wineId,
                    JuiceId = juice.JuiceId,
                    VolumeUsed = juice.VolumeUsed,
                    Percentage = percentage
                },
                transaction
            );

            // Subtract volume from juice stock
            int rowsAffected = connection.Execute(
                updateJuiceSql,
                new
                {
                    JuiceId = juice.JuiceId,
                    VolumeUsed = juice.VolumeUsed
                },
                transaction
            );

            if (rowsAffected == 0)
            {
                throw new Exception(
                    $"Not enough volume available for JuiceId {juice.JuiceId}"
                );
            }
        }

        // ----------------------------------
        // 4. Commit transaction
        // ----------------------------------
        transaction.Commit();
        return wineId;
    }
    catch
    {
        transaction.Rollback();
        throw;
    }
}



    public int UpdateWineById(int wineId, WineDTO wineDTO)
{
    using var connection = CreateConnection();
    connection.Open();

    using var transaction = connection.BeginTransaction();

    try
    {
        // 1. Update wine basic info
        const string updateWineSql = @"
            UPDATE Wine
            SET WineName = @WineName, VintageYear = @VintageYear
            WHERE WineId = @WineId;
        ";

        connection.Execute(
            updateWineSql,
            new { WineId = wineId, wineDTO.WineName, wineDTO.VintageYear },
            transaction
        );

        var percentages = CalculatePercentages(
            wineDTO.Juices.Select(j => (j.JuiceId, j.VolumeUsed))
        );

        // 2. Fetch existing WineJuice
        const string selectWineJuiceSql = @"
            SELECT JuiceId, VolumeUsed
            FROM WineJuice
            WHERE WineId = @WineId;
        ";

        var existingWineJuices = connection.Query<(int JuiceId, decimal VolumeUsed)>(
            selectWineJuiceSql,
            new { WineId = wineId },
            transaction
        ).ToDictionary(x => x.JuiceId, x => x.VolumeUsed);

        // 3. Handle juice updates
        foreach (var juice in wineDTO.Juices)
        {
            decimal oldVolume = existingWineJuices.ContainsKey(juice.JuiceId)
                ? existingWineJuices[juice.JuiceId]
                : 0;

            decimal diff = juice.VolumeUsed - oldVolume;

            // Update juice stock
            const string updateJuiceSql = @"
                UPDATE Juice
                SET Volume = Volume - @Diff
                WHERE JuiceId = @JuiceId
                  AND Volume >= @Diff;
            ";
            
            if (diff != 0)
            {
                int rowsAffected = connection.Execute(
                    updateJuiceSql,
                    new { JuiceId = juice.JuiceId, Diff = diff },
                    transaction
                );

                if (rowsAffected == 0 && diff > 0)
                    throw new Exception($"Not enough volume for JuiceId {juice.JuiceId}");
            }

            // Upsert WineJuice
            const string upsertWineJuiceSql = @"
                INSERT INTO WineJuice (WineId, JuiceId, VolumeUsed, WineJuicePercentage)
                VALUES (@WineId, @JuiceId, @VolumeUsed, @Percentage)
                ON CONFLICT (WineId, JuiceId) 
                DO UPDATE SET VolumeUsed = @VolumeUsed,
                              WineJuicePercentage = @Percentage;
            ";

            connection.Execute(
                upsertWineJuiceSql,
                new { WineId = wineId, JuiceId = juice.JuiceId, VolumeUsed = juice.VolumeUsed, Percentage = percentages[juice.JuiceId] },
                transaction
            );

            existingWineJuices.Remove(juice.JuiceId);
        }

        // 4. Handle removed juices
        foreach (var removedJuice in existingWineJuices)
        {
            // Add back the volume to the juice stock
            const string returnJuiceSql = @"
                UPDATE Juice
                SET Volume = Volume + @VolumeUsed
                WHERE JuiceId = @JuiceId;
            ";

            connection.Execute(
                returnJuiceSql,
                new { JuiceId = removedJuice.Key, VolumeUsed = removedJuice.Value },
                transaction
            );

            // Delete the WineJuice row
            const string deleteWineJuiceSql = @"
                DELETE FROM WineJuice
                WHERE WineId = @WineId AND JuiceId = @JuiceId;
            ";

            connection.Execute(
                deleteWineJuiceSql,
                new { WineId = wineId, JuiceId = removedJuice.Key },
                transaction
            );
        }

        transaction.Commit();

        // Return the wineId
        return wineId;
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

    private static Dictionary<int, decimal> CalculatePercentages(
    IEnumerable<(int JuiceId, decimal VolumeUsed)> juices)
    {
    decimal totalVolume = juices.Sum(j => j.VolumeUsed);

    if (totalVolume <= 0)
        throw new Exception("Total wine volume must be greater than 0");

    return juices.ToDictionary(
        j => j.JuiceId,
        j => Math.Round((j.VolumeUsed / totalVolume) * 100m, 2)
    );
    }
}