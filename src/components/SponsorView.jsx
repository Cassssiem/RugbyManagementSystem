import React, { useState } from 'react';
import { sponsorsApi } from '../api/sponsors';
import '../styles/SponsorView.css';
const NAME_PATTERN = /^[a-zA-Z\s'-]+$/;
const PHONE_PATTERN = /^[0-9]*$/;



export const SponsorView = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };


  
const looksLikeRealWords = (text) => {
  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 5) return false;

  const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length;
  const vowelRatio = vowels / letters.length;
  if (vowelRatio < 0.15 || vowelRatio > 0.75) return false;

  let consonantStreak = 0;
  for (const c of letters) {
    if (!/[aeiouAEIOU]/.test(c)) {
      consonantStreak++;
      if (consonantStreak > 5) return false;
    } else {
      consonantStreak = 0;
    }
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return wordCount >= 2;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (!NAME_PATTERN.test(form.name)) {
    setError('Name can only contain letters, spaces, hyphens, and apostrophes.');
    return;
  }
  if (!looksLikeRealWords(form.message)) {
    setError('Please enter a real message, not random characters.');
    return;
  }
    if (!looksLikeRealWords(form.message)) {
    setError('Please enter a real message, not random characters.');
    return;
  }

  setSaving(true);
  try {
    await sponsorsApi.submit(form);
    setSubmitted(true);
  } catch (err) {
    setError(err.message || 'Something went wrong. Please try again.');
  } finally {
    setSaving(false);
  }
};

  if (submitted) {
    return (
      <div className="sponsor-page">
        <div className="sponsor-card">
          <h1 className="sponsor-title">Thank You!</h1>
          <p>Your sponsorship inquiry has been received. We'll be in touch soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sponsor-page">
      <div className="sponsor-card">
        <h1 className="sponsor-title">Sponsor Us</h1>
        <p className="sponsor-subtitle">
          Interested in supporting the Titans? Send us a message and we'll get back to you.
        </p>

        {error && <div className="sponsor-error">{error}</div>}

        <form className="sponsor-form" onSubmit={handleSubmit}>
          <div className="sponsor-field">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="sponsor-field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="sponsor-field">
            <label>Phone (optional)</label>
            <input
              name="phone"
              value={form.phone}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
                setForm((f) => ({ ...f, phone: digitsOnly }));
              }}
            />
          </div>

          <div className="sponsor-field">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              minLength={10}
              required
            />
          </div>

          <button type="submit" className="sponsor-submit" disabled={saving}>
            {saving ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};