using RugbyManagementSystem.Application.DTOs.UserDTOs;
using RugbyManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDetails>> GetAllUsersAsync();
        Task<UserDetails?> GetUserByIdAsync(int Id);
        Task<UserDetails> CreateUserAsync(UserDetails user);
        Task<UserDetails?> UpdateUserAsync(UserDetails user);
    }
}
