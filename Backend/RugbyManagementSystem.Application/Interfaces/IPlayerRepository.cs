using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Application.Data;
using RugbyManagementSystem.Application.DTOs.CreatePlayer;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;





namespace RugbyManagementSystem.Application.Interfaces
{
    internal interface IPlayerRepository
    {
        Task<PlayerDetails> GetServicesAsync();
        Task<PlayerDetails> GetServiceByIdAsync(int id);
        Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails> UpdatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails> DeletePlayerAsync(int Id);
    }
}
