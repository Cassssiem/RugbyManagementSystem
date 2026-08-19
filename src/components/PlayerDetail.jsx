import React, { useState, useEffect } from 'react';
import { matchPlayersApi } from '../api/matchPlayers';
import '../styles/PlayerDetail.css';
import { getAssetUrl } from "../api/config";

export const PlayerDetail = ({ player, onBack }) => {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    matchPlayersApi
      .getByPlayer(player.id)
      .then(setHistory)
      .finally(() => setLoadingHistory(false));
  }, [player.id]);

  const totalScored = history.filter((h) => h.tries > 0 || h.conversions > 0).length;

  return (
    <div className="player-detail-page">
      <button onClick={onBack} className="player-detail-back">
        ← Back to Roster
      </button>

      <div className="player-hero">
        <div className="player-hero-photo">
          {player.imageUrl ? (
           <img src={getAssetUrl(player.imageUrl)} alt={player.name} />
          ) : (
            <div className="player-hero-photo-placeholder">
              {player.name?.[0]}{player.surname?.[0]}
            </div>
          )}
        </div>

        <div className="player-hero-info">
          <span className="player-hero-position-tag">{player.position}</span>
          <h1 className="player-hero-name">
            {player.name} <span className="player-hero-surname">{player.surname}</span>
          </h1>
          {player.nickName && <p className="player-hero-nick">"{player.nickName}"</p>}
          <p className="player-hero-age">Age {player.age}</p>

          {player.bio && <p className="player-hero-bio">{player.bio}</p>}
        </div>
      </div>

      <div className="player-stats-strip">
        <div className="player-stat-box">
          <span className="player-stat-num">{player.matchesPlayed}</span>
          <span className="player-stat-label">Matches Played</span>
        </div>
        <div className="player-stat-box highlight">
          <span className="player-stat-num">{player.tries}</span>
          <span className="player-stat-label">Tries</span>
        </div>
        <div className="player-stat-box highlight">
          <span className="player-stat-num">{player.conversions}</span>
          <span className="player-stat-label">Conversions</span>
        </div>
        <div className="player-stat-box">
          <span className="player-stat-num">{totalScored}</span>
          <span className="player-stat-label">Matches Scored In</span>
        </div>
      </div>

      <h2 className="player-detail-section-title">Match History</h2>

      {loadingHistory && <p className="player-detail-empty">Loading match history...</p>}
      {!loadingHistory && history.length === 0 && (
        <p className="player-detail-empty">This player hasn't featured in any matches yet.</p>
      )}

      <div className="history-list">
        {history.map((record) => {
          const scored = record.tries > 0 || record.conversions > 0;
          return (
            <div key={record.matchId} className="history-card">
              <div className="history-card-date">
                <span className="history-day">
                  {new Date(record.date).toLocaleDateString('en-US', { day: 'numeric' })}
                </span>
                <span className="history-month">
                  {new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>

              <div className="history-card-main">
                <p className="history-card-opponent">vs {record.opponent}</p>
                <p className="history-card-position">{record.position}</p>
              </div>

              <div className="history-card-stats">
                <span>{record.tries} tries</span>
                <span>{record.conversions} conv.</span>
                {scored && <span className="history-scored-pill">SCORED</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};