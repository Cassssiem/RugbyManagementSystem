using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.PlayerDTOs
{
    public class GetPlayerDTO
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string NickName { get; set; }
        public int Age { get; set; }
        public PlayerPosition Position { get; set; }

        public int MatchesPlayed { get; set; }

        public int Tries { get; set; }

        public string? ImageUrl { get; set; }

        public int Conversions { get; set; }
    }
}
