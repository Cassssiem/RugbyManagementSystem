using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.PlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Infastructure.Data;

namespace RugbyManagementSystem.Infastructure.Repository
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly AppDbContext _context;
        public PlayerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PlayerDetails?> GetPlayerByIdAsync(Guid Id)
        {
            return await _context.Players
                .FirstOrDefaultAsync(p => p.Id == Id);
        }

        public async Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player)
        {
            await _context.Players.AddAsync(player);

            await _context.SaveChangesAsync();

            return player;
        }
        public async Task<PlayerDetails?> DeletePlayerAsync(Guid playerId)
        {
            var player = await _context.Players
                .FirstOrDefaultAsync(p => p.Id == playerId);

            if (player == null)
                return null;

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }



        public async Task<List<PlayerDetails>> GetAllAsync()
        {
            return await _context.Players.ToListAsync();
        }



        public async Task<PlayerDetails> UpdatePlayerAsync(PlayerDetails player)
        {
            _context.Players.Update(player);

            await _context.SaveChangesAsync();

            return player;
        }


    }
}
