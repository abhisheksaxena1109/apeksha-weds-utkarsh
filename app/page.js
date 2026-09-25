'use client';

import { useState } from 'react';

const initialForm = {
  fullName: '',
  phoneNumber: '',
  attendance: 'attending',
  guestCount: 1,
  dietaryNotes: ''
};

export default function HomePage() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong.');
      }

      setStatus({
        type: 'success',
        message: result.message || 'Your RSVP has been received.'
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit RSVP.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <nav className="topbar">
        <div className="brand">
          <span className="brand-name">Apeksha</span>
          <span className="heart">&hearts;</span>
          <span className="brand-name">Utkarsh</span>
        </div>

        <div className="tab-menu" aria-label="Main navigation">
          <button className="tab active" type="button">RSVP</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Wedding Celebration</p>
          <h1>With love, we invite you to celebrate our forever.</h1>
          <div className="detail-row">
            <span>November 24, 2026</span>
            <span>•</span>
            <span>Ambala Cantt, India</span>
          </div>
          <p className="intro-text">
            Your presence will make our day even more magical. Please kindly RSVP for the celebration.
          </p>
        </div>

        <div className="hero-ornament" aria-hidden="true">
          <div className="flower flower-one" />
          <div className="flower flower-two" />
          <div className="flower flower-three" />
        </div>
      </section>

      <section className="rsvp-panel">
        <div className="panel-header">
          <p className="eyebrow dark">RSVP</p>
          <h2>We can’t wait to celebrate with you</h2>
        </div>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="field-grid">
            <label>
              Full name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your phone number"
                required
              />
            </label>

            <label>
              Attendance
              <select name="attendance" value={formData.attendance} onChange={handleChange}>
                <option value="attending">Joyfully attending</option>
                <option value="declining">Regretfully declining</option>
                <option value="maybe">Maybe</option>
              </select>
            </label>

            <label>
              Guests
              <input
                type="number"
                name="guestCount"
                min="1"
                max="10"
                value={formData.guestCount}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Dietary notes
            <textarea
              name="dietaryNotes"
              value={formData.dietaryNotes}
              onChange={handleChange}
              rows="4"
              placeholder="Vegetarian, vegan, allergies, or any special requests"
            />
          </label>

          {status.message ? (
            <div className={`status-box ${status.type}`}>{status.message}</div>
          ) : null}

          <button className="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending RSVP...' : 'Submit RSVP'}
          </button>
        </form>
      </section>
    </main>
  );
}
