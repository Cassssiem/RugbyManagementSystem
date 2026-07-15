using RugbyManagementSystem.Application.DTOs.MatchDTOs;
using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IMatchServices
    {
        Task<IEnumerable<MatchDetails>> GetAllAsync();
        Task<MatchDetails?> GetMatchByIdAsync(int Id);
        Task<CreateMatchDTOs> CreateMatchAsync(CreateMatchDTOs Match);
        Task<UpdateMatchDTOs?> UpdateMatchAsync(UpdateMatchDTOs dto );

    }
}
