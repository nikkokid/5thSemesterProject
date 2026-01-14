using System;
using System.Collections.Generic;
using NUnit.Framework;
using _5thSemesterProject.Backend.DAL.DAO;

namespace backend.tests.DAO
{
    [TestFixture]
    public class CalculatePercentagesTests
    {
        [Test]
        public void CalculatePercentages_ReturnsCorrectPercentages()
        {
            // Arrange
            var juices = new List<(int JuiceId, decimal VolumeUsed)>
            {
                (1, 30m),
                (2, 20m),
                (3, 50m)
            };

            // Act
            var result = WineDAO.CalculatePercentages(juices);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count, Is.EqualTo(3));
                Assert.That(result[1], Is.EqualTo(30.00m));
                Assert.That(result[2], Is.EqualTo(20.00m));
                Assert.That(result[3], Is.EqualTo(50.00m));
            });
        }

        [Test]
        public void CalculatePercentages_ThrowsException_WhenTotalVolumeIsZero()
        {
            // Arrange
            var juices = new List<(int JuiceId, decimal VolumeUsed)>
            {
                (1, 0m),
                (2, 0m)
            };

            // Act + Assert
            var ex = Assert.Throws<Exception>(() =>
                WineDAO.CalculatePercentages(juices)
            );

            Assert.That(ex!.Message, Is.EqualTo("Total wine volume must be greater than 0"));
        }
    }
}
