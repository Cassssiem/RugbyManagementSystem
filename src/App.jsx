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
import { SponsorView } from './components/SponsorView';
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

  // ---- Navigation that the browser's back/forward buttons understand ----
  const navigate = (newView) => {
    window.history.pushState({ view: newView }, '', `#${newView}`);
    setView(newView);
  };

  useEffect(() => {
    window.history.replaceState({ view: 'home' }, '', '#home');
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      setView(e.state?.view || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ---- Load public data on first render ----
  useEffect(() => {
    playersApi
      .getAll()
      .then(setPlayers)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoadingPlayers(false));

    matchesApi
      .getAll()
      .then(setMatches)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoadingMatches(false));
  }, []);

  // ---- Load admin-only data whenever we become logged in as Admin ----
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
    navigate('player-detail');
  };

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
  };

  // ---- Player handlers ----
  const handleAddPlayer = async (newPlayerData) => {
    await playersApi.create(newPlayerData);
    await refreshPlayers();
  };

  const handleUpdatePlayer = async (id, updatedData) => {
    await playersApi.update(id, updatedData);
    await refreshPlayers();
  };

  const handleDeletePlayer = async (id) => {
    await playersApi.delete(id);
    await refreshPlayers();
  };

  // ---- Match handlers ----
  const handleAddMatch = async (newMatchData) => {
    await matchesApi.create(newMatchData);
    await refreshMatches();
  };

  const handleUpdateMatch = async (id, updatedMatch) => {
    await matchesApi.update(id, updatedMatch);
    await refreshMatches();
  };

const handleDeleteMatch = async (matchId) => {
  try {
    await matchesApi.delete(matchId);
  } finally {
    await refreshMatches();
  }
};

  // ---- Sponsor inquiry handlers ----
  const handleAddInquiry = async (inquiryData) => {
    await sponsorsApi.submit(inquiryData);
  };

  const handleReviewInquiry = async (id) => {
    await sponsorsApi.markReviewed(id);
    const fresh = await sponsorsApi.getAll();
    setInquiries(fresh);
  };

  // ---- User handlers ----
  const handleUpdateUser = async (id, updatedUser) => {
    await usersApi.update(id, updatedUser);
    const fresh = await usersApi.getAll();
    setUsers(fresh);
  };

const handleDeleteUser = async (userId) => {
  await usersApi.delete(userId);
  const fresh = await usersApi.getAll();
  setUsers(fresh);
};

const handleDeleteInquiry = async (id) => {
  try {
    await sponsorsApi.delete(id);
  } finally {
    const fresh = await sponsorsApi.getAll();
    setInquiries(fresh);
  }
};

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('matches');
  };

  const isAdminView = [
    'admin-dashboard',
    'admin-matches',
    'admin-players',
    'admin-lineup-editor',
    'admin-match-setup',
    'admin-users',
  ].includes(view);

  // Guard: don't let a non-Admin sit on an admin view
  useEffect(() => {
    if (isAdminView && (!isLoggedIn || !isAdmin)) {
      navigate('auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminView, isLoggedIn, isAdmin]);

  return (
    <div className="app-shell">
      {!isAdminView && (
        <TopNavBar
          activeView={view}
          onNavigate={navigate}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onLogout={handleLogout}
        />
      )}

      <div className={`app-body ${isAdminView ? 'admin-layout' : ''}`}>
        {isAdminView && (
          <AdminSidebar
            activeView={view}
            onNavigate={navigate}
            onOpenAddMatchModal={() => navigate('admin-match-setup')}
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
            <HomeView
              matches={matches}
              loading={loadingMatches}
              onNavigate={navigate}
              onSelectMatch={handleSelectMatch}
            />
          )}

          {view === 'matches' && (
            <MatchesView
              matches={matches}
              loading={loadingMatches}
              onNavigate={navigate}
              onSelectMatch={handleSelectMatch}
            />
          )}

          {view === 'players' && (
            <ActiveRoster
              players={players}
              loading={loadingPlayers}
              onSelectPlayer={handleSelectPlayer}
            />
          )}

          {view === 'player-detail' && selectedPlayer && (
            <PlayerDetail player={selectedPlayer} onBack={() => navigate('players')} />
          )}

          {view === 'lineup-viewer' && (
            <PitchVisualizer
              match={selectedMatch}
              onNavigate={navigate}
              onSelectPlayer={handleSelectPlayer}
            />
          )}

          {view === 'sponsor' && <SponsorView onSubmitInquiry={handleAddInquiry} />}

          {view === 'auth' && (
            <AuthView
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setIsAdmin(getUserRole() === 'Admin');
                navigate('home');
              }}
              onNavigate={navigate}
            />
          )}

          {/* Admin Views */}
          {view === 'admin-dashboard' && (
            <AdminDashboard
              players={players}
              matches={matches}
              inquiries={inquiries}
              onNavigate={navigate}
            />
          )}

          {view === 'admin-matches' && (
            <AdminMatchesView
              matches={matches}
              onNavigate={navigate}
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
              onNavigate={navigate}
              onStatsSaved={refreshPlayers}
            />
          )}

          {view === 'admin-match-setup' && (
            <AdminMatchSetup onAddMatch={handleAddMatch} onNavigate={navigate} />
          )}

          {view === 'admin-users' && (
              <AdminUsers
                users={users}
                inquiries={inquiries}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
                onReviewInquiry={handleReviewInquiry}
                onDeleteInquiry={handleDeleteInquiry}
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