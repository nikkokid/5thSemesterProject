namespace _5thSemesterProject.Backend.DAL.Model;
public class Wine
{
    public int WineId { get; set; }
    public string? WineName { get; set; }
    public int VintageYear { get; set; }
    public List<WineJuice> WineJuices { get; set; } = new();

}