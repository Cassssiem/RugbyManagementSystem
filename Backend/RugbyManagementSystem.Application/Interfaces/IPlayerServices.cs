

using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.PlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Domain.Entities;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IPlayerServices
    {
        Task<IEnumerable<PlayerDetails>> GetAllPlayersAsync();
        Task<PlayerDetails> GetPlayerByIdAsync(Guid playerId);
        Task<CreatePlayerDTOs> CreatePlayerAsync(CreatePlayerDTOs player);
        Task<UpdatePlayerDTOs> UpdatePlayerAsync(UpdatePlayerDTOs dto);
        Task<DeletePlayerDTO> DeletePlayerAsync(Guid playerId);
    }
}
