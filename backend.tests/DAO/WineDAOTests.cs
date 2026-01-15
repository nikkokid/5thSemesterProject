using System;
using System.Collections.Generic;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NUnit.Framework;
using _5thSemesterProject.Backend.DAL.DAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace backend.tests.DAO
{
    [TestFixture]
    public class WineDAOTests
    {
        private IConfiguration _configuration = null!;
        private string _connectionString = null!;

        [OneTimeSetUp]
    public void OneTimeSetUp()
    {
    // Test database connection details
    var user = "nsadfion21JD";
    var pwd  = "apdpkfndfs71ZA";
    var db   = "test_database";

    // 
    // - tests runs on localhost
    // - test postgres container runs on port 5433
    _connectionString = $"Host=localhost;Port=5433;Username={user};Password={pwd};Database={db}";

    Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", _connectionString);

    _configuration = new ConfigurationBuilder()
        .AddEnvironmentVariables()
        .Build();
}


        private NpgsqlConnection OpenConnection()
        {
            var connection = new NpgsqlConnection(_connectionString);
            connection.Open();
            return connection;
        }

        [TearDown]
        public void TearDown()
        {
            // Clean up database after each test
            using var connection = OpenConnection();
            connection.Execute(@"
                TRUNCATE TABLE
                  WineJuice,
                  Wine,
                  Juice
                RESTART IDENTITY CASCADE;
            ");
        }

        private int InsertJuice(decimal volume)
        {
            using var connection = OpenConnection();

            // insert juice and return juiceId
            // used in tests to have some juice to make wine from
            return connection.ExecuteScalar<int>(@"
                INSERT INTO Juice (Volume, PressedDate, GrapeId, JuiceTypeId)
                VALUES (@Volume, CURRENT_DATE, 1, 1)
                RETURNING JuiceId;
            ", new { Volume = volume });
        }

        [Test]
        public void CreateWine_InsertsWineAndWineJuice_AndSubtractsJuiceVolume()
        {
            // Arrange
            var dao = new WineDAO(_configuration);

            var juiceId = InsertJuice(volume: 100m);

            var wineDto = new WineDTO
            {
                WineName = "TestWine",
                VintageYear = 2024,
                Juices = new List<WineJuice>
                {
                    new WineJuice { JuiceId = juiceId, VolumeUsed = 25m }
                }
            };

            // Act
            var createdWineId = dao.CreateWine(wineDto);


            // Assert
            Assert.That(createdWineId, Is.GreaterThan(0));

            using var connection = OpenConnection();


            // 1) Wine is created 
            var wineName = connection.ExecuteScalar<string>(
            "SELECT winename FROM wine WHERE wineid = @id",
            new { id = createdWineId }
            );

            Assert.That(wineName, Is.EqualTo("TestWine"));

            // 2) WineJuice row is created
            var wineJuiceCount = connection.ExecuteScalar<int>(
            "SELECT COUNT(*) FROM winejuice WHERE wineid = @wineId AND juiceid = @juiceId",
            new { wineId = createdWineId, juiceId }
            );

            Assert.That(wineJuiceCount, Is.EqualTo(1));

            // 3) Juice.Volume is reduced
            var newJuiceVol = connection.ExecuteScalar<decimal>(
            "SELECT volume FROM juice WHERE juiceid = @id",
            new { id = juiceId }
            );
            Assert.That(newJuiceVol, Is.EqualTo(75m));

        }

        [Test]
        public void CreateWine_NotEnoughVolume_Throws_AndRollsBack()
        {
            // Arrange
            var dao = new WineDAO(_configuration);

            var juiceId = InsertJuice(volume: 5m);

            var wineDto = new WineDTO
            {
                WineName = "ShouldRollback",
                VintageYear = 2024,
                Juices = new List<WineJuice>
                {
                    new WineJuice { JuiceId = juiceId, VolumeUsed = 10m } // too much volume
                }
            };

            // Act + Assert
            var ex = Assert.Throws<Exception>(() => dao.CreateWine(wineDto));
            Assert.That(ex!.Message, Does.Contain("Not enough volume available"));

            using var connection = OpenConnection();

            // Wine must not be created (rollback)
            var wineCount = connection.ExecuteScalar<int>(@"
                SELECT COUNT(*)
                FROM Wine
                WHERE WineName = @Name;
            ", new { Name = "ShouldRollback" });

            Assert.That(wineCount, Is.EqualTo(0));

            // Juice volume must not be changed (rollback)
            var vol = connection.ExecuteScalar<decimal>(@"
                SELECT Volume
                FROM Juice
                WHERE JuiceId = @JuiceId;
            ", new { JuiceId = juiceId });

            Assert.That(vol, Is.EqualTo(5m));
        }
    }
}
