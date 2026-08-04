using RugbyManagementSystem.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs
{
    public class AddMatchPlayerDTO
    {
        public PlayerPosition Position { get; set; }
        public int Tries { get; set; }
        [Range(1, 23, ErrorMessage = "Jersey number must be between 1 and 23.")]
        public int JerseyNumber { get; set; }

        public int Conversions { get; set; }
    }
}