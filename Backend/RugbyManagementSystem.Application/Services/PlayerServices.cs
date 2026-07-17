using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
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

            if (player == null)
                throw new ArgumentException(nameof(player));


            var newPlayer = new PlayerDetails
            {
                Name = player.Name,
                Age = player.Age,
                Surname = player.Surname,
                NickName = player.NickName,
                Position = player.Position,
                MatchesPlayed = player.MatchesPlayed,
                Tries = player.Tries,
                Conversion = player.Conversion
            };

            await _playerRepository.CreatePlayerAsync(newPlayer);

            return player;
        }



        public async Task<PlayerDetails?> GetPlayerByIdAsync(Guid playerId)
        {
            if (playerId == Guid.Empty)
                throw new ArgumentException("Please enter a Valid Id");
            var player = await _playerRepository.GetPlayerByIdAsync(playerId);
            return player;
        }


        public async Task<UpdatePlayerDTOs?> UpdatePlayerAsync(UpdatePlayerDTOs dto)
        {
            if (dto.Id == Guid.Empty)
                throw new ArgumentException("Please enter a Valid Id");

            var player = await _playerRepository.GetPlayerByIdAsync(dto.Id);

            if (player == null)
                return null;

            player.Name = dto.Name;
            player.Age = dto.Age;
            player.Surname = dto.Surname;
            player.NickName = dto.NickName;
            player.Position = dto.Position;
            player.MatchesPlayed = dto.MatchesPlayed;
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
                MatchesPlayed = player.MatchesPlayed,
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
            if (playerId == Guid.Empty)
                throw new ArgumentException("Please enter a Valid Id");

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
