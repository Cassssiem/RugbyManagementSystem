
import React, { useState } from 'react';
import { TEAM_LABELS } from '../types';
import '../styles/MatchesView.css';

export const MatchesView = ({
  matches,
  loading,
  onSelectMatch,
  onNavigate,
}) => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  /*
   * Get the season for each match.
   *
   * If your match has a "season" property, for example:
   * season: "2025/26"
   *
   * that will be used.
   *
   * If it doesn't have one yet, the year will be used instead.
   */
  const getSeason = (match) => {
    if (match.season) {
      return match.season;
    }

    return new Date(match.date).getFullYear().toString();
  };

  /*
   * Group matches by season
   */
  const seasons = {};

  matches.forEach((match) => {
    const season = getSeason(match);

    if (!seasons[season]) {
      seasons[season] = [];
    }

    seasons[season].push(match);
  });

  /*
   * Sort matches within each season
   * newest first
   */
  Object.keys(seasons).forEach((season) => {
    seasons[season].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  });

  /*
   * Sort seasons newest first
   */
  const sortedSeasons = Object.keys(seasons).sort(
    (a, b) => {
      const yearA = parseInt(a.substring(0, 4), 10);
      const yearB = parseInt(b.substring(0, 4), 10);

      return yearB - yearA;
    }
  );

  /*
   * Matches for currently selected season
   */
  const visibleMatches = selectedSeason
    ? seasons[selectedSeason] || []
    : [];

  return (
    <div className="matches-page">

      <h1 className="matches-title">
        Match Center
      </h1>

      {/* =========================
          SEASON TABS
         ========================= */}

      <div className="matches-tabs">

        {sortedSeasons.map((season) => (
          <button
            key={season}
            className={
              selectedSeason === season
                ? 'matches-tab active'
                : 'matches-tab'
            }
            onClick={() => setSelectedSeason(season)}
          >
            {season}
          </button>
        ))}

      </div>

      {/* =========================
          LOADING
         ========================= */}

      {loading && (
        <p className="matches-loading">
          Loading matches...
        </p>
      )}

      {/* =========================
          NO SEASONS
         ========================= */}

      {!loading && sortedSeasons.length === 0 && (
        <p className="matches-empty">
          No seasons available yet.
        </p>
      )}

      {/* =========================
          NO SEASON SELECTED
         ========================= */}

      {!loading &&
        sortedSeasons.length > 0 &&
        !selectedSeason && (
          <p className="matches-empty">
            Select a season to view its matches.
          </p>
        )}

      {/* =========================
          SELECTED SEASON
         ========================= */}

      {!loading &&
        selectedSeason &&
        visibleMatches.length === 0 && (
          <p className="matches-empty">
            No matches recorded for this season.
          </p>
        )}

      {!loading && selectedSeason && (
        <div className="matches-list">

          {visibleMatches.map((match) => (
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
                  {new Date(match.date).toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    }
                  )}
                  {' • '}
                  {match.location}
                </p>

                <p className="match-row-teams">
                  Titans ({TEAM_LABELS[match.team]}) vs{' '}
                  {match.opponent}
                </p>

              </div>

              <span className="match-row-score">
                {new Date(match.date) >= new Date()
                  ? 'Upcoming'
                  : `${match.titans} - ${match.opponentScore}`}
              </span>

            </button>
          ))}

        </div>
      )}

    </div>
  );
};

