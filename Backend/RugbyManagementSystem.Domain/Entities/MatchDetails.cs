using RugbyManagementSystem.Domain.Enums;

namespace RugbyManagementSystem.Domain.Entities
{
    public class MatchDetails
    {
        public int Id { get; set; }
        public string Opponent { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public Teams Team { get; set; }
        public int Titans { get; set; }
        public int OpponentScore { get; set; }
        public ICollection<MatchPlayer> MatchPlayers { get; set; }
    }
}