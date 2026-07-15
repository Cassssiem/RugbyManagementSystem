using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Application.Services;
using RugbyManagementSystem.Domain.Entities;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly IMatchServices _matchServices;

        public MatchController(IMatchServices matchServices)
        {
            _matchServices = matchServices;
        }

        [HttpPost]
        public async Task<ActionResult<MatchDetails>> CreateMatchAsync(MatchDetails matchDetails)
        {
            var newMatch = await _matchServices.CreateMatchAsync(matchDetails);

            return CreatedAtAction
                (
                    nameof(GetMatchById),
                    new { Id = newMatch.Id },
                    newMatch
                );
        }

        [HttpGet]
        public async Task<ActionResult<MatchDetails>> GetAllAsync()
        {
            var match = await _matchServices.GetAllAsync();

            return Ok(match);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<MatchDetails>> GetMatchById(int Id)
        {
            var match = await _matchServices.GetMatchByIdAsync(Id);

            if (match == null)
                return NotFound();

            return Ok(match);
        }

        [HttpPut]
        public async Task<ActionResult<MatchDetails>> UpdateMatchAsync(int matchId, MatchDetails match)
        {
            if (matchId != match.Id)
                return BadRequest("User does not exist");

            var updatematch = await _matchServices.UpdateMatchAsync(match);

            if (updatematch == null)
                return NotFound(nameof(match));

            return Ok(updatematch);
        }


    }
}
