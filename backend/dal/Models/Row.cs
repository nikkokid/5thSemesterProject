
namespace backend.dal.Models;
public class Row
{
    public int rowId { get; set; }
    public int noOfVines { get; set; }
    public double length { get; set; }
    public double distanceBetweenVines { get; set; }
    public double distanceToNextRow { get; set; }
    public int grapeId { get; set; }
}