import React, { useState } from 'react';
import { TEAM_LABELS } from '../types';
import { matchPlayersApi } from '../api/matchPlayers';
import '../styles/AdminPlayers.css';

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

      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th><th>Team</th><th>Opponent</th><th>Score</th><th></th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <React.Fragment key={m.id}>
              <tr>
                <td>{new Date(m.date).toLocaleDateString()}</td>
                <td>{TEAM_LABELS[m.team]}</td>
                <td>{m.opponent}</td>
                <td>{m.titans} - {m.opponentScore}</td>
                <td>
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
                </td>
              </tr>

              {editingId === m.id && (
                <tr>
                  <td colSpan={5}>
                    <div style={{ background: '#f7f7f7', padding: '1.25rem', borderRadius: '4px' }}>

                      <h3 style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Final Match Score</h3>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <input
                          type="number"
                          min="0"
                          value={scoreForm.titans}
                          onChange={(e) => setScoreForm((f) => ({ ...f, titans: Number(e.target.value) }))}
                          style={{ width: 60 }}
                        />
                        -
                        <input
                          type="number"
                          min="0"
                          value={scoreForm.opponentScore}
                          onChange={(e) => setScoreForm((f) => ({ ...f, opponentScore: Number(e.target.value) }))}
                          style={{ width: 60 }}
                        />
                        <button className="admin-row-btn edit" onClick={() => saveMatchScore(m)} disabled={saving}>
                          Save Score
                        </button>
                      </div>

                      <h3 style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Who Scored?</h3>

                      {loadingLineup && <p style={{ fontSize: '0.8rem' }}>Loading lineup...</p>}
                      {!loadingLineup && lineup.length === 0 && (
                        <p style={{ fontSize: '0.8rem' }}>
                          No players have been added to this match's lineup yet — add them first via "Manage Lineup."
                        </p>
                      )}

                      {!loadingLineup && lineup.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'end', flexWrap: 'wrap' }}>
                          <div>
                            <label style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>Player</label>
                            <select value={selectedPlayerId} onChange={(e) => handleSelectPlayer(e.target.value)}>
                              <option value="">Select a player...</option>
                              {lineup.map((p) => (
                                <option key={p.playerId} value={p.playerId}>
                                  {p.playerName} ({p.position})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>Tries</label>
                            <input
                              type="number"
                              min="0"
                              value={tries}
                              onChange={(e) => setTries(e.target.value)}
                              style={{ width: 60 }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>Conversions</label>
                            <input
                              type="number"
                              min="0"
                              value={conversions}
                              onChange={(e) => setConversions(e.target.value)}
                              style={{ width: 60 }}
                            />
                          </div>

                          <button className="admin-row-btn edit" onClick={() => savePlayerScore(m)} disabled={saving}>
                            Save Player Stats
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};