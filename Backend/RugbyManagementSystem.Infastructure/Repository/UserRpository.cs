using RugbyManagementSystem.Application.DTOs.UserDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Infastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace RugbyManagementSystem.Infastructure.Repository
{
    public class UserRpository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRpository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserDetails> CreateUserAsync(UserDetails user)
        {
            var newUser = new UserDetails
            {
                Username = user.Username,
                Password = user.Password
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }

        public async Task<IEnumerable<UserDetails>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<UserDetails?> GetUserByIdAsync(Guid Id)
        {
            return await _context.Users.FindAsync(Id);
        }

        public async Task<UserDetails?> UpdateUserAsync(UserDetails updateUserDTOs)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(p => p.Id == updateUserDTOs.Id);

            if (user == null)
                return null;

            user.Username = updateUserDTOs.Username;
            user.Password = updateUserDTOs.Password;

            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<UserDetails?> DeleteUserAsync(Guid Id)
        {
            var user = await _context.Users.FindAsync(Id);

            if (user == null)
                return null;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
