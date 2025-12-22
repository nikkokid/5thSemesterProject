using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAO;
using _5thSemesterProject.Backend.DAO.Models; 


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


    [HttpPost("Grape/{id}/Juice")]
    public ActionResult CreateJuiceWithGrapeId([FromBody]CreateJuiceDTO juiceDTO, [FromRoute]int grapeId)
    {
        try{
            bool success = _juiceDAO.CreateJuiceWithGrapeId(juiceDTO, grapeId);
            if(!success) return StatusCode(500, "Could not create juice");
            return NoContent();


        }catch(Exception ex)
        {
           return StatusCode(500, ex.Message); 
        }
    }

    [HttpGet("Grape/{id}/Juices")]
    public ActionResult<Juice[]> GetJuicesByGrapeId(int id)
    {
        try
        {
            var juices = _juiceDAO.GetJuicesByGrapeId(id).ToArray();
            //no if( juiices != null) check because .ToArray never returns null
            
            return Ok(juices);
            
        }
        catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}