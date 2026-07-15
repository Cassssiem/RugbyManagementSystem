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

        public async Task<MatchDetails> CreateMatchAsync(MatchDetails match)
        {
            await _context.Matches.AddAsync(match);

            await _context.SaveChangesAsync();

            return match;
        }

        public async Task<List<MatchDetails>> GetAllAsync()
        {
            return await _context.Matches.ToListAsync();
        }

        public async Task<MatchDetails?> GetMatchByIdAsync(int Id)
        {
            return await _context.Matches.FindAsync(Id);
        }

        public async Task<MatchDetails> UpdateMatchAsync(MatchDetails match)
        {
            _context.Matches.Update(match);

            await _context.SaveChangesAsync();

            return match;
        }
    }
}
