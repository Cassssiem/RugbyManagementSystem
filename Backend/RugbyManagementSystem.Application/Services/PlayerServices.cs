using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.PlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Application.Interfaces;

namespace RugbyManagementSystem.Application.Services
{
    public class PlayerServices : IPlayerServices
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerServices(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<List<GetPlayerDTO>> GetAllPlayersAsync()
        {
            return await _playerRepository.GetAllAsync();
        }

        public async Task<GetPlayerDTO?> GetPlayerByIdAsync(Guid playerId)
        {
            if (playerId == Guid.Empty)
                throw new ArgumentException("Please enter a valid player Id.");

            return await _playerRepository.GetPlayerByIdAsync(playerId);
        }

        public async Task<GetPlayerDTO> CreatePlayerAsync(CreatePlayerDTOs player)
        {
            if (string.IsNullOrWhiteSpace(player.Name))
                throw new ArgumentException("Please enter a player name.");

            if (player.Age < 18)
                throw new ArgumentException(
                    "Player has to be over 18 to be registered as a senior.");

            var newPlayer = new GetPlayerDTO
            {
                Name = player.Name,
                Surname = player.Surname,
                NickName = player.NickName,
                Age = player.Age,
                Position = player.Position,
                ImageUrl = player.ImageUrl,
                MatchesPlayed = 0,
                Tries = 0,
                Conversions = 0
            };

            return await _playerRepository.CreatePlayerAsync(newPlayer);
        }

        public async Task<GetPlayerDTO?> UpdatePlayerAsync(
            Guid playerId,
            UpdatePlayerDTOs player)
        {
            if (playerId == Guid.Empty)
                throw new ArgumentException("Please enter a valid player Id.");

            var existing = await _playerRepository.GetPlayerByIdAsync(playerId);

            if (existing == null)
                return null;

            existing.Name = player.Name;
            existing.Surname = player.Surname;
            existing.NickName = player.NickName;
            existing.ImageUrl = player.ImageUrl;
            existing.Age = player.Age;
            existing.Position = player.Position;

            // MatchesPlayed, Tries and Conversions are intentionally
            // not changed here because they are calculated from
            // MatchPlayer records.

            return await _playerRepository.UpdatePlayerAsync(existing);
        }

        public async Task<bool> DeletePlayerAsync(Guid playerId)
        {
            if (playerId == Guid.Empty)
                throw new ArgumentException("Please enter a valid player Id.");

            var player = await _playerRepository.GetPlayerByIdAsync(playerId);

            if (player == null)
                return false;

            await _playerRepository.DeletePlayerAsync(playerId);

            return true;
        }
    }
}