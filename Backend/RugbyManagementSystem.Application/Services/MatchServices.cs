using Microsoft.Identity.Client.Utils;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Numerics;
using System.Text;
using System.Text.RegularExpressions;

namespace RugbyManagementSystem.Application.Services
{
    public class MatchServices : IMatchServices
    {
        private readonly IMatchRepository _matchRepository;

        public MatchServices(IMatchRepository matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public async Task<MatchDetails> CreateMatchAsync(MatchDetails Match)
        {
            var newmatchDetails = new MatchDetails
            {
                Opponent = Match.Opponent,
                Date = Match.Date,
                Location = Match.Location,
                Score = Match.Score,
                PlayerWhoScored = Match.PlayerWhoScored,
                PlayerWhoConverted = Match.PlayerWhoConverted,
            };

            await _matchRepository.CreateMatchAsync(newmatchDetails);
            return newmatchDetails;
        }

        public async Task<IEnumerable<MatchDetails>> GetAllAsync()
        {
            return await _matchRepository.GetAllAsync();
        }

        public async Task<MatchDetails?> GetMatchByIdAsync(int Id)
        {
            var match = await _matchRepository.GetMatchByIdAsync(Id);
            return match;
        }

        public async Task<MatchDetails?> UpdateMatchAsync(MatchDetails dto)
        {
            var match = await _matchRepository.GetMatchByIdAsync(dto.Id);

            if (match == null)
                return null;

            {
                match.Opponent = dto.Opponent,
                match.Date = dto.Date,
                match.Location = dto.Location,
                match.Score = dto.Score,
                match.PlayerWhoScored = dto.PlayerWhoScored,
                match.PlayerWhoConverted = dto.PlayerWhoConverted,
            }


            return match;
        }
    }
}
