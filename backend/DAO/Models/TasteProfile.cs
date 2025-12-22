namespace _5thSemesterProject.Backend.DAO.Models;

public class TasteProfile
{
    public int Id { get; set; }
    public decimal? Sweetness { get; set; }
    public decimal? Acidity { get; set; }
    public decimal? Aroma { get; set; }
    public decimal? Dryness { get; set; }
    public decimal? Color { get; set; }
    public string? Description { get; set; }
    public decimal? Rating { get; set; }
    public string? Date { get; set; }
    public int JuiceId { get; set; }       // foreign key to Juice
}
