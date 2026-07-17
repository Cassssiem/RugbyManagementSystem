using System.ComponentModel.DataAnnotations;

namespace RugbyManagementSystem.Application.DTOs.UserDTOs
{
    public class LoginDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}