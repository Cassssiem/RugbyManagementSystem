using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3;
        private readonly string _bucket;
        private readonly string _publicBaseUrl;

        public UploadController(IAmazonS3 s3, IConfiguration configuration)
        {
            _s3 = s3;

            _bucket = configuration["SupabaseStorage:Bucket"]
                ?? throw new InvalidOperationException(
                    "Supabase Storage bucket is missing.");

            _publicBaseUrl = configuration["SupabaseStorage:PublicBaseUrl"]
                ?? throw new InvalidOperationException(
                    "Supabase Storage public URL is missing.");
        }

        [HttpPost("player-image")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadPlayerImage(IFormFile? file)
        {
            var error = ValidateImage(file);
            if (error != null)
                return BadRequest(error);

            var url = await UploadAsync(file!, "players");
            return Ok(new { url });
        }

        [HttpPost("gallery-photo")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadGalleryPhoto(IFormFile? file)
        {
            var error = ValidateImage(file);
            if (error != null)
                return BadRequest(error);

            var url = await UploadAsync(file!, "gallery");
            return Ok(new { url });
        }

        private static string? ValidateImage(IFormFile? file)
        {
            if (file == null || file.Length == 0)
                return "No file uploaded.";

            var allowedTypes = new[]
            {
                "image/jpeg",
                "image/png",
                "image/webp"
            };

            if (!allowedTypes.Contains(file.ContentType))
                return "Only JPEG, PNG, or WebP images are allowed.";

            if (file.Length > 5 * 1024 * 1024)
                return "Image must be under 5MB.";

            return null;
        }

        private async Task<string> UploadAsync(
            IFormFile file,
            string folder)
        {
            var extension = file.ContentType switch
            {
                "image/jpeg" => ".jpg",
                "image/png" => ".png",
                "image/webp" => ".webp",
                _ => throw new InvalidOperationException(
                    "Unsupported image type.")
            };

            var key = $"{folder}/{Guid.NewGuid():N}{extension}";

            await using var stream = file.OpenReadStream();

            var request = new PutObjectRequest
            {
                BucketName = _bucket,
                Key = key,
                InputStream = stream,
                ContentType = file.ContentType
            };

            await _s3.PutObjectAsync(
                request,
                HttpContext.RequestAborted);

            return $"{_publicBaseUrl.TrimEnd('/')}/{key}";
        }
    }
}