import React, { useState, useEffect } from 'react';
import { galleryApi } from '../api/gallery';
import '../styles/GalleryView.css';

export const GalleryView = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxUrl, setLightboxUrl] = useState(null);

  useEffect(() => {
    galleryApi.getAll().then(setPhotos).finally(() => setLoading(false));
  }, []);

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">Club Gallery</h1>

      {loading && <p className="gallery-loading">Loading photos...</p>}
      {!loading && photos.length === 0 && (
        <p className="gallery-empty">No photos have been uploaded yet.</p>
      )}

      <div className="gallery-grid">
        {photos.map((photo) => (
          <button
            key={photo.id}
            className="gallery-thumb"
            onClick={() => setLightboxUrl(photo.imageUrl)}
          >
            <img src={`https://localhost:7056${photo.imageUrl}`} alt={photo.caption || 'Club photo'} />
            {photo.caption && <span className="gallery-thumb-caption">{photo.caption}</span>}
          </button>
        ))}
      </div>

      {lightboxUrl && (
        <div className="gallery-lightbox" onClick={() => setLightboxUrl(null)}>
          <img src={`https://localhost:7056${lightboxUrl}`} alt="Full size" />
          <button className="gallery-lightbox-close" onClick={() => setLightboxUrl(null)}>×</button>
        </div>
      )}
    </div>
  );
};