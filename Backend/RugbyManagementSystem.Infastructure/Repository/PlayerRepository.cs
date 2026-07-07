using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.Data;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Domain.RepoInterfaces;
using RugbyManagementSystem.Domain.RepoInterfaces;

namespace RugbyManagementSystem.Infastructure.Repository
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly AppDbContext _context;
        public PlayerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player)
        {
            await _context.Players.AddAsync(player);
            await _context.SaveChangesAsync();

            return player;
        }

        public async Task<PlayerDetails> DeletePlayerAsync(int Id)
        {
            var player = await _context.Players.FindAsync(Id);

            if (player == null)
                return null;

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }

        public async Task<PlayerDetails> GetPlayerByIdAsync(int id)
        {
            var player = await _context.Players.FindAsync(id);
            return player;
        }

        public async Task<IEnumerable<PlayerDetails>> GetAllAsync()
        {
            return await _context.Players.ToListAsync();
        }



        public async Task<PlayerDetails?> UpdatePlayerAsync(PlayerDetails updatedPlayer)
        {
            var player = await _context.Players
                .FirstOrDefaultAsync(p => p.Id == updatedPlayer.Id);

            if (player == null)
                return null;

            player.Name = updatedPlayer.Name;
            player.Surname = updatedPlayer.Surname;
            player.Age = updatedPlayer.Age;
            player.Position = updatedPlayer.Position;

            await _context.SaveChangesAsync();

            return player;
        }
    }
}
