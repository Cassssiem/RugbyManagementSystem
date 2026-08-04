import React, { useState, useEffect } from 'react';
import { playersApi } from './api/players';
import { matchesApi } from './api/matches';
import { sponsorsApi } from './api/sponsors';
import { usersApi } from './api/users';
import { isAuthenticated, logout, getUserRole } from './api/auth';

import { TopNavBar } from './components/TopNavBar';
import { HomeView } from './components/HomeView';
import { MatchesView } from './components/MatchesView';
import { ActiveRoster } from './components/ActiveRoster';
import { PlayerDetail } from './components/PlayerDetail';
import { PitchVisualizer } from './components/PitchVisualizer';
import  SponsorView  from './components/SponsorView.jsx';
import { AuthView } from './components/AuthView';

import { AdminSidebar } from './components/AdminSidebar';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminMatchesView } from './components/AdminMatchesView';
import { AdminPlayers } from './components/AdminPlayers';
import { AdminLineupEditor } from './components/AdminLineupEditor';
import { AdminMatchSetup } from './components/AdminMatchSetup';
import { AdminUsers } from './components/AdminUsers';

import './styles/App.css';

export default function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(getUserRole() === 'Admin');

  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    playersApi.getAll().then(setPlayers).catch((e) => setLoadError(e.message)).finally(() => setLoadingPlayers(false));
    matchesApi.getAll().then(setMatches).catch((e) => setLoadError(e.message)).finally(() => setLoadingMatches(false));
  }, []);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      usersApi.getAll().then(setUsers).catch(() => {});
      sponsorsApi.getAll().then(setInquiries).catch(() => {});
    }
  }, [isLoggedIn, isAdmin]);

  const refreshPlayers = () => playersApi.getAll().then(setPlayers);
  const refreshMatches = () => matchesApi.getAll().then(setMatches);

  const handleSelectPlayer = async (player) => {
    const fresh = await playersApi.getById(player.id);
    setSelectedPlayer(fresh);
    setView('player-detail');
  };

  const handleSelectMatch = (match) => setSelectedMatch(match);

  const handleAddPlayer = async (data) => { await playersApi.create(data); await refreshPlayers(); };
  const handleUpdatePlayer = async (id, data) => { await playersApi.update(id, data); await refreshPlayers(); };
  const handleDeletePlayer = async (id) => { await playersApi.delete(id); await refreshPlayers(); };

  const handleAddMatch = async (data) => { await matchesApi.create(data); await refreshMatches(); };
  const handleUpdateMatch = async (id, data) => { await matchesApi.update(id, data); await refreshMatches(); };
  const handleDeleteMatch = async (id) => { await matchesApi.delete(id); await refreshMatches(); };

  const handleAddInquiry = async (data) => { await sponsorsApi.submit(data); };
  const handleReviewInquiry = async (id) => {
    await sponsorsApi.markReviewed(id);
    setInquiries(await sponsorsApi.getAll());
  };

  const handleUpdateUser = async (id, data) => {
    await usersApi.update(id, data);
    setUsers(await usersApi.getAll());
  };
  const handleDeleteUser = async (id) => {
    await usersApi.delete(id);
    setUsers(await usersApi.getAll());
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setView('matches');
  };

  const isAdminView = [
    'admin-dashboard', 'admin-matches', 'admin-players',
    'admin-lineup-editor', 'admin-match-setup', 'admin-users',
  ].includes(view);

  if (isAdminView && (!isLoggedIn || !isAdmin)) {
    setView('auth');
  }

  return (
    <div className="app-shell">
      {!isAdminView && (
        <TopNavBar activeView={view} onNavigate={setView} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}

      <div className={`app-body ${isAdminView ? 'admin-layout' : ''}`}>
        {isAdminView && (
          <AdminSidebar
              activeView={view}
              onNavigate={setView}
              onOpenAddMatchModal={() => setView('admin-match-setup')}
              onLogout={handleLogout}
              unreviewedCount={inquiries.filter((i) => !i.reviewed).length}
            />
        )}

        <main className="app-main">
          {loadError && (
            <div className="app-load-error">
              Couldn't reach the server: {loadError}. Confirm the backend is running and CORS is configured.
            </div>
          )}

          {view === 'home' && (
            <HomeView matches={matches} loading={loadingMatches} onNavigate={setView} onSelectMatch={handleSelectMatch} />
          )}
          {view === 'matches' && (
            <MatchesView
              matches={matches}
              loading={loadingMatches}
              onSelectMatch={handleSelectMatch}
              onNavigate={setView}
            />
          )}
          {view === 'players' && (
            <ActiveRoster players={players} loading={loadingPlayers} onSelectPlayer={handleSelectPlayer} />
          )}
          {view === 'player-detail' && selectedPlayer && (
            <PlayerDetail player={selectedPlayer} onBack={() => setView('players')} />
          )}
          {view === 'lineup-viewer' && (
            <PitchVisualizer match={selectedMatch} onNavigate={setView} onSelectPlayer={handleSelectPlayer} />
          )}
          {view === 'sponsor' && <SponsorView onSubmitInquiry={handleAddInquiry} />}
          {view === 'auth' && (
            <AuthView
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setIsAdmin(getUserRole() === 'Admin');
                setView('admin-dashboard');
              }}
              onNavigate={setView}
            />
          )}

          {view === 'admin-dashboard' && (
            <AdminDashboard players={players} matches={matches} inquiries={inquiries} onNavigate={setView} />
          )}
          {view === 'admin-matches' && (
            <AdminMatchesView
              matches={matches}
              onNavigate={setView}
              onSelectMatch={handleSelectMatch}
              onUpdateMatch={handleUpdateMatch}
              onDeleteMatch={handleDeleteMatch}
            />
          )}
          {view === 'admin-players' && (
            <AdminPlayers
              players={players}
              onAddPlayer={handleAddPlayer}
              onUpdatePlayer={handleUpdatePlayer}
              onDeletePlayer={handleDeletePlayer}
            />
          )}
          {view === 'admin-lineup-editor' && (
            <AdminLineupEditor
              players={players}
              selectedMatch={selectedMatch}
              onNavigate={setView}
              onStatsSaved={refreshPlayers}
            />
          )}
          {view === 'admin-match-setup' && (
            <AdminMatchSetup onAddMatch={handleAddMatch} onNavigate={setView} />
          )}
          {view === 'admin-users' && (
            <AdminUsers
              users={users}
              inquiries={inquiries}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
              onReviewInquiry={handleReviewInquiry}
            />
          )}
        </main>
      </div>

      {!isAdminView && (
        <footer className="app-footer">
          <div className="app-footer-inner">
            <p>© 2026 Titans Rugby Management. All Rights Reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}