using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.MatchDTOs;
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
        public async Task<ActionResult<CreateMatchDTOs>> CreateMatchAsync(CreateMatchDTOs matchDetails)
        {
            var newMatch = await _matchServices.CreateMatchAsync(matchDetails);

            return Ok(newMatch);
        }

        [HttpGet]
        public async Task<ActionResult<CreateMatchDTOs>> GetAllAsync()
        {
            var match = await _matchServices.GetAllAsync();

            return Ok(match);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<CreateMatchDTOs>> GetMatchById(int Id)
        {
            var match = await _matchServices.GetMatchByIdAsync(Id);

            if (match == null)
                return NotFound();

            return Ok(match);
        }

        [HttpPut]
        public async Task<ActionResult<CreateMatchDTOs>> UpdateMatch(UpdateMatchDTOs dto)
        {
            var match = await _matchServices.UpdateMatchAsync(dto);

            if (match == null)
                return NotFound();

            return Ok(match);
        }


    }
}
