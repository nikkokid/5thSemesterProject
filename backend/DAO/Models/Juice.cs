namespace _5thSemesterProject.Backend.DAO.Models;

public class Juice
{
    public int Id { get; set; }
    public decimal Volume { get; set; }
    public string? PressedDate { get; set; }
    public int GrapeId { get; set; }
    public int JuiceTypeId { get; set; }   // references pressed/unpressed type

    // optional navigation property for taste profiles
    public List<TasteProfile>? TasteProfiles { get; set; }
}
