
namespace _5thSemesterProject.Backend.DAL.Model;
public class PlantingDTO
{
    public int NumberOfVinesPlanted { get; set; }
    public int NumberOfVinesDead { get; set; }
    public DateOnly PlantingDate { get; set; }
    public int GrapeRowId { get; set; }
    public int GrapeId { get; set; }
}