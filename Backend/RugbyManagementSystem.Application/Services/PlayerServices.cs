using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.PlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;

namespace RugbyManagementSystem.Application.Services
{
        public class PlayerServices : IPlayerServices
        {
            private readonly IPlayerRepository _playerRepository;
        public PlayerServices(IPlayerRepository playerRepository)
            {
            _playerRepository = playerRepository;
            }

        public async Task<CreatePlayerDTOs> CreatePlayerAsync(CreatePlayerDTOs player)
        {
            var newPlayer = new PlayerDetails
            {
                Name = player.Name,
                Age = player.Age,
                Surname = player.Surname,
                NickName = player.NickName,
                Position = player.Position,
                Tries = player.Tries,
                Conversion = player.Conversion
            };

            await _playerRepository.CreatePlayerAsync(newPlayer);

            return player;
        }



        public async Task<PlayerDetails?> GetPlayerByIdAsync(Guid playerId)
        {
            var player = await _playerRepository.GetPlayerByIdAsync(playerId);
            return player;
        }


        public async Task<UpdatePlayerDTOs?> UpdatePlayerAsync(UpdatePlayerDTOs dto)
        {
            var player = await _playerRepository.GetPlayerByIdAsync(dto.Id);

            if (player == null)
                return null;

            player.Name = dto.Name;
            player.Age = dto.Age;
            player.Surname = dto.Surname;
            player.NickName = dto.NickName;
            player.Position = dto.Position;
            player.Tries = dto.Tries;
            player.Conversion = dto.Conversion;

            await _playerRepository.UpdatePlayerAsync(player);

            return new UpdatePlayerDTOs
            {
                Id = player.Id,
                Name = player.Name,
                Age = player.Age,
                Surname = player.Surname,
                NickName = player.NickName,
                Position = player.Position,
                Tries = player.Tries,
                Conversion = player.Conversion
            };
        }

        public async Task<IEnumerable<PlayerDetails>> GetAllPlayersAsync()
        {
            return await _playerRepository.GetAllAsync();
        }

        public async Task<DeletePlayerDTO?> DeletePlayerAsync(Guid playerId)
        {
            var player = await _playerRepository.GetPlayerByIdAsync(playerId);

            if (player == null)
                return null;

            await _playerRepository.DeletePlayerAsync(playerId);

            return new DeletePlayerDTO
            {
                Id = player.Id,
                Name = player.Name,
                Surname = player.Surname
            };
        }


    }
}
