namespace _5thSemesterProject.Backend.DAL.Model;

public class CreateAdditiveDTO()
{
    public string? AdditiveName {get; set;}
    public decimal? AdditiveAmount {get; set; }
    public string? AdditiveDescription {get; set; }
    public DateTime? AdditiveDate {get; set; }
}