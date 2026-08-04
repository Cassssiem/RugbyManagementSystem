import React from 'react';
import { TEAM_LABELS } from '../types';
import '../styles/MatchesView.css';

export const MatchesView = ({ matches, loading, onSelectMatch, onNavigate }) => {
  return (
    <div className="matches-page">
      <h1 className="matches-title">Match Center</h1>

      {loading && <p className="matches-loading">Loading matches...</p>}
      {!loading && matches.length === 0 && (
        <p className="matches-empty">No matches recorded yet.</p>
      )}

      <div className="matches-list">
        {matches.map((match) => (
          <button
            key={match.id}
            className="match-row"
            onClick={() => {
              onSelectMatch(match);
              onNavigate('lineup-viewer');
            }}
          >
            <div>
              <p className="match-row-date">
                {new Date(match.date).toLocaleDateString('en-US', {
                  weekday: 'short', month: 'short', day: 'numeric',
                })}
                {' • '}{match.location}
              </p>
              <p className="match-row-teams">
                Titans ({TEAM_LABELS[match.team]}) vs {match.opponent}
              </p>
            </div>
            <span className="match-row-score">{match.titans} - {match.opponentScore}</span>
          </button>
        ))}
      </div>
    </div>
  );
};