import React from 'react';
import { TEAM_LABELS } from '../types';
import '../styles/HomeView.css';

export const HomeView = ({ matches, loading, onNavigate, onSelectMatch }) => {
  const now = new Date();
  const upcoming = matches.filter((m) => new Date(m.date) >= now);
  const completed = matches.filter((m) => new Date(m.date) < now);

  const nextMatch = upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  const latestResult = completed.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-inner">
          <div>
            <h1 className="home-hero-heading">
              Rugby Management <span className="home-hero-accent">Elevated</span>
            </h1>
            <p className="home-hero-text">
              Streamline your club operations with high-performance tools — from match day
              logistics to tactical squad lineups.
            </p>
            <div className="home-hero-buttons">
              <button className="home-btn-primary" onClick={() => onNavigate('matches')}>
                View All Matches
              </button>
              <button className="home-btn-outline" onClick={() => onNavigate('sponsor')}>
                Sponsor Us
              </button>
            </div>
          </div>

          {latestResult && (
            <div className="home-result-card">
              <span className="home-result-label">Latest Result</span>
              <div className="home-result-teams">
                <span>Titans</span>
                <span className="home-result-score">
                  {latestResult.titans} - {latestResult.opponentScore}
                </span>
                <span>{latestResult.opponent}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="home-next-section">
        <h2 className="home-next-title">Next Fixture</h2>

        {loading && <p>Loading matches...</p>}
        {!loading && !nextMatch && <p>No upcoming matches scheduled.</p>}

        {nextMatch && (
          <button
            className="home-next-card"
            onClick={() => {
              onSelectMatch(nextMatch);
              onNavigate('matches');
            }}
          >
            <p>{new Date(nextMatch.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            <p><strong>Titans ({TEAM_LABELS[nextMatch.team]}) vs {nextMatch.opponent}</strong></p>
            <p>{nextMatch.location}</p>
          </button>
        )}
      </section>
    </div>
  );
};