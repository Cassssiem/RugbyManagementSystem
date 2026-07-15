using Microsoft.AspNetCore.Http.HttpResults;
using RugbyManagementSystem.Application.DTOs.UserDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;

namespace RugbyManagementSystem.Application.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        public UserServices(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDetails> CreateUserAsync(CreateUserDTOs User)
        {
            var newUser = new UserDetails
            {

                Username = User.Username,
                Password = User.Password,
                Role = User.Role,
            };
            await _userRepository.CreateUserAsync(newUser);
            return newUser;

        }

        public async Task<IEnumerable<UserDetails>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<UserDetails?> GetUserByIdAsync(Guid Id)
        {
            var User = await _userRepository.GetUserByIdAsync(Id);
            return User;
        }

        public async Task<UserDetails?> UpdateUserAsync(UserDetails Id)
        {
            {
                var user = await _userRepository.UpdateUserAsync(Id);

                if (user == null)
                    return null;

                user.Username = Id.Username;
                user.Password = Id.Password;

                return user;
            }
        }

        public async Task<UserDetails?> DeleteUserAsync(Guid Id)
        {
            var user = await _userRepository.GetUserByIdAsync(Id);

            if (user == null)
                return null;

            await _userRepository.DeleteUserAsync(Id);

            return user;
        }
    }
}
