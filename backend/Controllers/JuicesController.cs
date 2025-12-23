using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class JuicesController : ControllerBase
{

    private IJuiceDAO _juiceDAO;

    public JuicesController(IJuiceDAO juiceDAO)
    {
        _juiceDAO = juiceDAO;
    }


    [HttpPost("{id}/Juice")]
    public ActionResult CreateJuiceWithGrapeId([FromBody]CreateJuiceDTO juiceDTO, [FromRoute]int id)
    {
        try{
            bool success = _juiceDAO.CreateJuiceWithGrapeId(juiceDTO, id);
            if(!success) return StatusCode(500, "Could not create juice");
            return NoContent();


        }catch(Exception ex)
        {
           return StatusCode(500, ex.Message); 
        }
    }
    // This method might now be needed
    [HttpGet("Juice/{id}")]
    public ActionResult<Juice> GetJuiceById([FromRoute]int id)
    {
        try
        {
            var juice = _juiceDAO.GetJuiceById(id);
            if( juice != null) return StatusCode(500, $"Juice with id {id} could not be found.");
            
            return Ok(juice);
            
        }
        catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{id}/Juices")]
    public ActionResult<Juice[]> GetJuicesByGrapeId([FromRoute]int id)
    {
        try
        {
            var juices = _juiceDAO.GetJuicesByGrapeId(id).ToArray();
            //no if( juices != null) check because .ToArray never returns null
            
            return Ok(juices);
            
        }
        catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPatch("{id}/Juice")]
    public ActionResult UpdateJuiceById([FromRoute]int id, [FromBody]CreateJuiceDTO juiceDTO)
    {
        try
        {
            bool success = _juiceDAO.UpdateJuiceById(id, juiceDTO);
            if (!success) return StatusCode(500, $"Juice could not be updated with Juice Id: {id}");

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [HttpDelete("{id}/Juice")]
    public ActionResult DeleteJuiceById([FromRoute]int id)
    {
        try
        {
            bool success = _juiceDAO.DeleteJuiceById(id);
            if (!success) return StatusCode(500, $"Juice could not be deleted with Juice Id: {id}");

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    
    
}