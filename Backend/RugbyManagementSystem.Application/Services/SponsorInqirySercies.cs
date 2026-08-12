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
        if (!LooksLikeRealWords(dto.Message))
            throw new ArgumentException("Please enter a real message, not random characters.");

        var inquiry = new GetSponsorInquiryDTO
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Message = dto.Message
        };

        return await _repository.CreateAsync(inquiry);
    }

    private static bool LooksLikeRealWords(string text)
    {
        var letters = text.Where(char.IsLetter).ToList();
        if (letters.Count < 5)
            return false;

        // Real English text is typically ~35-55% vowels
        var vowels = letters.Count(c => "aeiouAEIOU".Contains(c));
        var vowelRatio = (double)vowels / letters.Count;
        if (vowelRatio < 0.15 || vowelRatio > 0.75)
            return false;

        // Reject long runs of consonants in a row (classic keyboard-mashing pattern)
        int consonantStreak = 0;
        foreach (var c in letters)
        {
            if (!"aeiouAEIOU".Contains(c))
            {
                consonantStreak++;
                if (consonantStreak > 5)
                    return false;
            }
            else
            {
                consonantStreak = 0;
            }
        }

        // Message should contain at least a couple of actual words (space-separated)
        var wordCount = text.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Length;
        if (wordCount < 2)
            return false;

        return true;
    }

    public async Task<bool> MarkReviewedAsync(int id) => await _repository.MarkReviewedAsync(id);

    public async Task<bool> DeleteAsync(int id) => await _repository.DeleteAsync(id);
}