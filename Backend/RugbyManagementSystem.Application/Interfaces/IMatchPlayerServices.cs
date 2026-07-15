using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IMatchPlayerServices
    {
        Task<MatchPlayer> AddPlayerToMatchAsync(Guid playerId, int matchId);

        Task<MatchPlayer?> UpdatePlayerMatchStatsAsync(UpdateMatchPlayerDto dto);

        Task<List<MatchPlayer>> GetPlayersByMatchAsync(int matchId);

        Task<List<MatchPlayer>> GetMatchesByPlayerAsync(Guid playerId);

        Task<bool> RemovePlayerFromMatchAsync(Guid playerId, int matchId);

    }
}
