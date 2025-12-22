namespace _5thSemesterProject.Backend.DAL.Model;

public class CreateTasteProfileDTO
{
    public int? Sweetness { get; set; }
    public int? Acidity { get; set; }
    public int? Aroma { get; set; }
    public int? Dryness { get; set; }
    public int? Color { get; set; }
    public string? TasteProfileDescription { get; set; }
    public int? Rating { get; set; }
    public DateTime? TasteProfileDate { get; set; } 
}
