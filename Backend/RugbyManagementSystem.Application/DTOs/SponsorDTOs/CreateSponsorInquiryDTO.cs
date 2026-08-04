using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.SponsorDTOs
{
    public class CreateSponsorInquiryDTO
    {
        [Required, StringLength(100)]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }

        [Required, StringLength(100)]
        public string Message { get; set; }
    }
}