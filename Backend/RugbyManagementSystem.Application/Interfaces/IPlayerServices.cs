

using RugbyManagementSystem.Application.DTOs.CreatePlayer;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Domain.Entities;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IPlayerServices
    {
        Task<IEnumerable<PlayerDetails>> GetAllPlayersAsync();
        Task<PlayerDetails> GetPlayerByIdAsync(string name);
        Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails> UpdatePlayerAsync(PlayerDetails player);
        Task<string> DeletePlayerAsync(string name);
    }
}
