using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;

namespace _5thSemesterProject.Backend.Controllers;


[Route("api/v1/[controller]")]
[ApiController]
public class AdditivesController : ControllerBase
{

    private IAdditiveDAO _additiveDAO;

    public AdditivesController(IAdditiveDAO additiveDAO)
    {
        _additiveDAO = additiveDAO;
    }

    [HttpPost("{juiceId}")]
    public ActionResult CreateAdditiveWithJuiceId([FromBody]CreateAdditiveDTO createAdditiveDTO, [FromRoute]int juiceId)
    {
        try
        {
            bool success = _additiveDAO.CreateAdditiveForJuice(createAdditiveDTO, juiceId);
            
            if(!success) return StatusCode(500, "Could not create additive.");
            return NoContent();

        }catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{juiceId}")]
    public ActionResult<Additive[]> GetAdditivesByJuiceId([FromRoute] int juiceId)
    {
        try
        {
            var additives = _additiveDAO.GetAdditivesByJuiceId(juiceId).ToArray();

            return Ok(additives);

        }catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPatch("{additiveId}")]
    public ActionResult UpdateAdditiveById([FromRoute]int additiveId, [FromBody]CreateAdditiveDTO additiveToUpdate)
    {
        try
        {
            bool success = _additiveDAO.UpdateAdditiveById(additiveId, additiveToUpdate);
            if (!success) return StatusCode(500, "Additive could not be updated.");
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("{additiveId}")]
    public ActionResult DeleteAdditiveById([FromRoute]int additiveId)
    {
        try
        {
            bool success = _additiveDAO.DeleteAdditiveById(additiveId);
            if (!success) return StatusCode(500, "Additive could not be deleted.");

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}