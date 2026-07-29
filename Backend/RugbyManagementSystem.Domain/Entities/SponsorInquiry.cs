using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Text;

namespace RugbyManagementSystem.Domain.Entities
{
    public class SponsorInquiry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
        public DateTime SubmittedAt { get; set; }
        public bool Reviewed { get; set; }
    }
}
