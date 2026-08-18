using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.MatchPhotosDTOs
{
    // GetMatchPhotoDTO.cs
    public class GetGalleryPhotoDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string? Caption { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
