using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IMatchPlayerServices
    {
        Task AddPlayerToMatchAsync(string name, int matchId);
        Task RemovePlayerFromMatchAsync(string name, int matchId);
        Task<IEnumerable<PlayerDetails>> GetPlayersForMatchAsync(int matchId);
        Task<IEnumerable<MatchDetails>> GetMatchesForPlayerAsync(string name);
    }
}
