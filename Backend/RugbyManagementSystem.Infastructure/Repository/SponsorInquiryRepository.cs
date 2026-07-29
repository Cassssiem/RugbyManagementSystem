using RugbyManagementSystem.Application.DTOs.SponsorDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Infastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace RugbyManagementSystem.Infastructure.Repository;
public class SponsorInquiryRepository : ISponsorInquiryRepository
{
    private readonly AppDbContext _context;

    public SponsorInquiryRepository(AppDbContext context)
    {
        _context = context;
    }

    private static GetSponsorInquiryDTO ToDto(SponsorInquiry s) => new GetSponsorInquiryDTO
    {
        Id = s.Id,
        Name = s.Name,
        Email = s.Email,
        Phone = s.Phone,
        Message = s.Message,
        SubmittedAt = s.SubmittedAt,
        Reviewed = s.Reviewed
    };

    public async Task<List<GetSponsorInquiryDTO>> GetAllAsync()
    {
        var inquiries = await _context.SponsorInquiries
            .OrderByDescending(s => s.SubmittedAt)
            .ToListAsync();
        return inquiries.Select(ToDto).ToList();
    }

    public async Task<GetSponsorInquiryDTO> CreateAsync(GetSponsorInquiryDTO inquiry)
    {
        var entity = new SponsorInquiry
        {
            Name = inquiry.Name,
            Email = inquiry.Email,
            Phone = inquiry.Phone,
            Message = inquiry.Message,
            SubmittedAt = DateTime.UtcNow,
            Reviewed = false
        };

        _context.SponsorInquiries.Add(entity);
        await _context.SaveChangesAsync();
        return ToDto(entity);
    }

    public async Task<bool> MarkReviewedAsync(int id)
    {
        var entity = await _context.SponsorInquiries.FindAsync(id);
        if (entity == null) return false;

        entity.Reviewed = true;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _context.SponsorInquiries.FindAsync(id);
        if (entity == null) return false;

        _context.SponsorInquiries.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }
}
