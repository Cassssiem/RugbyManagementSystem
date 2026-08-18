using RugbyManagementSystem.Application.DTOs.MatchPhotosDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Interfaces
{
    public interface IGalleryPhotoServices
    {
        Task<List<GetGalleryPhotoDTO>> GetAllAsync();
        Task<GetGalleryPhotoDTO> AddPhotoAsync(string imageUrl, string? caption);
        Task<bool> DeleteAsync(int id);
    }
}
