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
        public string Name { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Surname { get; set; }

        [StringLength(30)]
        public string NickName { get; set; }
        [Required]
        public int Age { get; set; }

        public string? ImageUrl { get; set; }
        [Required]
        public PlayerPosition Position { get; set; }


    }
}
