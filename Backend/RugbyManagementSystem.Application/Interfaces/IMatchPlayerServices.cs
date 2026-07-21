using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Domain.Enums;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IMatchPlayerServices
    {
        Task<MatchPlayer> AddPlayerToMatchAsync(Guid playerId, int matchId, AddMatchPlayerDTO dto);
        Task<MatchPlayer> UpdatePlayerMatchStatsAsync(UpdateMatchPlayerDto dto);
        Task<MatchPLayerDTO?> GetPlayerMatchAsync(Guid playerId, int matchId);
        Task<List<GetMatchPLayerDTO>> GetPlayersByMatchAsync(int matchId);
        Task<List<GetMatchPLayerDTO>> GetMatchesByPlayerAsync(Guid playerId);
        Task<bool> RemovePlayerFromMatchAsync(Guid playerId, int matchId);
        Task<List<MatchPLayerDTO>> GetPlayersByMatchAndTeamAsync(int matchId, Teams team);
    }
}