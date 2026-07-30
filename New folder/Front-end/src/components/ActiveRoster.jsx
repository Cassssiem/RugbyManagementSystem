import React from 'react';
import '../styles/ActiveRoster.css';

export const ActiveRoster = ({ players, loading, onSelectPlayer }) => {
  return (
    <div className="roster-page">
      <h1 className="roster-title">Active Roster</h1>

      {loading && <p className="roster-loading">Loading players...</p>}
      {!loading && players.length === 0 && (
        <p className="roster-empty">No players added yet.</p>
      )}

      <div className="roster-grid">
        {players.map((player) => (
          <button key={player.id} className="player-card" onClick={() => onSelectPlayer(player)}>
            {player.imageUrl ? (
    <img
      src={`https://localhost:7056${player.imageUrl}`}
      alt={player.name}
      style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 4, marginBottom: '0.75rem' }}
    />
  ) : (
    <div style={{ width: '100%', height: 160, background: '#eee', borderRadius: 4, marginBottom: '0.75rem' }} />
  )}
            <p className="player-card-name">{player.name} {player.surname}</p>
            {player.nickName && <p className="player-card-nick">"{player.nickName}"</p>}
            <p className="player-card-position">{player.position}</p>
            <div className="player-card-stats">
              <span><strong>{player.matchesPlayed}</strong> Matches</span>
              <span><strong>{player.tries}</strong> Tries</span>
              <span><strong>{player.conversions}</strong> Conv.</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};