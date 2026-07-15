using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs
{
    public class UpdateMatchPlayerDto
    {
        public Guid PlayerId { get; set; }
        public int MatchId { get; set; }
        public int Tries { get; set; }
        public int Conversions { get; set; }
    }
}
