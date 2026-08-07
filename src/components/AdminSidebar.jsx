import React from 'react';
import '../styles/AdminSidebar.css';

const ADMIN_LINKS = [
  { label: 'Dashboard', view: 'admin-dashboard' },
  { label: 'Players', view: 'admin-players' },
  { label: 'Matches', view: 'admin-matches' },
  { label: 'Users & Inquiries', view: 'admin-users' },
];

export const AdminSidebar = ({ activeView, onNavigate, onOpenAddMatchModal, onLogout, unreviewedCount = 0 }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-logo">TITANS ADMIN</div>
        <div className="admin-sidebar-sub">Club Management</div>
      </div>

      <ul className="admin-sidebar-links">
        {ADMIN_LINKS.map((link) => (
          <li key={link.view}>
            <button
              className={activeView === link.view ? 'admin-sidebar-link active' : 'admin-sidebar-link'}
              onClick={() => onNavigate(link.view)}
            >
              {link.label.toUpperCase()}
              {link.view === 'admin-users' && unreviewedCount > 0 && (
                <span className="admin-sidebar-badge">{unreviewedCount}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <button className="admin-sidebar-add-match" onClick={onOpenAddMatchModal}>
        ADD NEW MATCH
      </button>

      <button className="admin-sidebar-logout" onClick={onLogout}>
        LOGOUT
      </button>

      <div className="admin-sidebar-profile">
        <div className="admin-sidebar-avatar" />
        <div>
          <div className="admin-sidebar-profile-name">Admin User</div>
          <div className="admin-sidebar-profile-role">System Manager</div>
        </div>
      </div>
    </aside>
  );
};