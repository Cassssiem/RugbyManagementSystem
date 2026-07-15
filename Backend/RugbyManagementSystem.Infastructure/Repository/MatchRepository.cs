using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Infastructure.Data;
using System.Numerics;

namespace RugbyManagementSystem.Infastructure.Repository
{
    public class MatchRepository : IMatchRepository
    {
        private readonly AppDbContext _context;
        public MatchRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MatchDetails> CreateMatchAsync(MatchDetails Match)
        {
            var newmatch = new MatchDetails
            {
                Opponent = Match.Opponent,
                Date = DateTime.Now,

                Location = Match.Location,
                Titans = Match.Titans,
                OpponentScore = Match.OpponentScore,

            };

            await _context.Matches.AddAsync(newmatch);
            await _context.SaveChangesAsync();

            return newmatch;
        }

        public async Task<List<MatchDetails>> GetAllAsync()
        {
            return await _context.Matches.ToListAsync();
        }

        public async Task<MatchDetails?> GetMatchByIdAsync(int Id)
        {
            return await _context.Matches.FindAsync(Id);
        }

        public async Task<MatchDetails?> UpdateMatchAsync(MatchDetails updatedMatch)
        {
            var match = await _context.Matches.FirstOrDefaultAsync(
                p => p.Id == updatedMatch.Id);

            if (match == null)
                return null;

            match.Opponent = updatedMatch.Opponent;

            match.Location = updatedMatch.Location;
            match.Titans = updatedMatch.Titans;
            match.OpponentScore = updatedMatch.OpponentScore;

            await _context.SaveChangesAsync();
            return match;
        }
    }
}
