using RugbyManagementSystem.Application.DTOs.MatchPhotosDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IGalleryPhotoRepository
    {
        Task<List<GetGalleryPhotoDTO>> GetAllAsync();
        Task<GetGalleryPhotoDTO> CreateAsync(string imageUrl, string? caption);
        Task<bool> DeleteAsync(int id);
    }
}
