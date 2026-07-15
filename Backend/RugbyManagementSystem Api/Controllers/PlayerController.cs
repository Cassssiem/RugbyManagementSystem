using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
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

        [HttpPost]
        public async Task<ActionResult<CreatePlayerDTOs>> CreatePlayer(CreatePlayerDTOs player)
        {
            var newPlayer = await _playerService.CreatePlayerAsync(player);

            return Ok(newPlayer);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreatePlayerDTOs>>> GetAllPlayers()
        {
            var player = await _playerService.GetAllPlayersAsync();

            return Ok(player);
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<CreatePlayerDTOs>> GetPlayerById(Guid playerId)
        {
            var player = await _playerService.GetPlayerByIdAsync(playerId);

            if (player == null)
                return NotFound();

            return Ok(player);
        }

        [HttpPut("Update a players Details")]
        public async Task<ActionResult<UpdatePlayerDTOs>> UpdatePLayerAsync(Guid playerId, UpdatePlayerDTOs player)
        {
            if (playerId != player.Id)
                return BadRequest("Player does not exist");

            var updateplayer =await _playerService.UpdatePlayerAsync(player);

            if (updateplayer == null)
                return NotFound(nameof(player));

            return Ok(updateplayer);
        }

        [HttpDelete("Delete a player")]
        public async Task<ActionResult> DeletePLayerAsunc(Guid playerId)
        {

            var result = await _playerService.DeletePlayerAsync(playerId);

            if (result == null)
                return NotFound("Player was not found");

            return Ok("Player was deleted");
        }
    }
}
