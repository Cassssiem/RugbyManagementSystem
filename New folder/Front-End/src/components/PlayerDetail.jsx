import React, { useState, useEffect } from 'react';
import { matchPlayersApi } from '../api/matchPlayers';
import '../styles/PlayerDetail.css';

export const PlayerDetail = ({ player, onBack }) => {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    matchPlayersApi
      .getByPlayer(player.id)
      .then(setHistory)
      .finally(() => setLoadingHistory(false));
  }, [player.id]);

  return (
    <div className="player-detail-page">
      <button onClick={onBack} className="player-detail-back">← Back to Roster</button>

      <div className="player-detail-card">
  <div className="player-detail-header">

    {player.imageUrl && (
      <img
        src={`https://localhost:7056${player.imageUrl}`}
        alt={`${player.name} ${player.surname}`}
        className="player-detail-image"
      />
    )}

    <div className="player-detail-info">
      <h1 className="player-detail-name">
        {player.name} {player.surname}
      </h1>

      {player.nickName && (
        <p className="player-detail-nick">
          "{player.nickName}"
        </p>
      )}

      <p className="player-detail-meta">
        {player.position} • Age {player.age}
      </p>
    </div>

  </div>

  <div className="player-detail-stats">
    <div>
      <p className="player-detail-stat-num">{player.matchesPlayed}</p>
      <p className="player-detail-stat-label">Matches Played</p>
    </div>

    <div>
      <p className="player-detail-stat-num">{player.tries}</p>
      <p className="player-detail-stat-label">Tries</p>
    </div>

    <div>
      <p className="player-detail-stat-num">{player.conversions}</p>
      <p className="player-detail-stat-label">Conversions</p>
    </div>
  </div>
</div>

      <h2 className="player-detail-section-title">Match History</h2>

      {loadingHistory && <p>Loading match history...</p>}
      {!loadingHistory && history.length === 0 && <p>No matches played yet.</p>}

      {history.map((record) => (
        <div key={record.matchId} className="history-row">
          <div>
            <p className="history-date">
              {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="history-opponent">vs {record.opponent}</p>
            <p className="history-position">{record.position}</p>
          </div>
          <div className="history-stats">
            <p>{record.tries} tries</p>
            <p>{record.conversions} conversions</p>
          </div>
        </div>
      ))}
    </div>
  );
};