using RugbyManagementSystem.Application.DTOs.SponsorDTOs;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface ISponsorInquiryRepository
    {
        Task<List<GetSponsorInquiryDTO>> GetAllAsync();
        Task<GetSponsorInquiryDTO> CreateAsync(GetSponsorInquiryDTO inquiry);
        Task<bool> MarkReviewedAsync(int id);
        Task<bool> DeleteAsync(int id);
    }
}
