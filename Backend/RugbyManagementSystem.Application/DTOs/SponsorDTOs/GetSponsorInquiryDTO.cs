using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.DTOs.SponsorDTOs
{
    public class GetSponsorInquiryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string Message { get; set; }
        public DateTime SubmittedAt { get; set; }
        public bool Reviewed { get; set; }
    }
}