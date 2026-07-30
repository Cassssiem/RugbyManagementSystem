import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

export const AdminDashboard = ({ players, matches, inquiries, onNavigate }) => {
  const [search, setSearch] = useState('');
  const now = new Date();
  const unreviewed = inquiries.filter((i) => !i.reviewed);

  const recentMatches = [...matches]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Overview</h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            className="dashboard-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-cards">
        <button className="dashboard-card" onClick={() => onNavigate('admin-players')}>
          <div className="dashboard-card-label">Total Players</div>
          <div className="dashboard-card-value">{players.length}</div>
        </button>

        <button className="dashboard-card" onClick={() => onNavigate('admin-matches')}>
          <div className="dashboard-card-label">Total Matches</div>
          <div className="dashboard-card-value">{matches.length}</div>
        </button>

        <button
          className={`dashboard-card ${unreviewed.length > 0 ? 'alert' : ''}`}
          onClick={() => onNavigate('admin-users')}
        >
          <div className="dashboard-card-label">Unreviewed Inquiries</div>
          <div className="dashboard-card-value">{unreviewed.length}</div>
          {unreviewed.length > 0 && <div className="dashboard-card-alert-text">Requires Action</div>}
        </button>
      </div>

      <div className="dashboard-panels">
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <span className="dashboard-panel-title">Recent Matches</span>
            <button className="dashboard-panel-link" onClick={() => onNavigate('admin-matches')}>
              VIEW ALL
            </button>
          </div>

          {recentMatches.length === 0 ? (
            <p className="dashboard-empty">No matches recorded yet.</p>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr><th>Date</th><th>Opponent</th><th>Score</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recentMatches.map((m) => {
                  const isUpcoming = new Date(m.date) >= now;
                  return (
                    <tr key={m.id}>
                      <td>{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                      <td>Titans vs {m.opponent}</td>
                      <td>{isUpcoming ? '-' : `${m.titans} - ${m.opponentScore}`}</td>
                      <td>
                        <span className={`dashboard-status ${isUpcoming ? 'upcoming' : 'completed'}`}>
                          {isUpcoming ? 'Upcoming' : 'Completed'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <span className="dashboard-panel-title">Latest Inquiries</span>
            <button className="dashboard-panel-link" onClick={() => onNavigate('admin-users')}>
              VIEW ALL
            </button>
          </div>

          {inquiries.length === 0 ? (
            <p className="dashboard-empty">No sponsor inquiries yet.</p>
          ) : (
            inquiries.slice(0, 4).map((i) => (
              <div key={i.id} className="dashboard-inquiry-item">
                <strong>{i.name}</strong>
                {i.message.slice(0, 60)}{i.message.length > 60 ? '...' : ''}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};