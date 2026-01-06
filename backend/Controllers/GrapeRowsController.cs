using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;


namespace _5thSemesterProject.Backend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class GrapeRowsController : ControllerBase
{
    IGrapeRowDAO _grapeRowDAO;

    public GrapeRowsController(IGrapeRowDAO grapeRowDAO)
    {
        _grapeRowDAO = grapeRowDAO;
    }

    [HttpGet]
    public IActionResult Get([FromQuery] int? grapeRowId)
    {
        if(grapeRowId.HasValue)
        {
            return Ok(_grapeRowDAO.GetGrapeRowByGrapeRowId(grapeRowId.Value));
        }
        return Ok(_grapeRowDAO.GetGrapeRows());
    }

    [HttpPost]
    public IActionResult Create([FromBody] GrapeRowDTO grapeRow)
    {
        return Ok(_grapeRowDAO.CreateGrapeRow(grapeRow));
    }

    [HttpPatch]
    public IActionResult Update([FromQuery] int grapeRowId, [FromBody] GrapeRowDTO grapeRow)
    {
        return Ok(_grapeRowDAO.UpdateGrapeRow(grapeRow, grapeRowId));
    }

    [HttpDelete]
    public IActionResult Delete([FromQuery] int grapeRowId)
    {
        return Ok(_grapeRowDAO.DeleteGrapeRow(grapeRowId));
    }
}