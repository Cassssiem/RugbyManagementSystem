import React, { useState, useEffect } from 'react';
import { matchPlayersApi } from '../api/matchPlayers';
import '../styles/PitchVisualizer.css';

// Standard rugby jersey layout — number determines pitch position
const PITCH_SLOTS = {
  15: { top: '10%', left: '50%' },
  11: { top: '18%', left: '5%' },
  14: { top: '18%', left: '95%' },
  12: { top: '32%', left: '28%' },
  13: { top: '32%', left: '72%' },
  10: { top: '38%', left: '55%' },
  9: { top: '46%', left: '45%' },
  6: { top: '58%', left: '35%' },
  8: { top: '58%', left: '50%' },
  7: { top: '58%', left: '65%' },
  4: { top: '70%', left: '45%' },
  5: { top: '70%', left: '55%' },
  1: { top: '85%', left: '40%' },
  2: { top: '85%', left: '50%' },
  3: { top: '85%', left: '60%' },
};

export const PitchVisualizer = ({ match, onNavigate, onSelectPlayer }) => {
  const [lineup, setLineup] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match) { setLoading(false); return; }
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

  const startingXV = lineup.filter((p) => p.jerseyNumber >= 1 && p.jerseyNumber <= 15);
  const bench = lineup
    .filter((p) => p.jerseyNumber >= 16)
    .sort((a, b) => a.jerseyNumber - b.jerseyNumber);

  return (
    <div className="pitch-view-page">
      <button className="lineup-back-btn" onClick={() => onNavigate('matches')}>
        ← Back to Matches
      </button>

      <h1 className="pitch-title">Titans vs {match.opponent}</h1>

      {loading && <p>Loading lineup...</p>}
      {!loading && lineup.length === 0 && <p>No lineup has been set for this match yet.</p>}

      {!loading && lineup.length > 0 && (
        <div className="pitch-layout">
          <div className="pitch-field">
            {startingXV.map((p) => {
              const slot = PITCH_SLOTS[p.jerseyNumber];
              if (!slot) return null;
              const scored = p.tries > 0 || p.conversions > 0;
              return (
                <button
                  key={p.playerId}
                  className="pitch-player-pin"
                  style={{ top: slot.top, left: slot.left }}
                  onClick={() => onSelectPlayer({ id: p.playerId, name: p.playerName })}
                >
                  <span className={scored ? 'jersey-num scored' : 'jersey-num'}>{p.jerseyNumber}</span>
                  <span className="pitch-player-name">{p.playerName}</span>
                  <span className="pitch-player-pos">{p.position}</span>
                </button>
              );
            })}
          </div>

          <div className="bench-panel">
            <div className="bench-header">
              <span>BENCH</span>
              <span className="bench-count">{bench.length} Players</span>
            </div>
            <div className="bench-list">
              {bench.map((p) => (
                <button
                  key={p.playerId}
                  className="bench-row"
                  onClick={() => onSelectPlayer({ id: p.playerId, name: p.playerName })}
                >
                  <span className="jersey-num small">{p.jerseyNumber}</span>
                  <div>
                    <p className="bench-name">{p.playerName}</p>
                    <p className="bench-pos">{p.position}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};