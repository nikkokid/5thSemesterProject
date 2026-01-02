using Microsoft.AspNetCore.Mvc; 

using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.Controllers;
[ApiController]
[Route("api/v1/[Controller]")]
public class GrapesController : ControllerBase
{
    private readonly IGrapeDAO _grapeDAO;
    public GrapesController(IGrapeDAO grapeDAO)
    {
        _grapeDAO = grapeDAO;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var grapes = _grapeDAO.GetAllGrapes();
        return Ok(grapes);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var grape = _grapeDAO.GetGrapeById(id);
        if (grape == null)
        {
            return NotFound();
        }
        return Ok(grape);
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteById(int id)
    {
        var result = _grapeDAO.DeleteGrapeById(id);
        if (result == 0)
        {
            return NotFound();
        }
        return NoContent();
    }
    [HttpPatch("{id}")]
    public IActionResult UpdateById([FromBody] GrapeDTO grapeDTO, int id)
    {
        var result = _grapeDAO.UpdateGrapeById(grapeDTO, id);
        if (result == 0)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpPost]
    public IActionResult Create([FromBody] GrapeDTO grapeDTO)
    {
        var result = _grapeDAO.CreateGrape(grapeDTO);
        if (result == 0)
        {
            return BadRequest();
        }
        return CreatedAtAction(nameof(GetById), new { id = result }, grapeDTO);
    }
}