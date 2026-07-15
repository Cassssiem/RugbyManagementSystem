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

        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
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
        public async Task<ActionResult<UserDetails>> GetAllUsersAsync()
        {
            var user = await _userServices.GetAllUsersAsync();

            return Ok(user);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<UserDetails>> GetUserById(Guid Id)
        {
            var user = await _userServices.GetUserByIdAsync(Id);

            if (user == null)
                return NotFound();

            return Ok(user);
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
        public async Task<ActionResult> DeleteUserAsync(Guid Id, UserDetails user)
        {

            var result = await _userServices.DeleteUserAsync(Id);

            if (result == null)
                return NotFound("User was not found");

            return Ok("User was deleted");
        }

    }
}
