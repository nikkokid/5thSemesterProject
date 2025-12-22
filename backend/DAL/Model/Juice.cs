namespace _5thSemesterProject.Backend.DAL.Model;

public class Juice
{
    public int JuiceId { get; set; }
    public decimal Volume { get; set; }
    public string? PressedDate { get; set; }
    public int GrapeId { get; set; }
    public int JuiceTypeId { get; set; }
    public List<TasteProfile>? TasteProfiles { get; set; }
}
