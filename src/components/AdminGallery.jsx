import React, { useState, useEffect } from 'react';
import { galleryApi, uploadGalleryPhoto } from '../api/gallery';
import '../styles/AdminPlayers.css';
import '../styles/AdminGallery.css';

export const AdminGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoFile, setPhotoFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const loadPhotos = () => {
    setLoading(true);
    galleryApi.getAll().then(setPhotos).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleUpload = async () => {
    if (!photoFile) {
      setError('Choose a photo first.');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const url = await uploadGalleryPhoto(photoFile);
      await galleryApi.addPhoto(url, caption || null);
      setPhotoFile(null);
      setCaption('');
      loadPhotos();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await galleryApi.delete(id);
      loadPhotos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Manage Gallery</h1>

      {error && <div className="admin-error">{error}</div>}

      <div className="gallery-admin-form">
        <div className="admin-field">
          <label>Photo</label>
          <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0] || null)} />
        </div>
        <div className="admin-field">
          <label>Caption (optional)</label>
          <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
        </div>
        <button className="admin-submit-btn" onClick={handleUpload} disabled={uploading || !photoFile}>
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </div>

      <h2 className="gallery-admin-subtitle">All Photos ({photos.length})</h2>

      {loading && <p className="gallery-admin-note">Loading photos...</p>}
      {!loading && photos.length === 0 && <p className="gallery-admin-note">No photos uploaded yet.</p>}

      <div className="gallery-admin-grid">
        {photos.map((p) => (
          <div key={p.id} className="gallery-admin-thumb-wrap">
            <img src={`https://localhost:7056${p.imageUrl}`} alt={p.caption || 'Photo'} className="gallery-admin-thumb" />
            <button className="gallery-admin-delete" onClick={() => handleDelete(p.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};