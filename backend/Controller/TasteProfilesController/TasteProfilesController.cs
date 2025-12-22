using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAO;
using _5thSemesterProject.Backend.DAO.Models; 


namespace _5thSemesterProject.Backend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class TasteProfilesController : ControllerBase
{
    private ITasteProfileDAO _tasteProfileDAO;


    public TasteProfilesController(ITasteProfileDAO tasteProfileDAO)
        {
            _tasteProfileDAO = tasteProfileDAO;
        }


    [HttpPost("{juiceId}")]
    public ActionResult CreateTasteProfileForJuice([FromBody]CreateTasteProfileDTO tasteProfileDTO, [FromRoute]int juiceId)
    {
        try
        {
            bool success = _tasteProfileDAO.CreateTasteProfileForJuice(tasteProfileDTO, juiceId);
            if(!success) return StatusCode(500,"Could not create taste profile.");
            return NoContent(); //204 success with no content
        }
        catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    

    [HttpGet("{id}")]
    public ActionResult<TasteProfile[]> GetTasteProfilesByJuiceId(int id)
    {
        try
        {
            var tasteProfiles = _tasteProfileDAO.GetTasteProfilesByJuiceId(id).ToArray();
            
            //returning an empty array is fine in this context.
            return Ok(tasteProfiles);   
        }
        catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPatch("{tasteProfileId}")]
    public ActionResult UpdateTasteProfileById([FromRoute]int tasteProfileId, [FromBody]CreateTasteProfileDTO tasteProfileToUpdate)
    {
        try
        {
            bool success = _tasteProfileDAO.UpdateTasteProfileById(tasteProfileId, tasteProfileToUpdate);
            if (!success) return StatusCode(500, "Taste profile could not be updated.");

            return NoContent(); // 204
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        
    }

    [HttpDelete("{tasteProfileId}")]
    public ActionResult DeleteTasteProfileById([FromRoute]int tasteProfileId)
    {
        try
        {
            bool success = _tasteProfileDAO.DeleteTasteProfileById(tasteProfileId);
            if (!success) return StatusCode(500, "Taste profile could not be deleted.");
            
            return NoContent(); // 204
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        
    }





}