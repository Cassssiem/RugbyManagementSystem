import React, { useState } from 'react';
import { TEAM_LABELS } from '../types';
import { matchPlayersApi } from '../api/matchPlayers';
import '../styles/AdminPlayers.css';
import '../styles/AdminMatchesView.css';

export const AdminMatchesView = ({ matches, onNavigate, onSelectMatch, onUpdateMatch, onDeleteMatch }) => {
  const [editingId, setEditingId] = useState(null);
  const [scoreForm, setScoreForm] = useState({ titans: 0, opponentScore: 0 });

  const [lineup, setLineup] = useState([]);
  const [loadingLineup, setLoadingLineup] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [tries, setTries] = useState(0);
  const [conversions, setConversions] = useState(0);

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);



  const startEditScore = async (match) => {
    setEditingId(match.id);
    setScoreForm({ titans: match.titans, opponentScore: match.opponentScore });
    setSelectedPlayerId('');
    setTries(0);
    setConversions(0);
    setError(null);

    setLoadingLineup(true);
    try {
      const players = await matchPlayersApi.getByMatch(match.id);
      setLineup(players);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingLineup(false);
    }
  };

  const handleSelectPlayer = (playerId) => {
    setSelectedPlayerId(playerId);
    const entry = lineup.find((p) => p.playerId === playerId);
    if (entry) {
      setTries(entry.tries);
      setConversions(entry.conversions);
    }
  };

  const saveMatchScore = async (match) => {
    if (scoreForm.titans < 0 || scoreForm.opponentScore < 0) {
      setError('Score cannot be negative.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onUpdateMatch(match.id, { ...match, ...scoreForm });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

const handlePhotoUpload = async (match) => {
  if (!photoFile) return;
  setUploadingPhoto(true);
  setError(null);
  try {
    const url = await uploadMatchPhoto(photoFile);
    await matchPhotosApi.addPhoto(match.id, url);
    setPhotoFile(null);
    const fresh = await matchPhotosApi.getByMatch(match.id);
    setMatchPhotos(fresh);
  } catch (err) {
    setError(err.message);
  } finally {
    setUploadingPhoto(false);
  }
};

const handleDeletePhoto = async (photoId, match) => {
  if (!window.confirm('Delete this photo?')) return;
  await matchPhotosApi.delete(photoId);
  const fresh = await matchPhotosApi.getByMatch(match.id);
  setMatchPhotos(fresh);
};

  const savePlayerScore = async (match) => {
    if (!selectedPlayerId) {
      setError('Choose a player who played in this match first.');
      return;
    }
    if (tries < 0 || conversions < 0) {
      setError('Tries and conversions cannot be negative.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const entry = lineup.find((p) => p.playerId === selectedPlayerId);
      await matchPlayersApi.updateStats(match.id, selectedPlayerId, {
        position: entry.position,
        tries: Number(tries),
        conversions: Number(conversions),
      });
      const fresh = await matchPlayersApi.getByMatch(match.id);
      setLineup(fresh);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this match? This will also remove its lineup.')) return;
    await onDeleteMatch(id);
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Manage Matches</h1>

      <button className="admin-submit-btn" style={{ marginBottom: '1.5rem' }} onClick={() => onNavigate('admin-match-setup')}>
        + New Match
      </button>

      {error && <div className="admin-error">{error}</div>}

      <div className="match-cards">
        {matches.map((m) => (
          <div key={m.id} className="match-manage-card">
            <div className="match-manage-header">
              <div>
                <p className="match-manage-date">{new Date(m.date).toLocaleDateString()}</p>
                <p className="match-manage-title">{TEAM_LABELS[m.team]} vs {m.opponent}</p>
              </div>
              <span className="match-manage-score">{m.titans} - {m.opponentScore}</span>
            </div>

            <div className="match-manage-actions">
              {editingId === m.id ? (
                <button className="admin-row-btn delete" onClick={() => setEditingId(null)}>Close</button>
              ) : (
                <>
                  <button className="admin-row-btn edit" onClick={() => startEditScore(m)}>Edit Score</button>
                  <button
                    className="admin-row-btn edit"
                    onClick={() => { onSelectMatch(m); onNavigate('admin-lineup-editor'); }}
                  >
                    Manage Lineup
                  </button>
                  <button className="admin-row-btn delete" onClick={() => handleDelete(m.id)}>Delete</button>
                </>
              )}
            </div>

            {editingId === m.id && (
              <div className="match-edit-panel">

                <h3 className="match-edit-subtitle">Final Match Score</h3>
                <div className="match-score-editor">
                  <input
                    type="number"
                    min="0"
                    value={scoreForm.titans}
                    onChange={(e) => setScoreForm((f) => ({ ...f, titans: Number(e.target.value) }))}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min="0"
                    value={scoreForm.opponentScore}
                    onChange={(e) => setScoreForm((f) => ({ ...f, opponentScore: Number(e.target.value) }))}
                  />
                  <button className="admin-row-btn edit" onClick={() => saveMatchScore(m)} disabled={saving}>
                    Save Score
                  </button>
                </div>

                <h3 className="match-edit-subtitle">Match Photos</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0] || null)} />
                      <button className="admin-row-btn edit" onClick={() => handlePhotoUpload(m)} disabled={uploadingPhoto || !photoFile}>
                        {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {matchPhotos.map((p) => (
                        <div key={p.id} style={{ position: 'relative' }}>
                          <img
                            src={`https://localhost:7056${p.imageUrl}`}
                            alt="Match"
                            style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }}
                          />
                          <button
                            onClick={() => handleDeletePhoto(p.id, m)}
                            style={{ position: 'absolute', top: -6, right: -6, background: '#ba1a1a', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: '0.7rem' }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                <h3 className="match-edit-subtitle">Who Scored?</h3>

                {loadingLineup && <p className="match-edit-note">Loading lineup...</p>}
                {!loadingLineup && lineup.length === 0 && (
                  <p className="match-edit-note">
                    No players in this match's lineup yet — add them via "Manage Lineup" first.
                  </p>
                )}

                {!loadingLineup && lineup.length > 0 && (
                  <div className="player-score-editor">
                    <div className="match-edit-field">
                      <label>Player</label>
                      <select value={selectedPlayerId} onChange={(e) => handleSelectPlayer(e.target.value)}>
                        <option value="">Select a player...</option>
                        {lineup.map((p) => (
                          <option key={p.playerId} value={p.playerId}>
                            {p.playerName} ({p.position})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="match-edit-field-row">
                      <div className="match-edit-field">
                        <label>Tries</label>
                        <input type="number" min="0" value={tries} onChange={(e) => setTries(e.target.value)} />
                      </div>
                      <div className="match-edit-field">
                        <label>Conversions</label>
                        <input type="number" min="0" value={conversions} onChange={(e) => setConversions(e.target.value)} />
                      </div>
                    </div>

                    <button className="admin-row-btn edit" onClick={() => savePlayerScore(m)} disabled={saving}>
                      Save Player Stats
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};