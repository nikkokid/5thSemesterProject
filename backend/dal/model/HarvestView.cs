namespace _5thSemesterProject.Backend.DAL.Model;

public class HarvestView
{
    public int HarvestId { get; set; }
    public int HarvestWeight { get; set; }
    public DateOnly HarvestDate { get; set; }
    public string GrapeRowName { get; set; } = string.Empty;
    public int NoOfVines { get; set; }
    public int GrapeId { get; set; }
    public string GrapeName { get; set; } = string.Empty;
}