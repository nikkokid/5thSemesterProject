namespace _5thSemesterProject.Backend.DAL.Model;

public class CreateJuiceDTO()
{
    public decimal Volume { get; set; }
    public DateTime? PressedDate { get; set; }
    public int GrapeId { get; set; }
    public int JuiceTypeId { get; set; }


}