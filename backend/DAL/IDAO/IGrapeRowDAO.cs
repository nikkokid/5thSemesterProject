using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.DAL.IDAO;

public interface IGrapeRowDAO
{
    IEnumerable<GrapeRow> GetGrapeRows();
    IEnumerable<GrapeRow> GetGrapeRowByGrapeRowId(int grapeRowId);
    int CreateGrapeRow(GrapeRowDTO grapeRow);
    int UpdateGrapeRow(GrapeRowDTO grapeRow, int grapeRowId);
    int DeleteGrapeRow(int grapeRowId);
}