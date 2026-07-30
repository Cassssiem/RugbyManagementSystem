import React from 'react';
import '../styles/TopNavBar.css';

const NAV_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Players', view: 'players' },
  { label: 'Matches', view: 'matches' },
  { label: 'Sponsor Us', view: 'sponsor' },
];

export const TopNavBar = ({ activeView, onNavigate, isLoggedIn, onLogout }) => {
  return (
    <nav className="top-navbar">
      <div className="top-navbar-left">
        <button className="top-navbar-logo" onClick={() => onNavigate('home')}>
          TITANS
        </button>

        <ul className="top-navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.view}>
              <button
                className={activeView === link.view ? 'top-navbar-link active' : 'top-navbar-link'}
                onClick={() => onNavigate(link.view)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="top-navbar-right">
        {isLoggedIn ? (
          <>
            <button className="top-navbar-btn dashboard" onClick={() => onNavigate('admin-dashboard')}>
              DASHBOARD
            </button>
            <button className="top-navbar-btn login" onClick={onLogout}>
              LOG OUT
            </button>
          </>
        ) : (
          <button className="top-navbar-btn login" onClick={() => onNavigate('auth')}>
            LOGIN
          </button>
        )}
      </div>
    </nav>
  );
};