using RugbyManagementSystem.Application.DTOs.SponsorDTOs;
using RugbyManagementSystem.Application.Interfaces;

namespace RugbyManagementSystem.Application.Services;

public class SponsorInquiryServices : ISponsorInquiryServices
{
    private readonly ISponsorInquiryRepository _repository;

    public SponsorInquiryServices(ISponsorInquiryRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<GetSponsorInquiryDTO>> GetAllAsync() => await _repository.GetAllAsync();

    public async Task<GetSponsorInquiryDTO> CreateAsync(CreateSponsorInquiryDTO dto)
    {
        var inquiry = new GetSponsorInquiryDTO
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Message = dto.Message
        };
        return await _repository.CreateAsync(inquiry);
    }

    public async Task<bool> MarkReviewedAsync(int id) => await _repository.MarkReviewedAsync(id);

    public async Task<bool> DeleteAsync(int id) => await _repository.DeleteAsync(id);
}