using _5thSemesterProject.Backend.DAL.IDAO;
using _5thSemesterProject.Backend.DAL.DAO;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IJuiceDAO, JuiceDAO>();
builder.Services.AddScoped<ITasteProfileDAO, TasteProfileDAO>();
builder.Services.AddScoped<IHarvestDAO, HarvestDAO>();
builder.Services.AddScoped<IGrapeDAO, GrapeDAOStub>();
builder.Services.AddScoped<IAdditiveDAO, AdditiveDAO>();

// Allow Dapper to map snake_case database columns
// to camelCase C# property names
Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

/* ASP.NET Core takes c# properties and applies camelCase naming policy when serializing
   to JSON, by default. PropertyNamingPolicy = null;  makes the backend the single
   "source of truth" when it comes to JSON naming, so avoid breaking frontend contracts...
*/
builder.Services.AddControllers()
    .AddJsonOptions(options =>
  {
      options.JsonSerializerOptions.PropertyNamingPolicy = null;
  });


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


var app = builder.Build();
Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // serve Swagger UI at root
    });
}

app.MapControllers();

app.Run();

