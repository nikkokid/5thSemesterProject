using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class AdditiveLinesController : ControllerBase
{
    IAdditiveLineDAO _additiveLineDAO;

    public AdditiveLinesController(IAdditiveLineDAO additiveLineDAO)
    {
        _additiveLineDAO = additiveLineDAO;
    }
    
    [HttpGet]
    public IActionResult Get([FromQuery] int? additiveLineId)
    {
        if(additiveLineId.HasValue)
        {
            return Ok(_additiveLineDAO.GetAdditiveLineByAdditiveLineId(additiveLineId.Value));
        }
        return Ok(_additiveLineDAO.GetAdditiveLines());
    }

    [HttpGet("GetAdditiveLinesByJuiceId")]
    public IActionResult Get([FromQuery] int juiceId)
    {
        return Ok(_additiveLineDAO.GetAdditiveLineByJuiceId(juiceId));
    }

    [HttpPost]
    public IActionResult Create([FromBody] AdditiveLineDTO additiveLine)
    {
        return Ok(_additiveLineDAO.CreateAdditiveLine(additiveLine));
    }

    [HttpPatch]
    public IActionResult Update([FromQuery] int additiveLineId, [FromBody] AdditiveLineDTO additiveLine)
    {
        return Ok(_additiveLineDAO.UpdateAdditiveLine(additiveLine, additiveLineId));
    }

    [HttpDelete]
    public IActionResult Delete([FromQuery] int additiveLineId)
    {
        return Ok(_additiveLineDAO.DeleteAdditiveLine(additiveLineId));
    }
}