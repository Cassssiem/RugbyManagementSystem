using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.CreatePlayer
{
    public class CreatePlayerDTOs
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string NickName { get; set; }
        public int Age { get; set; }
        public string Position { get; set; }
        public int Tries { get; set; }
        public int Conversion { get; set; }
    }
}
