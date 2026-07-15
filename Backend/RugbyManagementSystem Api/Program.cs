using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Application.Services;
using RugbyManagementSystem.Infastructure.Data;
using RugbyManagementSystem.Infastructure.Repository;


namespace RugbyManagementSystem_Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Controllers
            builder.Services.AddControllers()
     .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.ReferenceHandler =
             System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
     });

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Database
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")
                ));

            // Application Services
            // Services
            builder.Services.AddScoped<IPlayerServices, PlayerServices>();
            builder.Services.AddScoped<IMatchServices, MatchServices>();
            builder.Services.AddScoped<IMatchPlayerServices, MatchPlayerService>();

            // Repositories
            builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
            builder.Services.AddScoped<IMatchRepository, MatchRepository>();
            builder.Services.AddScoped<IMatchPlayerRepository, MatchPlayerRepository>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}