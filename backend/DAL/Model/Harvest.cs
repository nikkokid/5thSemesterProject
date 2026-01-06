namespace _5thSemesterProject.Backend.DAL.Model;

public class Harvest
{
    public int HarvestID { get; set; }

    public int GrapeId { get; set; }

    public int GrapeRowId { get; set; }

    public int HarvestWeight { get; set; }

    public DateTime HarvestDate { get; set; }

}