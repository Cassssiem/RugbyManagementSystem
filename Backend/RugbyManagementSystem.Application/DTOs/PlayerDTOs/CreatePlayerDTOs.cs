using RugbyManagementSystem.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.CreatePlayerDTOs
{
    public class CreatePlayerDTOs
    {
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s'-]+$", ErrorMessage = "Name can only contain letters, spaces, hyphens, and apostrophes.")]
        public string Name { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s'-]+$", ErrorMessage = "Surname can only contain letters, spaces, hyphens, and apostrophes.")]
        public string Surname { get; set; }

        [StringLength(30)]
        [RegularExpression(@"^[a-zA-Z\s'-]*$", ErrorMessage = "Nickname can only contain letters, spaces, hyphens, and apostrophes.")]
        public string NickName { get; set; }
        [Required]
        public int Age { get; set; }

        public string? ImageUrl { get; set; }
        [Required]
        public PlayerPosition Position { get; set; }

        public string? Bio { get; set; }
    }
}
