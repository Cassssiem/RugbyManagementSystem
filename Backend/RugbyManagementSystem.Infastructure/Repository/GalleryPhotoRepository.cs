using Microsoft.EntityFrameworkCore;
using RugbyManagementSystem.Application.DTOs.MatchPhotosDTOs;
using RugbyManagementSystem.Application.Interfaces;
using RugbyManagementSystem.Domain.Entities;
using RugbyManagementSystem.Infastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Services
{
    public class GalleryPhotoRepository : IGalleryPhotoRepository
    {
        private readonly AppDbContext _context;

        public GalleryPhotoRepository(AppDbContext context)
        {
            _context = context;
        }

        private static GetGalleryPhotoDTO ToDto(GalleryPhoto p) => new GetGalleryPhotoDTO
        {
            Id = p.Id,
            ImageUrl = p.ImageUrl,
            Caption = p.Caption,
            UploadedAt = p.UploadedAt
        };

        public async Task<List<GetGalleryPhotoDTO>> GetAllAsync()
        {
            var photos = await _context.GalleryPhotos
                .OrderByDescending(p => p.UploadedAt)
                .ToListAsync();
            return photos.Select(ToDto).ToList();
        }

        public async Task<GetGalleryPhotoDTO> CreateAsync(string imageUrl, string? caption)
        {
            var entity = new GalleryPhoto
            {
                ImageUrl = imageUrl,
                Caption = caption,
                UploadedAt = DateTime.UtcNow
            };

            _context.GalleryPhotos.Add(entity);
            await _context.SaveChangesAsync();
            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.GalleryPhotos.FindAsync(id);
            if (entity == null) return false;

            _context.GalleryPhotos.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

