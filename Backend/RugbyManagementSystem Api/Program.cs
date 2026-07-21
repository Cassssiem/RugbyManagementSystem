using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Application.Services;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Domain.Enums;
using RugbyManagementSystem.Infastructure.Data;
using RugbyManagementSystem.Infastructure.Repository;
using RugbyManagementSystem_Api.Middleware;
using System.Text;
using System.Text.Json.Serialization;


namespace RugbyManagementSystem_Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddScoped<TokenService>();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };

        // TEMP: log the exact reason validation is failing
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine($"AUTH FAILED: {context.Exception.GetType().Name} - {context.Exception.Message}");
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                Console.WriteLine($"CHALLENGE: {context.Error} - {context.ErrorDescription}");
                return Task.CompletedTask;
            }
        };
    });
            builder.Services.AddAuthorization();


            // must come before other middleware

            // Controllers
            builder.Services.AddControllers()
        .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.ReferenceHandler =
          System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;

         options.JsonSerializerOptions.Converters.Add(
           new JsonStringEnumConverter());
     });

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });

                options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Bearer", document)] = []
                });
            });

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
            builder.Services.AddScoped<IUserServices, UserServices>();

            // Repositories
            builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
            builder.Services.AddScoped<IMatchRepository, MatchRepository>();
            builder.Services.AddScoped<IMatchPlayerRepository, MatchPlayerRepository>();
            builder.Services.AddScoped<IUserRepository, UserRpository>();

            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
            builder.Services.AddProblemDetails();


            var app = builder.Build();

            app.UseExceptionHandler(); // must come before other middleware

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }



            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();

                if (!db.Users.Any(u => u.Role == UserRoles.Admin))
                {
                    db.Users.Add(new UserDetails
                    {
                        Username = "Gino",
                        Password = BCrypt.Net.BCrypt.HashPassword("TheGreatGino"),
                        Role = UserRoles.Admin
                    });

                    db.SaveChanges();
                }
            }


            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.Run();
        }
    }
}