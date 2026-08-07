import React, { useState } from 'react';
import { TEAMS, TEAM_LABELS, LEAGUE_OPPONENTS, EMPTY_MATCH_FORM } from '../types';
import '../styles/AdminPlayers.css';

export const AdminMatchSetup = ({ onAddMatch, onNavigate }) => {
  const [form, setForm] = useState(EMPTY_MATCH_FORM);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumber = name === 'titans' || name === 'opponentScore';
    setForm((f) => ({ ...f, [name]: isNumber ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onAddMatch(form);
      onNavigate('admin-matches');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Create Match</h1>

      {error && <div className="admin-error">{error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-field">
          <label>Opponent</label>
          <select name="opponent" value={form.opponent} onChange={handleChange} required>
            <option value="">Select an opponent...</option>
            {LEAGUE_OPPONENTS.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div className="admin-field">
          <label>Date & Time</label>
          <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required />
        </div>

        <div className="admin-field">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />
        </div>

        <div className="admin-field">
          <label>Team</label>
          <select name="team" value={form.team} onChange={handleChange}>
            {TEAMS.map((t) => <option key={t} value={t}>{TEAM_LABELS[t]}</option>)}
          </select>
        </div>

        <div className="admin-field">
          <label>Titans Score</label>
          <input type="number" min="0" name="titans" value={form.titans} onChange={handleChange} />
        </div>

        <div className="admin-field">
          <label>Opponent Score</label>
          <input type="number" min="0" name="opponentScore" value={form.opponentScore} onChange={handleChange} />        </div>

        <button type="submit" className="admin-submit-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Create Match'}
        </button>
      </form>
    </div>
  );
};