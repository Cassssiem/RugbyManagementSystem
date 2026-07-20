

using RugbyManagementSystem.Domain.Enums;

namespace RugbyManagementSystem.Domain.Entities
{
    public class UserDetails
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public UserRoles Role { get; set; } 
    }
}
