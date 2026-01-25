namespace _5thSemesterProject.Backend.DAL.Model;
public class WineDTO
    {
        public string? WineName { get; set; }
        public int VintageYear { get; set; }
        public required List<WineJuice> Juices { get; set; }
    }