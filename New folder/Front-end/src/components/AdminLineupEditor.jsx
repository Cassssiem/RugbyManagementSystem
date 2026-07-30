import React, { useState, useEffect } from 'react';
import { matchPlayersApi } from '../api/matchPlayers';
import { POSITIONS, TEAM_LABELS } from '../types';
import '../styles/AdminLineupEditor.css';

export const AdminLineupEditor = ({ players, selectedMatch, onNavigate, onStatsSaved }) => {
  const [lineup, setLineup] = useState([]);
  const [loadingLineup, setLoadingLineup] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [position, setPosition] = useState(POSITIONS[0]);
  const [tries, setTries] = useState(0);
  const [conversions, setConversions] = useState(0);

  const loadLineup = () => {
    if (!selectedMatch) return;
    setLoadingLineup(true);
    matchPlayersApi
      .getByMatch(selectedMatch.id)
      .then(setLineup)
      .catch((err) => setError(err.message))
      .finally(() => setLoadingLineup(false));
  };

  useEffect(() => {
    loadLineup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMatch]);

  if (!selectedMatch) {
    return (
      <div className="lineup-page">
        <p>No match selected.</p>
        <button onClick={() => onNavigate('admin-matches')}>Go to Matches</button>
      </div>
    );
  }

  // Players not already in this match's lineup — so you can't add the same player twice
  const availablePlayers = players.filter(
    (p) => !lineup.some((entry) => entry.playerId === p.id)
  );

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!selectedPlayerId) {
      setError('Choose a player first.');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      // This is the call that actually triggers the backend's
      // RecalculatePlayerStatsAsync — this is the fix for the original bug.
      await matchPlayersApi.addToMatch(selectedMatch.id, selectedPlayerId, {
        position,
        tries: Number(tries),
        conversions: Number(conversions),
      });

      setSelectedPlayerId('');
      setPosition(POSITIONS[0]);
      setTries(0);
      setConversions(0);

      loadLineup();       // refresh this match's lineup list
      onStatsSaved();     // tell App.jsx to re-fetch players, so updated stats show everywhere
    } catch (err) {
      setError(err.message || 'Could not add player to match.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (playerId) => {
    if (!window.confirm('Remove this player from the match?')) return;
    setError(null);
    try {
      await matchPlayersApi.removeFromMatch(selectedMatch.id, playerId);
      loadLineup();
      onStatsSaved(); // stats need to drop back down too, since RecalculatePlayerStatsAsync runs on removal too
    } catch (err) {
      setError(err.message || 'Could not remove player.');
    }
  };

  return (
    <div className="lineup-page">
      <button className="lineup-back-btn" onClick={() => onNavigate('admin-matches')}>
        ← Back to Matches
      </button>

      <div className="lineup-header">
        <h1 className="lineup-match-title">
          {TEAM_LABELS[selectedMatch.team]} vs {selectedMatch.opponent}
        </h1>
        <p className="lineup-match-date">
          {new Date(selectedMatch.date).toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric',
          })}
        </p>
      </div>

      {error && <div className="lineup-error">{error}</div>}

      <div className="lineup-columns">
        <div>
          <h2 className="lineup-section-title">Add Player</h2>
          <form className="lineup-add-form" onSubmit={handleAddPlayer}>
            <label>Player</label>
            <select value={selectedPlayerId} onChange={(e) => setSelectedPlayerId(e.target.value)}>
              <option value="">Select a player...</option>
              {availablePlayers.map((p) => (
                <option key={p.id} value={p.id}>{p.name} {p.surname}</option>
              ))}
            </select>

            <label>Position</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)}>
              {POSITIONS.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
            </select>

            <div className="lineup-stats-row">
              <div style={{ flex: 1 }}>
                <label>Tries</label>
                <input type="number" min="0" value={tries} onChange={(e) => setTries(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Conversions</label>
                <input type="number" min="0" value={conversions} onChange={(e) => setConversions(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="lineup-add-btn" disabled={saving}>
              {saving ? 'Adding...' : 'Add to Lineup'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="lineup-section-title">Current Lineup ({lineup.length})</h2>

          {loadingLineup && <p>Loading lineup...</p>}
          {!loadingLineup && lineup.length === 0 && <p>No players added yet.</p>}

          <div className="lineup-current-list">
            {lineup.map((entry) => (
              <div key={entry.playerId} className="lineup-current-row">
                <div>
                  <p className="lineup-current-row-name">{entry.playerName}</p>
                  <p className="lineup-current-row-meta">
                    {entry.position} • {entry.tries} tries • {entry.conversions} conversions
                  </p>
                </div>
                <button className="lineup-remove-btn" onClick={() => handleRemove(entry.playerId)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};