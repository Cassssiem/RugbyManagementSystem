using RugbyManagementSystem.Application.DTOs.MatchPhotosDTOs;
using RugbyManagementSystem.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace RugbyManagementSystem.Application.Services
{
    public class GalleryPhotoServices : IGalleryPhotoServices
    {
        private readonly IGalleryPhotoRepository _repository;

        public GalleryPhotoServices(IGalleryPhotoRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GetGalleryPhotoDTO>> GetAllAsync() => await _repository.GetAllAsync();

        public async Task<GetGalleryPhotoDTO> AddPhotoAsync(string imageUrl, string? caption)
            => await _repository.CreateAsync(imageUrl, caption);

        public async Task<bool> DeleteAsync(int id) => await _repository.DeleteAsync(id);
    }
}
