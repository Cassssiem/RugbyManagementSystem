using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.MatchPlayerDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Application.Services;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchPlayerController : ControllerBase
    {
        private readonly IMatchPlayerServices _matchPlayerServices;

        public MatchPlayerController(IMatchPlayerServices matchPlayerService)
        {
            _matchPlayerServices = matchPlayerService;
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePlayerMatch(UpdateMatchPlayerDto dto)
        {
            var result = await _matchPlayerServices.UpdatePlayerMatchStatsAsync(dto);

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}
