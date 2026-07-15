using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.UserDTOs
{
    public class CreateUserDTOs
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } = "User";
    }
}
