import React, { useState, useEffect } from 'react';
import { matchPlayersApi } from '../api/matchPlayers';
import { TEAM_LABELS } from '../types';
import '../styles/PitchVisualizer.css';

export const PitchVisualizer = ({ match, onNavigate, onSelectPlayer }) => {
  const [lineup, setLineup] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match) {
      setLoading(false);
      return;
    }
    matchPlayersApi.getByMatch(match.id).then(setLineup).finally(() => setLoading(false));
  }, [match]);

  if (!match) {
    return (
      <div className="pitch-page pitch-empty-box">
        <p>No match selected.</p>
        <button onClick={() => onNavigate('matches')}>Choose a match</button>
      </div>
    );
  }

  return (
    <div className="pitch-page">
      <h1 className="pitch-title">Titans ({TEAM_LABELS[match.team]}) vs {match.opponent}</h1>
      <p className="pitch-date">
        {new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>

      {loading && <p>Loading lineup...</p>}
      {!loading && lineup.length === 0 && <p>No lineup has been set for this match yet.</p>}

      <div className="pitch-lineup-grid">
        {lineup.map((entry) => (
          <button
            key={entry.playerId}
            className="pitch-player-card"
            onClick={() => onSelectPlayer({ id: entry.playerId, name: entry.playerName })}
          >
            <p><strong>{entry.playerName}</strong></p>
            <p>{entry.position}</p>
            <p>{entry.tries} tries • {entry.conversions} conversions</p>
          </button>
        ))}
      </div>
    </div>
  );
};