using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Application.DTOs.CreatePlayer;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;





namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IPlayerRepository
    {
        Task<List<PlayerDetails>> GetAllAsync();
        Task<PlayerDetails> GetPlayerByNameAsync(string name);
        Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails> UpdatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails> DeletePlayerAsync(string name);
    }
}
