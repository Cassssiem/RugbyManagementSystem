using RugbyManagementSystem.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.UserDTOs
{
    public class GetUserDTOs
    {
        public string Username { get; set; } 
        public UserRoles Role { get; set; } 
    }
}
