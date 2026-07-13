using RugbyManagementSystem.Application.DTOs.MatchDTOs;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IMatchServices
    {
        Task<List<MatchDetails>> GetAllAsync();
        Task<MatchDetails?> GetMatchByIdAsync(int Id);
        Task<MatchDetails> CreateMatchAsync(MatchDetails Match);
        Task<MatchDetails?> UpdateMatchAsync(int  Id );
    }
}
