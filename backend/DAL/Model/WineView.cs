namespace _5thSemesterProject.Backend.DAL.Model;
public class WineView
{
    public int WineId { get; set; }
    public string WineName { get; set; }
    public int VintageYear { get; set; }

    public int JuiceId { get; set; }
    public int Percentage { get; set; }
    public decimal VolumeUsed { get; set; }
    public string? PressedDate { get; set; }

    public int GrapeId { get; set; }
    public string GrapeName { get; set; }
    public int JuiceTypeId { get; set; }
    public string JuiceTypeName { get; set; } = "";
}