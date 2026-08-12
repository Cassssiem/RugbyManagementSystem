import React, { useState } from 'react';
import { POSITIONS, EMPTY_PLAYER_FORM } from '../types';
import { uploadPlayerImage } from '../api/upload';
import '../styles/AdminPlayers.css';

export const AdminPlayers = ({ players, onAddPlayer, onUpdatePlayer, onDeletePlayer }) => {
  const [form, setForm] = useState(EMPTY_PLAYER_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'age' ? Number(value) : value }));
  };

const NAME_PATTERN = /^[a-zA-Z\s'-]+$/;

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (!NAME_PATTERN.test(form.name)) {
    setError('Name can only contain letters, spaces, hyphens, and apostrophes.');
    return;
  }
  if (!NAME_PATTERN.test(form.surname)) {
    setError('Surname can only contain letters, spaces, hyphens, and apostrophes.');
    return;
  }
  if (form.nickName && !NAME_PATTERN.test(form.nickName)) {
    setError('Nickname can only contain letters, spaces, hyphens, and apostrophes.');
    return;
  }

  setSaving(true);
  try {
    // ...existing submit logic...
    let payload = { ...form };

    if (imageFile) {
      const url = await uploadPlayerImage(imageFile);
      payload.imageUrl = url;
    } else if (editingId) {
      const existing = players.find((p) => p.id === editingId);
      payload.imageUrl = existing?.imageUrl || null;
    }

    if (editingId) {
      await onUpdatePlayer(editingId, payload);
    } else {
      await onAddPlayer(payload);
    }

    setForm(EMPTY_PLAYER_FORM);
    setImageFile(null);
    setEditingId(null);
  } catch (err) {
    setError(err.message || 'Something went wrong.');
  } finally {
    setSaving(false);
  }
};

  const startEdit = (player) => {
    setEditingId(player.id);
    setImageFile(null);
    setForm({
      name: player.name,
      surname: player.surname,
      nickName: player.nickName || '',
      age: player.age,
      position: player.position,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this player? This cannot be undone.')) return;
    try {
      await onDeletePlayer(id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Manage Players</h1>

      {error && <div className="admin-error">{error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="admin-field">
          <label>Surname</label>
          <input name="surname" value={form.surname} onChange={handleChange} required />
        </div>
        <div className="admin-field">
          <label>Nickname</label>
          <input name="nickName" value={form.nickName} onChange={handleChange} />
        </div>
        <div className="admin-field">
          <label>Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} required />
        </div>
        <div className="admin-field">
          <label>Position</label>
          <select name="position" value={form.position} onChange={handleChange}>
            {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="admin-field" style={{ gridColumn: '1 / -1' }}>
  <label>About (optional)</label>
  <textarea
    name="bio"
    rows="3"
    value={form.bio || ''}
    onChange={handleChange}
    style={{ width: '100%', padding: '0.5rem', border: '1px solid #c0c9c1', borderRadius: '2px', fontFamily: 'inherit' }}
  />
</div>
        <div className="admin-field">
          <label>Player Photo</label>
          <input
  type="file"
  accept="image/*"
  onChange={(e) => setImageFile(e.target.files[0] || null)}
/>
        </div>
        <button type="submit" className="admin-submit-btn" disabled={saving}>
          {saving ? 'Saving...' : editingId ? 'Update Player' : 'Add Player'}
        </button>
        {editingId && (
          <button
            type="button"
            className="admin-submit-btn"
            style={{ background: '#717973' }}
            onClick={() => { setEditingId(null); setForm(EMPTY_PLAYER_FORM); setImageFile(null); }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Photo</th><th>Name</th><th>Position</th><th>Matches</th><th>Tries</th><th>Conv.</th><th></th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td>
                {p.imageUrl ? (
                  <img
                    src={`https://localhost:7056${p.imageUrl}`}
                    alt={p.name}
                    style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: 4, background: '#eee' }} />
                )}
              </td>
              <td>{p.name} {p.surname}</td>
              <td>{p.position}</td>
              <td>{p.matchesPlayed}</td>
              <td>{p.tries}</td>
              <td>{p.conversions}</td>
              <td>
                <button className="admin-row-btn edit" onClick={() => startEdit(p)}>Edit</button>
                <button className="admin-row-btn delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};