using RugbyManagementSystem.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RugbyManagementSystem.Application.DTOs.MatchDTOs
{
    public class UpdateMatchDTOs
    {
        [Required] public string Opponent { get; set; }
        [Required] public DateTime Date { get; set; }
        [Required] public string Location { get; set; }
        [Required] public Teams Team { get; set; }
        public int Titans { get; set; }
        public int OpponentScore { get; set; }
    }
}