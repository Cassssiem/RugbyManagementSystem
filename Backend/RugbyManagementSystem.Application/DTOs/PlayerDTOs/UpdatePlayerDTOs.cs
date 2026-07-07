using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.UpdatePlayer
{

    public class UpdatePlayerDTOs
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Position { get; set; } = string.Empty;
    }
}