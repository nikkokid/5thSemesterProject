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

    [HttpPost("{id}/Additive")]
    public ActionResult CreateAdditiveWithJuiceId([FromBody]CreateAdditiveDTO createAdditiveDTO, [FromRoute]int id)
    {
        try
        {
            bool success = _additiveDAO.CreateAdditiveWithJuiceId(createAdditiveDTO, id);
            
            if(!success) return StatusCode(500, "Could not create additive.");
            return NoContent();

        }catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{juiceId}/Additives")]
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
}