using _5thSemesterProject.Backend.DAO.Models;
using Microsoft.AspNetCore.Mvc;

namespace _5thSemesterProject.Backend.DAO;

public interface ITasteProfileDAO
{
    public IEnumerable<TasteProfile> GetTasteProfilesByJuiceId(int id);

    public bool CreateTasteProfileForJuice(CreateTasteProfileDTO tasteProfile, int id);

    public bool UpdateTasteProfileById(int id, CreateTasteProfileDTO tasteProfileToUpdate);

    public bool DeleteTasteProfileById(int id);

}