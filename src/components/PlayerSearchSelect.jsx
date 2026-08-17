import React, { useState, useRef, useEffect } from 'react';
import '../styles/PlayerSearchSelect.css';

export const PlayerSearchSelect = ({ players, value, onChange, placeholder = 'Select a player...' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedPlayer = players.find((p) => p.id === value);

  const filtered = players.filter((p) => {
    const fullName = `${p.name} ${p.surname}`.toLowerCase();
    return fullName.includes(query.toLowerCase());
  });

  // Close the dropdown if you click anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (player) => {
    onChange(player.id);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="player-search" ref={wrapperRef}>
      <input
        type="text"
        className="player-search-input"
        placeholder={placeholder}
        value={isOpen ? query : (selectedPlayer ? `${selectedPlayer.name} ${selectedPlayer.surname}` : '')}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setQuery('');
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <div className="player-search-dropdown">
          {filtered.length === 0 && (
            <div className="player-search-empty">No players match "{query}"</div>
          )}
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              className="player-search-option"
              onClick={() => handleSelect(p)}
            >
              {p.name} {p.surname}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};