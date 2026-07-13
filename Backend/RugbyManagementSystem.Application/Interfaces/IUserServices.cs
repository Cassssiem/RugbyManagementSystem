using RugbyManagementSystem.Application.DTOs.UserDTOs;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IUserServices
    {
        Task<IEnumerable<UserDetails>> GetAllUsersAsync();
        Task<UserDetails?> GetUserByIdAsync(int Id);
        Task<UserDetails> CreateUserAsync(CreateUserDTOs User);
        Task<UserDetails?> UpdateUserAsync(UserDetails Id);
    }
}
