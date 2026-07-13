using RugbyManagementSystem.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<PlayerDetails> CreatePlayerAsync(PlayerDetails player)
        {
            var newPlayer = new PlayerDetails
            {
                Name = player.Name,
                Age = player.Age,
                Surname = player.Surname,
                NickName = player.NickName,
                Position = player.Position,
                Tries = player.Tries,
                Conversion = player.Conversion,


            };
            await _playerRepository.CreatePlayerAsync(newPlayer);
            return newPlayer ;

        }

       

        public async Task<PlayerDetails?> GetPlayerByIdAsync(string name)
        {
            var player = await _playerRepository.GetPlayerByNameAsync(name);
            return player;
        }


        public async Task<PlayerDetails?> UpdatePlayerAsync(PlayerDetails dto)
        {
            var player = await _playerRepository.GetPlayerByNameAsync(dto.Name);

            if (player == null)
                return null;

            player.Name = dto.Name;
            player.Age = dto.Age;
            player.Surname = dto.Surname;
            player.NickName = dto.NickName;
            player.Position = dto.Position;
            player.Tries = dto.Tries;
            player.Conversion = dto.Conversion;

           
            return player;
        }

        public async Task<IEnumerable<PlayerDetails>> GetAllPlayersAsync()
        {
            return await _playerRepository.GetAllAsync();
        }

        public async Task<string> DeletePlayerAsync(string name)
        {
            var player = await _playerRepository.GetPlayerByNameAsync(name);

            if (player == null)
                return "Player not found";

            await _playerRepository.DeletePlayerAsync(name);

            return "Player Deleted";
        }


    }
}
