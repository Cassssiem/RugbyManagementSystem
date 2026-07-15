using Microsoft.Identity.Client.Utils;
using RugbyManagementSystem.Application.DTOs.MatchDTOs;
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

        public async Task<CreateMatchDTOs> CreateMatchAsync(CreateMatchDTOs match)
        {
            var newMatchDetails = new MatchDetails
            {
                Opponent = match.Opponent,
                Date = match.Date,
                Location = match.Location,
                Titans = match.Titans,
                OpponentScore = match.OpponentScore
            };

            var createdMatch = await _matchRepository.CreateMatchAsync(newMatchDetails);

            return new CreateMatchDTOs
            {
                Opponent = createdMatch.Opponent,
                Date = createdMatch.Date,
                Location = createdMatch.Location,
                Titans = createdMatch.Titans,
                OpponentScore = createdMatch.OpponentScore
            };
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

        public async Task<UpdateMatchDTOs?> UpdateMatchAsync(UpdateMatchDTOs dto)
        {
            var match = await _matchRepository.GetMatchByIdAsync(dto.Id);

            if (match == null)
                return null;


            match.Opponent = dto.Opponent;
            match.Date = dto.Date;
            match.Location = dto.Location;
            match.Titans = dto.Titans;
            match.OpponentScore = dto.OpponentScore;


            var updatedMatch = await _matchRepository.UpdateMatchAsync(match);


            return new UpdateMatchDTOs
            {
                Id = updatedMatch.Id,
                Opponent = updatedMatch.Opponent,
                Date = updatedMatch.Date,
                Location = updatedMatch.Location,
                Titans = updatedMatch.Titans,
                OpponentScore = updatedMatch.OpponentScore
            };
        }
    }
}
