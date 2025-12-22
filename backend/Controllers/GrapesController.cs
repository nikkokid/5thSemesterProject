using Microsoft.AspNetCore.Mvc; 

using _5thSemesterProject.Backend.DAL.IDAO;


namespace _5thSemesterProject.Backend.Controllers;
[ApiController]
[Route("api/v1/[Controller]")]
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
