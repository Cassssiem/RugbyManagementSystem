using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;

namespace RugbyManagementSystem.Application.Services
{
    public class MatchPlayerService : IMatchPlayerServices
    {
        private readonly IMatchPlayerRepository _matchPlayerRepository;
        private readonly IPlayerRepository _playerRepository;
        private readonly IMatchRepository _matchRepository;

        public MatchPlayerService(
            IMatchPlayerRepository matchPlayerRepository,
            IPlayerRepository playerRepository,
            IMatchRepository matchRepository)
        {
            _matchPlayerRepository = matchPlayerRepository;
            _playerRepository = playerRepository;
            _matchRepository = matchRepository;
        }

        public async Task<MatchPlayer> AddPlayerToMatchAsync(Guid playerId, int matchId)
        {
            var player = await _playerRepository.GetPlayerByIdAsync(playerId);

            if (player == null)
                throw new Exception("Player not found.");

            var match = await _matchRepository.GetMatchByIdAsync(matchId);

            if (match == null)
                throw new Exception("Match not found.");

            var existing = await _matchPlayerRepository.GetPlayerMatchAsync(playerId, matchId);

            if (existing != null)
                throw new Exception("Player is already assigned to this match.");

            var matchPlayer = new MatchPlayer
            {
                PlayerId = playerId,
                MatchId = matchId,
                Tries = 0,
                Conversions = 0
            };

            return await _matchPlayerRepository.AddAsync(matchPlayer);
        }

        public async Task<MatchPlayer> UpdatePlayerMatchStatsAsync(UpdateMatchPlayerDto dto)
        {
            var matchPlayer = await _matchPlayerRepository
                .GetPlayerMatchAsync(dto.PlayerId, dto.MatchId);

            if (matchPlayer == null)
                throw new KeyNotFoundException(
                    "Player is not assigned to this match.");

            if (dto.Tries < 0 || dto.Conversions < 0)
                throw new ArgumentException(
                    "Tries and conversions cannot be negative.");

            matchPlayer.Tries = dto.Tries;
            matchPlayer.Conversions = dto.Conversions;

            return await _matchPlayerRepository.UpdateAsync(matchPlayer);
        }

        public async Task<List<MatchPlayer>> GetPlayersByMatchAsync(int matchId)
        {
            if (matchId < 0)
                throw new ArgumentOutOfRangeException("Please enter a valid match Id");


            return await _matchPlayerRepository.GetPlayersByMatchAsync(matchId);
        }

        public async Task<List<MatchPlayer>> GetMatchesByPlayerAsync(Guid playerId)
        {
            if (playerId == Guid.Empty)
                throw new NullReferenceException("Please enter a valid Id");

            return await _matchPlayerRepository.GetMatchesByPlayerAsync(playerId);
        }

        public async Task<bool> RemovePlayerFromMatchAsync(Guid playerId, int matchId)
        {
            var matchPlayer = await _matchPlayerRepository.GetPlayerMatchAsync(playerId, matchId);

            if (matchPlayer == null)
                return false;

            await _matchPlayerRepository.DeleteAsync(matchPlayer);

            return true;
        }
    }
}
    
