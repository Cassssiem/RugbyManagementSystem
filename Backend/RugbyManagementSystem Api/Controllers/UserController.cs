using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.UserDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Application.Services;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Domain.Enums;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly TokenService _tokenService;

        public UserController(
            IUserServices userServices,
            TokenService tokenService)
        {
            _userServices = userServices;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult<CreateUserDTOs>> CreateUserAsync(CreateUserDTOs user)
        {
            var newUser = await _userServices.CreateUserAsync(user);
            return Ok(newUser);
        }

        [HttpGet]
        [Authorize(Roles = nameof(UserRoles.Admin))]
        public async Task<ActionResult<UserDetails>> GetAllUsersAsync()
        {
            var user = await _userServices.GetAllUsersAsync();

            return Ok(user);
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = nameof(UserRoles.Admin))]
        public async Task<ActionResult<UserDetails>> GetUserById(Guid id)
        {
            var user = await _userServices.GetUserByIdAsync(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _userServices.GetByUsernameAsync(dto.Username);

            if (user == null ||
                !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new { token });
        }

        [HttpPut("{userId:guid}")]
        [Authorize(Roles = nameof(UserRoles.Admin))]
        public async Task<ActionResult<UserDetails>> UpdateUserAsync(
            Guid userId,
            UserDetails user)
        {
            if (userId != user.Id)
                return BadRequest("The route ID does not match the user ID.");

            var updatedUser = await _userServices.UpdateUserAsync(userId, user);

            if (updatedUser == null)
                return NotFound();

            return Ok(updatedUser);
        }

        [HttpDelete("{userId:guid}")]
        [Authorize(Roles = nameof(UserRoles.Admin))]
        public async Task<IActionResult> DeleteUserAsync(Guid userId)
        {
            var result = await _userServices.DeleteUserAsync(userId);

            if (result == null)
                return NotFound("User was not found.");

            return NoContent();
        }
    }
}