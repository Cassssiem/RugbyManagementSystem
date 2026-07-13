using Microsoft.VisualBasic;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using static RugbyManagementSystem.Application.Services.MatchPlayerService;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        public async Task AddPlayerToMatchAsync(string name, int matchId)
        {
            var player = await _playerRepository.GetPlayerByNameAsync(name);

            if (player == null)
                throw new Exception("Player not found.");

            var match = await _matchRepository.GetMatchByIdAsync(matchId);

            if (match == null)
                throw new Exception("Match not found.");

            await _matchPlayerRepository.AddPlayerToMatchAsync(name, matchId);
        }

        public Task RemovePlayerFromMatchAsync(string name, int matchId)
                => _matchPlayerRepository.RemovePlayerFromMatchAsync(name, matchId);

            public Task<IEnumerable<PlayerDetails>> GetPlayersForMatchAsync(int matchId)
                => _matchPlayerRepository.GetPlayersForMatchAsync(matchId);

            public Task<IEnumerable<MatchDetails>> GetMatchesForPlayerAsync(string name)
                => _matchPlayerRepository.GetMatchesForPlayerAsync(name);
        }
    }
