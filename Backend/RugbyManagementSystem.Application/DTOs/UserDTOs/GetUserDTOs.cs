using RugbyManagementSystem.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.UserDTOs
{
    public class GetUserDTOs
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; } = "User";
    }
}
