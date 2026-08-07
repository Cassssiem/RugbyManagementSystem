using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Domain.Enums;

public class PlayerDetails
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string NickName { get; set; }
    public int Age { get; set; }
    public PlayerPosition Position { get; set; }
    public int MatchesPlayed { get; set; }
    public int Tries { get; set; }
    public int Conversions { get; set; }
    public string? ImageUrl { get; set; }   // new — nullable, since not every player needs one
    public string? Bio { get; set; }
    public ICollection<MatchPlayer> MatchPlayers { get; set; }
}