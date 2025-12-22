using Microsoft.AspNetCore.Mvc;


using _5thSemesterProject.Backend.DAL.IDAO;

namespace _5thSemesterProject.Backend.Controllers;

    [ApiController]
    [Route("api/v1/[controller]")]
    public class HarvestsController : ControllerBase
    {
        IHarvestDAO _harvestDAO;

        public HarvestsController (IHarvestDAO harvestDAO)
        {
            _harvestDAO = harvestDAO;
        }
/*
        [HttpGet]
        public IActionResult Get(int grapeId)
        {
            return Ok(_harvestDAO.GetHarvestsByGrapeId(grapeId));
        }

        [HttpGet]
        public IActionResult Get([FromQuery] int grapeId)
        {
            return Ok(_harvestDAO.GetHarvestsByGrapeId(grapeId));
        }
*/
        [HttpGet]
        public IActionResult Get([FromQuery] int grapeId, [FromQuery] int? year)
        {
            if (year.HasValue)
            {
                return Ok(_harvestDAO.GetHarvestsByGrapeIdAndYear(grapeId, year.Value));
            }
            
            return Ok(_harvestDAO.GetHarvestsByGrapeId(grapeId));
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int harvestId)
        {
            return Ok(_harvestDAO.DeleteHarvestByHarvestId(harvestId));
        }
        
    }
