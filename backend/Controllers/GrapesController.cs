using Microsoft.AspNetCore.Mvc; 
using Dal.DAO;

[ApiController]
[Route("api/grapes")]
public class GrapesController : ControllerBase
{
    private readonly IGrapeDAO _grapeDAOStub;
    public GrapesController(IGrapeDAO grapeDAOStub)
    {
        _grapeDAOStub = grapeDAOStub;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_grapeDAOStub.GetAllGrapes());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var grape = _grapeDAOStub.GetGrapeById(id);
        if (grape == null)
        {
            return NotFound();
        }
        return Ok(grape);
    }
}
