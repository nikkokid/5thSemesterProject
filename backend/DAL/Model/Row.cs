
namespace _5thSemesterProject.Backend.DAL.Model;
public class GrapeRow
{
    public int GrapeRowId { get; set; }
    public int NoOfVines { get; set; }
    public double LengthOfRow { get; set; }
    public double DistanceBetweenVines { get; set; }
    public double DistanceToNextRow { get; set; }
    public int GrapeId { get; set; }
}