
using RugbyManagementSystem.Application.Data;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.CreatePlayer;
using RugbyManagementSystem.Domain.Entities;

namespace RugbyManagementSystem.Application.Services
{
    public class PlayerServices : IPlayerServices
    {
        private readonly AppDbContext _context; 
        public PlayerServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player)
        {
            var newPlayer = new PlayerDetails
            {
                Id = player.Id,
                Name = player.Name,
                Age = player.Age,
                Surname = player.Surname,
                Position = player.Position,


            };
            await _context.AddAsync(newPlayer);
            await _context.SaveChangesAsync();
            return newPlayer ;

        }

       

        public async Task<PlayerDetails> GetPlayerByIdAsync(int id)
        {
            var player = await _context.Players.FindAsync(id);
            return player;
        }


        public async Task<PlayerDetails> UpdatePlayerAsync(PlayerDetails dto)
        {
            var player = await _context.Players.FindAsync(dto.Id);

            if (player == null)
                return null;

            player.Name = dto.Name;
            player.Age = dto.Age;
            player.Surname = dto.Surname;
            player.Position = dto.Position;

            await _context.SaveChangesAsync();
            return player;
        }

        public async Task<IEnumerable<PlayerDetails>> GetAllPlayersAsync()
        {
            return await _context.Players.ToListAsync();
        }

        public async Task<string> DeletePlayerAsync(int Id)
        {
            var player = await _context.Players.FindAsync(Id );
            _context.Remove(player);
            return "Player Deleted";
        }
    }
}
