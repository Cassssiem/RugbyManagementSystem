using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Application.DTOs.PlayerDTOs;





namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IPlayerRepository
    {
        Task<List<PlayerDetails>> GetAllAsync();
        Task<PlayerDetails> GetPlayerByIdAsync(Guid playerId);
        Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails> UpdatePlayerAsync(PlayerDetails dto);
        Task<PlayerDetails> DeletePlayerAsync(Guid playerId);
    }
}
