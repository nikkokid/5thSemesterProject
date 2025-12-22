using Npgsql;
namespace _5thSemesterProject.Backend.DAL.DAO;

public abstract class BaseDAO
{
    protected string _connectionstring;
    protected NpgsqlConnection _connection;

    protected BaseDAO(string connectionstring) => _connectionstring = connectionstring;

    protected NpgsqlConnection CreateConnection() => _connection = new NpgsqlConnection(_connectionstring);
}