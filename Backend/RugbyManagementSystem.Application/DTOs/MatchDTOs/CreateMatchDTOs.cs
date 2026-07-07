using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.MatchDTOs
{
    public class CreateMatchDTOs
    {
        public int Id { get; set; }
        public string Opponent { get; set; }
        public string Date { get; set; }
        public string Score { get; set; }
        public string Location { get; set; }
    }
}
