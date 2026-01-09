namespace _5thSemesterProject.Backend.DAL.Model;

public class AdditiveLineDTO()
{
    public int AdditiveId {get; set;}
    public int JuiceId {get; set; }
    public decimal AdditiveAmount {get; set; }
    public DateOnly AdditiveDate {get; set; }
}