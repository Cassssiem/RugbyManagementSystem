using RugbyManagementSystem.Domain.Entities;






namespace RugbyManagementSystem.Domain.RepoInterfaces
{
    public interface IPlayerRepository
    {
        Task<IEnumerable<PlayerDetails>> GetAllAsync();
        Task<PlayerDetails?> GetPlayerByIdAsync(int id);
        Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails?> UpdatePlayerAsync(PlayerDetails player);
        Task<PlayerDetails?> DeletePlayerAsync(int id);

    }
}
