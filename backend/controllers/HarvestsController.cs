using Microsoft.AspNetCore.Mvc;
using Dapper;
using Npgsql;
using _5thSemesterProject.backend.dal;

namespace backend.controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class HarvestsController : ControllerBase
    {
        IHarvestDAO _harvestDAOStub;

        public HarvestsController (IHarvestDAO harvestDAOStub)
        {
            _harvestDAOStub = harvestDAOStub;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_harvestDAOStub.GetHarvests());
        }
    }
}