namespace _5thSemesterProject.Backend.DAL.Model;

public class TasteProfile
{
    public int TasteProfileId { get; set; }
    public int? Sweetness { get; set; }
    public int? Acidity { get; set; }
    public int? Aroma { get; set; }
    public int? Dryness { get; set; }
    public int? Color { get; set; }
    public string? TasteProfileDescription { get; set; }
    public int? Rating { get; set; }
    public string? TasteProfileDate { get; set; }
    public int JuiceId { get; set; }       // foreign key to Juice
}
