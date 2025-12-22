namespace _5thSemesterProject.backend.dal;

public class HarvestView
{
    public int HarvestId { get; set; }
    public int Weight { get; set; }
    public DateOnly HarvestDate { get; set; }
    public string RowName { get; set; } = string.Empty;
    public int NoOfVines { get; set; }
    public int GrapeId { get; set; }
    public string GrapeName { get; set; } = string.Empty;
}