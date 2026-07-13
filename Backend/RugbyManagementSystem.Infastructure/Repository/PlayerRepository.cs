using Microsoft.EntityFrameworkCore;
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

        public async Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player)
        {
            var newPlayer = new PlayerDetails
            {
                Name = player.Name,
                Surname = player.Surname,
                NickName = player.NickName,
                Position = player.Position,
                Tries = player.Tries,
                Conversion = player.Conversion,
            };

            await _context.Players.AddAsync(newPlayer);
            await _context.SaveChangesAsync();

            return newPlayer;
        }

        public async Task<PlayerDetails?> DeletePlayerAsync(string name)
        {
            var player = await _context.Players.FindAsync(name);

            if (player == null)
                return null;

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }

        public async Task<PlayerDetails?> GetPlayerByNameAsync(string name)
        {
            return await _context.Players.FindAsync(name);
        }

        public async Task<List<PlayerDetails>> GetAllAsync()
        {
            return await _context.Players.ToListAsync();
        }



        public async Task<PlayerDetails?> UpdatePlayerAsync(PlayerDetails updatedPlayer)
        {
            var player = await _context.Players
                .FirstOrDefaultAsync(p => p.Name == updatedPlayer.Name);

            if (player == null)
                return null;

            player.Name = updatedPlayer.Name;
            player.Surname = updatedPlayer.Surname;
            player.Age = updatedPlayer.Age;
            player.NickName = updatedPlayer.NickName;
            player.Position = updatedPlayer.Position;
            player.Tries = updatedPlayer.Tries;
            player.Conversion = updatedPlayer.Conversion;

            await _context.SaveChangesAsync();

            return player;
        }


    }
}
