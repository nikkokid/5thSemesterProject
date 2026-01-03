using Microsoft.AspNetCore.Mvc; 

using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.Controllers;
[ApiController]
[Route("api/v1/[Controller]")]
public class WinesController : ControllerBase
{
    private readonly IWineDAO _wineDAO;
    public WinesController(IWineDAO wineDAO)
    {
        _wineDAO = wineDAO;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var wines = _wineDAO.GetAllWines();
        return Ok(wines);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var wine = _wineDAO.GetWineById(id);
        if (wine == null)
        {
            return NotFound();
        }
        return Ok(wine);
    }

    [HttpPost]
    public IActionResult CreateWine(WineDTO wineDTO)
    {
        var wineId = _wineDAO.CreateWine(wineDTO);
        if (wineId == 0)
        {
            return BadRequest("Invalid wine data or percentage sum is not 100.");
        }
        return CreatedAtAction(nameof(GetById), new { id = wineId }, wineId);
    }
}