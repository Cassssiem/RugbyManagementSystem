using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.SponsorDTOs
{
    public class CreateSponsorInquiryDTO
    {
        [Required, StringLength(100, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s'-]+$", ErrorMessage = "Name can only contain letters, spaces, hyphens, and apostrophes.")]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Phone number can only contain numbers.")]
        public string? Phone { get; set; }

        [Required, StringLength(1000, MinimumLength = 10)]
        public string Message { get; set; }
    }
}