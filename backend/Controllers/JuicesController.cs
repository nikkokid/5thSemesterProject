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

    [HttpGet("{id}/{year}")]
    public ActionResult<Juice[]> GetJuicesByGrapeIdAndYear([FromRoute]int id, [FromRoute]int? year)
    {
        try
        {
            if (year.HasValue)
            {
                return Ok(_juiceDAO.GetJuicesByGrapeIdAndYear(id, year.Value).ToArray());    
            }
            
            return Ok(_juiceDAO.GetJuicesByGrapeId(id).ToArray());
            
        }
        catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPatch("{id}")]
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
                
    [HttpDelete("{id}")]
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
    
    

    [HttpGet]
    public IActionResult GetJuicesByGrapes([FromQuery] int[] grapeIds)
    {
    var juices = _juiceDAO.GetJuicesByGrapeIds(grapeIds);
    return Ok(juices);
    }

}