using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class PlantingsController : ControllerBase
{
    IPlantingDAO _plantingDAO;

    public PlantingsController(IPlantingDAO plantingDAO)
    {
        _plantingDAO = plantingDAO;
    }

    [HttpGet]
    public IActionResult Get([FromQuery] int? plantingId)
    {
        if (plantingId.HasValue)
        {
            return Ok(_plantingDAO.GetPlantingByPlantingId(plantingId.Value));
        }

        return Ok(_plantingDAO.GetPlantings());
    }

    [HttpGet("GetPlantingsByGrapeRowId")]
    public IActionResult Get([FromQuery] int grapeRowId)
    {
        return Ok(_plantingDAO.GetPlantingsByGrapeRowId(grapeRowId));
    }

    [HttpPost]
    public IActionResult Create([FromBody] PlantingDTO planting)
    {
        return Ok(_plantingDAO.CreatePlanting(planting));
    }

    [HttpPatch]
    public IActionResult Update([FromQuery] int plantingId, [FromBody] PlantingDTO planting)
    {
        return Ok(_plantingDAO.UpdatePlanting(planting, plantingId));
    }

    [HttpDelete]
    public IActionResult Delete([FromQuery] int plantingId)
    {
        return Ok(_plantingDAO.DeletePlanting(plantingId));
    }
}