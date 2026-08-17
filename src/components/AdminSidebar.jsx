import React, { useState } from 'react';
import '../styles/AdminSidebar.css';

const ADMIN_LINKS = [
  { label: 'Dashboard', view: 'admin-dashboard' },
  { label: 'Players', view: 'admin-players' },
  { label: 'Matches', view: 'admin-matches' },
  { label: 'Gallery', view: 'admin-gallery' },
  { label: 'Users & Inquiries', view: 'admin-users' },
];

export const AdminSidebar = ({ activeView, onNavigate, onOpenAddMatchModal, onLogout, unreviewedCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const go = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand desktop-only">
        <div className="admin-sidebar-logo">TITANS ADMIN</div>
        <div className="admin-sidebar-sub">Club Management</div>
      </div>

      <button className="admin-back-to-site desktop-only" onClick={() => onNavigate('home')}>
        ← Back to Site
      </button>

        <ul className="admin-sidebar-links desktop-only">
          {ADMIN_LINKS.map((link) => (
            <li key={link.view}>
              <button
                className={activeView === link.view ? 'admin-sidebar-link active' : 'admin-sidebar-link'}
                onClick={() => go(link.view)}
              >
                {link.label.toUpperCase()}
                {link.view === 'admin-users' && unreviewedCount > 0 && (
                  <span className="admin-sidebar-badge">{unreviewedCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <button className="admin-sidebar-add-match desktop-only" onClick={onOpenAddMatchModal}>
          ADD NEW MATCH
        </button>

        <button className="admin-sidebar-logout desktop-only" onClick={onLogout}>
          LOGOUT
        </button>

        <div className="admin-sidebar-profile desktop-only">
          <div className="admin-sidebar-avatar" />
          <div>
            <div className="admin-sidebar-profile-name">Admin User</div>
            <div className="admin-sidebar-profile-role">System Manager</div>
          </div>
        </div>

        {/* Mobile-only top bar */}
        <div className="admin-mobile-bar mobile-only">
          <div className="admin-sidebar-logo">TITANS ADMIN</div>
          <button
            className={mobileMenuOpen ? 'admin-hamburger open' : 'admin-hamburger'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle admin menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="admin-mobile-menu mobile-only">
              <button
                className="admin-mobile-link"
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
              >
                ← Back to Site
              </button>

              {ADMIN_LINKS.map((link) => (
                <button
                  key={link.view}
                  className={activeView === link.view ? 'admin-mobile-link active' : 'admin-mobile-link'}
                  onClick={() => go(link.view)}
                >
                  {link.label}
                  {link.view === 'admin-users' && unreviewedCount > 0 && (
                    <span className="admin-sidebar-badge">{unreviewedCount}</span>
                  )}
                </button>
              ))}

          <button
            className="admin-mobile-link"
            onClick={() => {
              onOpenAddMatchModal();
              setMobileMenuOpen(false);
            }}
          >
            + Add New Match
          </button>

          <button
            className="admin-mobile-link logout"
            onClick={() => {
              onLogout();
              setMobileMenuOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};