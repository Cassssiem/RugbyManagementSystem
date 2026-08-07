using RugbyManagementSystem.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RugbyManagementSystem.Application.DTOs.MatchDTOs
{
    public class CreateMatchDTOs
    {
        [Required] public string Opponent { get; set; }
        [Required] public DateTime Date { get; set; }
        [Required] public string Location { get; set; }
        [Required] public Teams Team { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Score cannot be negative.")]
        public int Titans { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Score cannot be negative.")]
        public int OpponentScore { get; set; }
    }
}