using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.MatchDTOs
{
    public class CreateMatchDTOs
    {
        public string Opponent { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Titans { get; set; }
        public string OpponentScore { get; set; } 
    }
}
