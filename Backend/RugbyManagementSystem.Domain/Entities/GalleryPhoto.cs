using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Domain.Entities
{
    public class GalleryPhoto
    {
        public int Id { get; set; }
        public int MatchId { get; set; }
        public string ImageUrl { get; set; }
        public string? Caption { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
