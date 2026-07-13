using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using System.Numerics;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerServices _playerService;
        
        public PlayerController(IPlayerServices playerServices)
        {
            _playerService = playerServices;
        }

        [HttpPost("Addad a player")]
        public async Task<ActionResult<PlayerDetails>> CreatePlayerAsync(PlayerDetails player)
        { 
            var newPlayer = await _playerService.CreatePlayerAsync(player);

            return CreatedAtAction(
                nameof(GetPlayerById),
                new { Id = newPlayer.Id },
                newPlayer
                );

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerDetails>>> GetAllPlayers()
        {
            var player = await _playerService.GetAllPlayersAsync();

            return Ok(player);
        }


        [HttpGet("{name}")]
        public async Task<ActionResult<PlayerDetails>> GetPlayerById(string name)
        {
            var player = await _playerService.GetPlayerByIdAsync(name);

            if (player == null)
                return NotFound();

            return Ok(player);
        }

        [HttpPut("Update a players Details")]
        public async Task<ActionResult<PlayerDetails>> UpdatePLayerAsync(string name, PlayerDetails player)
        {
            if (name != player.Name)
                return BadRequest("Player does not exist");

            var updateplayer =await _playerService.UpdatePlayerAsync(player);

            if (updateplayer == null)
                return NotFound(nameof(player));

            return Ok(updateplayer);
        }

        [HttpDelete("Delete a player")]
        public async Task<ActionResult> DeletePLayerAsunc(string name, PlayerDetails player)
        {

            var result = await _playerService.DeletePlayerAsync(name);

            if (result == null)
                return NotFound("Player was not found");

            return Ok("Player was deleted");
        }
    }
}
