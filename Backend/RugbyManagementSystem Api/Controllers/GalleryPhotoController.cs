using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.MatchPhotosDTOs;
using RugbyManagementSystem.Application.Interfaces;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryPhotoController : ControllerBase
    {
        private readonly IGalleryPhotoServices _services;

        public GalleryPhotoController(IGalleryPhotoServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetGalleryPhotoDTO>>> GetAll()
        {
            return Ok(await _services.GetAllAsync());
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<GetGalleryPhotoDTO>> AddPhoto([FromBody] AddGalleryPhotoRequest request)
        {
            var result = await _services.AddPhotoAsync(request.ImageUrl, request.Caption);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _services.DeleteAsync(id);
            if (!result) return NotFound();
            return Ok(new { message = "Photo deleted" });
        }
    }

    public class AddGalleryPhotoRequest
    {
        public string ImageUrl { get; set; }
        public string? Caption { get; set; }
    }
}
