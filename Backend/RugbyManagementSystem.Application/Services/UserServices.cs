using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.UserDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using System.Numerics;

namespace RugbyManagementSystem.Application.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        public UserServices(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDetails> CreateUserAsync(UserDetails User)
        {

            if (string.IsNullOrWhiteSpace(User.Username))
                throw new ArgumentException("Please enter a player name.");

            if (string.IsNullOrWhiteSpace(User.Password))
                throw new ArgumentException("Please enter a password");

            var newUser = new UserDetails
            {
                Username = User.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(User.Password),
                Role = User.Role,
            };
            await _userRepository.CreateUserAsync(newUser);
            return newUser;

        }

        public async Task<List<GetUserDTOs>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<GetUserDTOs?> GetUserByIdAsync(Guid Id)
        {
            if (Id == Guid.Empty)
                throw new ArgumentException("Please enter a vaild Id");

            var User = await _userRepository.GetUserByIdAsync(Id);
            return User;
        }

        // UserServices.cs — does the real work
        public async Task<UserDetails?> UpdateUserAsync(Guid userId, UserDetails user)
        {
            var existing = await _userRepository.GetUserEntityByIdAsync(userId);   // ← "Entity" added
            if (existing == null)
                return null;

            existing.Username = user.Username;
            existing.Role = user.Role;

            if (!string.IsNullOrWhiteSpace(user.Password))
                existing.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            return await _userRepository.UpdateUserAsync(existing);
        }

        public async Task<UserDetails?> DeleteUserAsync(Guid id)
        {
            if (id == Guid.Empty)
                throw new ArgumentException("Please enter a valid Id");

            var user = await _userRepository.DeleteUserAsync(id);

            return user;
        }


        public async Task<UserDetails?> GetByUsernameAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new ArgumentException("Please enter a username.");

            return await _userRepository.GetByUsernameAsync(username);
        }
    }
}
