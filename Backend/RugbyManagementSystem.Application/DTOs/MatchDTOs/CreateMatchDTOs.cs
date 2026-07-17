using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.MatchDTOs
{
    public class CreateMatchDTOs
    {
        [Required]
        [StringLength(100)]
        public string Opponent { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public int Titans { get; set; }
        [Required]
        public int OpponentScore { get; set; }
    }
}
