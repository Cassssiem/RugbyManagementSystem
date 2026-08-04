using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs;
using RugbyManagementSystem.Application.DTOs.PlayerDTOs;
using RugbyManagementSystem.Application.DTOs.UpdatePlayer;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Enums;

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
        [Authorize(Roles = nameof(UserRoles.Admin))]
        public async Task<ActionResult<GetPlayerDTO>> CreatePlayer(
            CreatePlayerDTOs player)
        {
            var newPlayer = await _playerService.CreatePlayerAsync(player);

            return Ok(newPlayer);
        }

        [HttpGet]
        public async Task<ActionResult<List<GetPlayerDTO>>> GetAllPlayers()
        {
            var players = await _playerService.GetAllPlayersAsync();

            return Ok(players);
        }

        [HttpGet("{playerId}")]
        public async Task<ActionResult<GetPlayerDTO>> GetPlayerById(Guid playerId)
        {
            var player = await _playerService.GetPlayerByIdAsync(playerId);

            if (player == null)
                return NotFound();

            return Ok(player);
        }

        [HttpPut("{playerId:guid}")]
        [Authorize(Roles = nameof(UserRoles.Admin))]
        public async Task<ActionResult<GetPlayerDTO>> UpdatePlayerAsync(
            Guid playerId,
            UpdatePlayerDTOs player)
        {
            var updatedPlayer = await _playerService.UpdatePlayerAsync(
                playerId,
                player);

            if (updatedPlayer == null)
                return NotFound();

            return Ok(updatedPlayer);
        }

        [HttpDelete("{playerId:guid}")]
        [Authorize(Roles = nameof(UserRoles.Admin))]
        public async Task<IActionResult> DeletePlayer(Guid playerId)
        {
            var deleted = await _playerService.DeletePlayerAsync(playerId);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}