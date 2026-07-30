import React from 'react';
import { TEAM_LABELS } from '../types';
import '../styles/AdminPlayers.css';

export const AdminMatchesView = ({ matches, onNavigate, onSelectMatch, onDeleteMatch }) => {
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

      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th><th>Team</th><th>Opponent</th><th>Score</th><th></th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.id}>
              <td>{new Date(m.date).toLocaleDateString()}</td>
              <td>{TEAM_LABELS[m.team]}</td>
              <td>{m.opponent}</td>
              <td>{m.titans} - {m.opponentScore}</td>
              <td>
                <button
                  className="admin-row-btn edit"
                  onClick={() => { onSelectMatch(m); onNavigate('admin-lineup-editor'); }}
                >
                  Manage Lineup
                </button>
                <button className="admin-row-btn delete" onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};