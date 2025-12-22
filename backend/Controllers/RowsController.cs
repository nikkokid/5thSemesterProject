using Microsoft.AspNetCore.Mvc;
using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.Model;
namespace _5thSemesterProject.Backend.Controllers;




[ApiController]
[Route("api/v1/[controller]")]
public class RowsController : ControllerBase
{
    GrapeRow? curRow;
    IRowDAO _rowDAO;
    /*
    Contructor for the RowsController class.
    Initializes a new instance of RowDAO for data access.
    */
    public RowsController(IRowDAO rowDAO)
    {
        _rowDAO = rowDAO;
    }

    /*
    Route: GET api/v1/Rows/{id}
    Retrieves a specific Row using its ID.
    Returns the Row object if found; otherwise, returns a 404 Not Found response.
    */
    [HttpGet("{id}")]
    public ActionResult<GrapeRow> GetRow(int id)
    {
        try
        {
            curRow = _rowDAO.GetRowById(id);
            if (curRow == null)
            {
                return NotFound($"Row with ID {id} not found.");
            }
            return Ok(curRow);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /*
    Route: GET api/v1/Rows
    Retrieves all Rows from the database.
    */
    [HttpGet]
    public ActionResult<IEnumerable<GrapeRow>> GetAllRows()
    {
        try
        {
            List<GrapeRow> rows = new List<GrapeRow>();
            rows = (List<GrapeRow>)_rowDAO.GetAllRows();
            return Ok(rows);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    /*
    Route: POST api/v1/Rows
    Save a new Row to database.
    Returning the ID of the new Row.
    */
    [HttpPost]
    public ActionResult<int> CreateRow([FromBody] GrapeRow row)
    {
        try
        {
            int createdRowId = _rowDAO.CreateRow(row);
            return Ok(createdRowId);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    /*
    Route: PUT api/v1/Rows/{id}
    Updates an existing Row in the database.
    */
    [HttpPut("{id}")]
    public ActionResult<int> UpdateRow([FromRoute]int id, [FromBody] GrapeRow row)
    {
        try
        {
            _rowDAO.UpdateRow(row, id);
            if(_rowDAO.GetRowById(id) == row)
            {
                return Ok(id);
            }
            return NotFound(id);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    /*
    Route: DELETE api/v1/Rows/{id}
    Deletes a Row from the database using its ID.
    */
    [HttpDelete("{id}")]
    public ActionResult DeleteRow(int id)
    {
        try
        {
            bool isDeleted = _rowDAO.DeleteRow(id);
            if (isDeleted)
            {
                return Ok(id);
            }
            else
            {
                return NotFound(id);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}