using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public UploadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpPost("player-image")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadPlayerImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var allowedTypes = new[] { "image/jpeg", "image/png", "image/webp" };
            if (!allowedTypes.Contains(file.ContentType))
                return BadRequest("Only JPEG, PNG, or WebP images are allowed.");

            if (file.Length > 5 * 1024 * 1024)
                return BadRequest("Image must be under 5MB.");

            var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", "players");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var url = $"/uploads/players/{fileName}";
            return Ok(new { url });
        }
    }
}