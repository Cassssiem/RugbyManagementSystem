using System;
using System.Collections.Generic;
using RugbyManagementSystem.Application.DTOs.SponsorDTOs;


namespace RugbyManagementSystem.Application.Interfaces
{
    public interface ISponsorInquiryServices
    {
        Task<List<GetSponsorInquiryDTO>> GetAllAsync();
        Task<GetSponsorInquiryDTO> CreateAsync(CreateSponsorInquiryDTO dto);
        Task<bool> MarkReviewedAsync(int id);
        Task<bool> DeleteAsync(int id);
    }
}
