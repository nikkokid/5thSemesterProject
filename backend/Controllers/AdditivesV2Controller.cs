using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class AdditivesV2Controller : ControllerBase
{
    IAdditiveDAOV2 _additiveDAO;

    public AdditivesV2Controller(IAdditiveDAOV2 additiveDAO)
    {
        _additiveDAO = additiveDAO;
    }
    
    [HttpGet]
    public IActionResult Get([FromQuery] int? additiveId)
    {
        if(additiveId.HasValue)
        {
            return Ok(_additiveDAO.GetAdditiveByAdditiveId(additiveId.Value));
        }
        return Ok(_additiveDAO.GetAdditives());
    }

    [HttpPost]
    public IActionResult Create([FromBody] AdditiveDTOV2 additive)
    {
        return Ok(_additiveDAO.CreateAdditive(additive));
    }

    [HttpPatch]
    public IActionResult Update([FromQuery] int additiveId, [FromBody] AdditiveDTOV2 additive)
    {
        return Ok(_additiveDAO.UpdateAdditive(additive, additiveId));
    }

    [HttpDelete]
    public IActionResult Delete([FromQuery] int additiveId)
    {
        return Ok(_additiveDAO.DeleteAdditive(additiveId));
    }
}