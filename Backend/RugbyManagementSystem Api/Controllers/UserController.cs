using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.UserDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Application.Services;
using RugbyManagementSystem.Domain.Entities;
using System.Numerics;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly TokenService _tokenService;

        public UserController(IUserServices userServices, TokenService tokenService)
        {
            _userServices = userServices;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDetails>> CreateUserAsync(CreateUserDTOs user)
        {
            var newUser = await _userServices.CreateUserAsync(user);

            return CreatedAtAction
                (
                    nameof(GetUserById),
                    new { Id = newUser.Id },
                    newUser
                );
            
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDetails>> GetAllUsersAsync()
        {
            var user = await _userServices.GetAllUsersAsync();

            return Ok(user);
        }

        [HttpGet("{Id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDetails>> GetUserById(Guid Id)
        {
            var user = await _userServices.GetUserByIdAsync(Id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _userServices.GetByUsernameAsync(dto.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                return Unauthorized("Invalid username or password.");

            var token = _tokenService.GenerateToken(user);
            return Ok(new { token });
        }


        [HttpPut]
        public async Task<ActionResult<UserDetails>> UpdateUserAsync(Guid userId ,UserDetails user)
        {
            if (userId != user.Id)
                return BadRequest("User does not exist");

            var updateuser = await _userServices.UpdateUserAsync(user);

            if (updateuser == null)
                return NotFound(nameof(user));

            return Ok(updateuser);
        }


        [HttpDelete("Delete a User")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteUserAsync(Guid Id, UserDetails user)
        {

            var result = await _userServices.DeleteUserAsync(Id);

            if (result == null)
                return NotFound("User was not found");

            return Ok("User was deleted");
        }

    }
}
