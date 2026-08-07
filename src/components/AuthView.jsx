import React, { useState } from 'react';
import { login, getUsername } from '../api/auth';
import { usersApi } from '../api/users';
import '../styles/AuthView.css';

export const AuthView = ({ onLoginSuccess, onNavigate }) => {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState(null); // set once login succeeds

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      setLoggedInAs(getUsername() || username);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await usersApi.register(username, password);
      await login(username, password);
      setLoggedInAs(getUsername() || username);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Show the welcome screen once logged in, instead of immediately navigating away
  if (loggedInAs) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">Welcome, {loggedInAs}!</h2>
          <p className="auth-subtitle">You're successfully signed in.</p>
          <button
            className="auth-submit"
            onClick={() => onLoginSuccess()}
          >
            Continue to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Access the Titans management dashboard.'
            : 'Join the Titans platform.'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="auth-form">
          <div>
            <label className="auth-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div>
            <label className="auth-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="auth-input"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => {
            setError(null);
            setMode(mode === 'login' ? 'register' : 'login');
          }}
          className="auth-toggle"
        >
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Sign in'}
        </button>

        <button onClick={() => onNavigate('home')} className="auth-back">
          ← Back to home
        </button>
      </div>
    </div>
  );
};