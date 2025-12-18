using _5thSemesterProject.backend.dal;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddScoped<IHarvestDAO, HarvestDAO>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors();

app.MapControllers();

app.Run();

