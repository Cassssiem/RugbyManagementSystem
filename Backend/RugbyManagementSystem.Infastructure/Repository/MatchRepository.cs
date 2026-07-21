using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.MatchDTOs;
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
        private static GetMatchDTO ToDto(MatchDetails m) => new GetMatchDTO
        {
            Id = m.Id,
            Opponent = m.Opponent,
            Date = m.Date,
            Location = m.Location,
            Titans = m.Titans,
            OpponentScore = m.OpponentScore
        };


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
