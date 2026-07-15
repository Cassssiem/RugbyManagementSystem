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
        Task<UserDetails?> GetUserByIdAsync(Guid Id);
        Task<UserDetails> CreateUserAsync(CreateUserDTOs user);
        Task<UserDetails?> UpdateUserAsync(UserDetails user);
        Task<UserDetails?> DeleteUserAsync(Guid Id);
    }
}
