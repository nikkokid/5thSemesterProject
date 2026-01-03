namespace _5thSemesterProject.Backend.DAL.Model;
public class WineView
{
    public int WineId { get; set; }
    public string WineName { get; set; }
    public int VintageYear { get; set; }

    public int JuiceId { get; set; }
    public int Percentage { get; set; }
    public decimal JuiceVolume { get; set; }
    public DateTime PressedDate { get; set; }

    public int GrapeId { get; set; }
    public string GrapeName { get; set; }
}