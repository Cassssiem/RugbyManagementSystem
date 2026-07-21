namespace RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs
{
    public class MatchPLayerDTO
    {
        public Guid PlayerId { get; set; }
        public string PlayerName { get; set; }
        public int MatchId { get; set; }
        public string Opponent { get; set; }
        public DateTime? MatchDate { get; set; }
        public int Tries { get; set; }
        public int Conversions { get; set; }

    }
}