namespace _5thSemesterProject.Backend.DAL.Model;

public class JuiceType
{
    public int JuiceTypeId { get; set; }
    public required string JuiceTypeName { get; set; }   // 'pressed' or 'unpressed'
}
