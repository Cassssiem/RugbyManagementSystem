using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Application.Interfaces;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class MatchPlayerController : ControllerBase
    {
        private readonly IMatchPlayerServices _matchPlayerServices;

        public MatchPlayerController(IMatchPlayerServices matchPlayerServices)
        {
            _matchPlayerServices = matchPlayerServices;
        }

        // POST api/matches/5/players/{playerId}
        // Add a player to a match's squad
        [HttpPost("matches/{matchId:int}/players/{playerId:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddPlayerToMatch(int matchId, Guid playerId)
        {
            var result = await _matchPlayerServices.AddPlayerToMatchAsync(playerId, matchId);
            return CreatedAtAction(nameof(GetPlayersByMatch), new { matchId }, result);
        }

        // GET api/matches/5/players
        // List the squad for a given match
        [HttpGet("matches/{matchId:int}/players")]
        public async Task<IActionResult> GetPlayersByMatch(int matchId)
        {
            var players = await _matchPlayerServices.GetPlayersByMatchAsync(matchId);
            return Ok(players);
        }

        // GET api/players/{playerId}/matches
        // List every match a given player has featured in
        [HttpGet("players/{playerId:guid}/matches")]
        public async Task<IActionResult> GetMatchesByPlayer(Guid playerId)
        {
            var matches = await _matchPlayerServices.GetMatchesByPlayerAsync(playerId);
            return Ok(matches);
        }

        // PUT api/matches/5/players/{playerId}
        // Update a player's stats (tries/conversions) for that match
        [HttpPut("matches/{matchId:int}/players/{playerId:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePlayerMatchStats(int matchId, Guid playerId, UpdateMatchPlayerDto dto)
        {
            if (matchId != dto.MatchId || playerId != dto.PlayerId)
                return BadRequest("Route parameters do not match the request body.");

            var result = await _matchPlayerServices.UpdatePlayerMatchStatsAsync(dto);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // DELETE api/matches/5/players/{playerId}
        // Remove a player from a match's squad
        [HttpDelete("matches/{matchId:int}/players/{playerId:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemovePlayerFromMatch(int matchId, Guid playerId)
        {
            var removed = await _matchPlayerServices.RemovePlayerFromMatchAsync(playerId, matchId);

            if (!removed)
                return NotFound();

            return NoContent();
        }
    }
}