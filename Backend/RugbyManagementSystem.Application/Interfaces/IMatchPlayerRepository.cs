using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IMatchPlayerRepository
    {
        Task<MatchPlayer?> GetAsync(Guid playerId, int matchId);

        Task<MatchPlayer> AddAsync(MatchPlayer matchPlayer);

        Task<MatchPlayer> UpdateAsync(MatchPlayer matchPlayer);

        Task DeleteAsync(MatchPlayer matchPlayer);

        Task<List<MatchPlayer>> GetPlayersByMatchAsync(int matchId);

        Task<List<MatchPlayer>> GetMatchesByPlayerAsync(Guid playerId);
    }
}
