namespace _5thSemesterProject.Backend.DAO.Models;

public class CreateTasteProfileDTO
{
    public decimal? Sweetness { get; set; }
    public decimal? Acidity { get; set; }
    public decimal? Aroma { get; set; }
    public decimal? Dryness { get; set; }
    public decimal? Color { get; set; }
    public string? Description { get; set; }
    public decimal? Rating { get; set; }
    public DateTime? Date { get; set; } 
}
