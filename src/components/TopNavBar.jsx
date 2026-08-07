import React, { useState } from 'react';
import '../styles/TopNavBar.css';

const NAV_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Players', view: 'players' },
  { label: 'Matches', view: 'matches' },
  { label: 'Sponsor Us', view: 'sponsor' },
];

export const TopNavBar = ({ activeView, onNavigate, isLoggedIn, isAdmin, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (view) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <nav className="top-navbar">
      <div className="top-navbar-bar">
        <button className="top-navbar-logo" onClick={() => go('home')}>
          TITANS
        </button>

        <ul className="top-navbar-links desktop-only">
          {NAV_LINKS.map((link) => (
            <li key={link.view}>
              <button
                className={activeView === link.view ? 'top-navbar-link active' : 'top-navbar-link'}
                onClick={() => go(link.view)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="top-navbar-right desktop-only">
          {isLoggedIn && isAdmin && (
            <button className="top-navbar-btn dashboard" onClick={() => go('admin-dashboard')}>
              DASHBOARD
            </button>
          )}

          {isLoggedIn ? (
            <button className="top-navbar-btn login" onClick={onLogout}>
              LOG OUT
            </button>
          ) : (
            <button className="top-navbar-btn login" onClick={() => go('auth')}>
              LOGIN
            </button>
          )}
        </div>

        <button
          type="button"
          className={menuOpen ? 'hamburger open' : 'hamburger'}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <button key={link.view} className="mobile-link" onClick={() => go(link.view)}>
              {link.label}
            </button>
          ))}

          {isLoggedIn && isAdmin && (
            <button className="mobile-link" onClick={() => go('admin-dashboard')}>
              Dashboard
            </button>
          )}

          {isLoggedIn ? (
            <button
              className="mobile-link"
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
            >
              Log Out
            </button>
          ) : (
            <button className="mobile-link" onClick={() => go('auth')}>
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};