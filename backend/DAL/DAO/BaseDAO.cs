using Npgsql;
namespace _5thSemesterProject.Backend.DAL.DAO;

public abstract class BaseDAO 
{
    protected IConfiguration _configuration;

    protected BaseDAO(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected NpgsqlConnection CreateConnection()
    {
        return new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }
}

