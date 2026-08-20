
import React, { useState } from 'react';
import '../styles/ActiveRoster.css';
import { getAssetUrl } from "../api/config";

export const ActiveRoster = ({ players, loading, onSelectPlayer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');

  // Get unique positions from the players
  const positions = [
    'All',
    ...new Set(
      players
        .map((player) => player.position)
        .filter((position) => position)
    ),
  ];

  // Filter players based on search and position
  const filteredPlayers = players.filter((player) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      player.name?.toLowerCase().includes(search) ||
      player.surname?.toLowerCase().includes(search) ||
      player.nickName?.toLowerCase().includes(search) ||
      player.position?.toLowerCase().includes(search);

    const matchesPosition =
      positionFilter === 'All' ||
      player.position === positionFilter;

    return matchesSearch && matchesPosition;
  });

  return (
    <div className="roster-page">
      <h1 className="roster-title">Active Roster</h1>

      {loading && (
        <p className="roster-loading">Loading players...</p>
      )}

      {!loading && players.length === 0 && (
        <p className="roster-empty">No players added yet.</p>
      )}

      {/* Search and Filter */}
      {!loading && players.length > 0 && (
        <div className="roster-controls">

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="roster-search"
            />
          </div>

          {/* Position Filter */}
          <div className="filter-container">
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="roster-filter"
            >
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position === 'All'
                    ? 'All Positions'
                    : position}
                </option>
              ))}
            </select>
          </div>

        </div>
      )}

      {/* Player Grid */}
      <div className="roster-grid">
        {!loading && filteredPlayers.length === 0 && players.length > 0 && (
          <p className="roster-empty">
            No players match your search or filter.
          </p>
        )}

        {filteredPlayers.map((player) => (
          <button
            key={player.id}
            className="player-card"
            onClick={() => onSelectPlayer(player)}
          >
            {/* Player Image - KEPT */}
            {player.imageUrl ? (
              <img src={getAssetUrl(player.imageUrl)} alt={`${player.name} ${player.surname}`}
                style={{
                  width: '100%',
                  height: 250,
                  objectFit: 'cover',
                  borderRadius: 4,
                  marginBottom: '0.75rem',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 250,
                  background: '#eee',
                  borderRadius: 4,
                  marginBottom: '0.75rem',
                }}
              />
            )}

            <p className="player-card-name">
              {player.name} {player.surname}
            </p>

            {player.nickName && (
              <p className="player-card-nick">
                "{player.nickName}"
              </p>
            )}

            <p className="player-card-position">
              {player.position}
            </p>

            <div className="player-card-stats">
              <span>
                <strong>{player.matchesPlayed}</strong> Matches
              </span>

              <span>
                <strong>{player.tries}</strong> Tries
              </span>

              <span>
                <strong>{player.conversions}</strong> Conv.
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

