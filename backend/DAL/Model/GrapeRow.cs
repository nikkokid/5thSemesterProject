
namespace _5thSemesterProject.Backend.DAL.Model;
public class GrapeRow
{
    public int GrapeRowId { get; }
    public string GrapeRowName { get; set; }
    public int LengthOfRow { get; set; }
    public int DistanceBetweenVines { get; set; }
    public int DistanceToNextRow { get; set; }
}