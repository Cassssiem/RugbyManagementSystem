using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.UserDTOs
{
    public class CreateUserDTOs
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(50, MinimumLength = 2)]
        public string Username { get; set; }
        [Required(ErrorMessage = "Please enter a password")]
        [Range(2,20)]
        public string Password { get; set; }
        public string Role { get; set; } = "User";
    }
}
