using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Domain.Entities
{
    public class MatchDetails
    {
        public int Id { get; set; }
        public string Opponent { get; set; }
        public DateTime Date { get; set; }
        public string Score { get; set; }
        public string Location { get; set; }
        public string PlayerWhoScored { get; set; }
        public string PlayerWhoConverted { get; set; }

        public ICollection<MatchPlayer> MatchPlayers { get; set; } = new List<MatchPlayer>();

    }
}
