using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Domain.Entities
{
    public class MatchPlayer
    {

            public Guid PlayerId { get; set; } 
            public PlayerDetails Player { get; set; }

            public int MatchId { get; set; }
            public MatchDetails Match { get; set; }

            public int Tries { get; set; }
            public int Conversions { get; set; }
        
    }
}
