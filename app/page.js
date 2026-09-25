'use client';

import { useEffect, useState } from 'react';

const labels = {
  nav: ['RSVP', 'Events', 'Hotel Check-In', 'Admin']
};

function WeddingLogo({ size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        boxShadow: '0 0 0 1px rgba(156,18,68,0.12)',
        flexShrink: 0
      }}
    >
      <img
        src="/wedding-logo-fresh.png"
        alt="Apeksha and Utkarsh monogram"
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </div>
  );
}

function Nav({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tabs = [
    { label: 'RSVP', page: 'rsvp' },
    { label: 'Events', page: 'events' },
    { label: 'Admin', page: 'admin' }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        background: '#FBF5E6',
        borderBottom: '1px solid #E8C96A',
        boxShadow: scrolled ? '0 2px 16px rgba(156,18,68,0.08)' : 'none'
      }}
    >
      <div className="w-full px-6 h-24 flex items-center">
        <button onClick={() => setPage('rsvp')} className="flex items-center gap-4 group flex-shrink-0">
          <WeddingLogo size={48} />
          <div className="text-left">
            <p className="font-script text-[#9C1244] leading-none" style={{ fontSize: '1.7rem' }}>
              Apeksha &amp; Utkarsh
            </p>
            <p className="font-display text-[10px] tracking-[0.22em] text-[#C5930A] uppercase leading-none mt-1">
              23 &amp; 24 November 2026
            </p>
          </div>
        </button>

        <div className="hidden md:flex items-center justify-end gap-1" style={{ marginLeft: 'auto' }}>
          {tabs.map((tab) => (
            <button
              key={tab.page}
              onClick={() => setPage(tab.page)}
              className="relative px-5 py-3 font-display text-[10px] tracking-[0.18em] uppercase transition-colors"
              style={{ color: page === tab.page ? '#9C1244' : '#7A6A5A' }}
            >
              {tab.label}
              {page === tab.page && (
                <span
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #9C1244, #C2185B)' }}
                />
              )}
            </button>
          ))}
        </div>

        <button className="md:hidden text-[#9C1244]" onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#E8C96A]" style={{ background: '#FBF5E6' }}>
          {tabs.map((tab) => (
            <button
              key={tab.page}
              onClick={() => {
                setPage(tab.page);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-3 font-display text-[10px] tracking-[0.18em] uppercase border-b border-[#F3E8CC]"
              style={{ color: page === tab.page ? '#9C1244' : '#7A6A5A' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Countdown() {
  const target = new Date('2026-11-24T00:00:00');

  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };
  };

  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => setTime(calc());
    updateCountdown();
    setIsMounted(true);

    const id = setInterval(updateCountdown, 1000);
    return () => clearInterval(id);
  }, []);

  const displayTime = isMounted ? time : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #8B1136 0%, #9C1244 35%, #B3154A 100%)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-display text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: '#F7EAD1' }}>
          Until We Say I Do
        </p>
        <h2 className="font-script mb-10" style={{ fontSize: '3.6rem', color: '#F3E2C7' }}>
          The Countdown Begins
        </h2>
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {[
            { value: displayTime.days, label: 'Days' },
            { value: displayTime.hours, label: 'Hours' },
            { value: displayTime.minutes, label: 'Minutes' },
            { value: displayTime.seconds, label: 'Seconds' }
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div
                className="w-full aspect-square flex items-center justify-center mb-3"
                style={{
                  border: '1px solid rgba(197,147,10,0.4)',
                  background: 'rgba(255,255,255,0.05)'
                }}
              >
                <span
                  className="font-display font-semibold"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: '#F9F1E4' }}
                >
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="font-display text-[10px] tracking-[0.2em] uppercase" style={{ color: '#F7EAD1' }}>
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RSVPPage({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    guests: 1
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const normalizedPhone = form.phone.replace(/\D/g, '');
    if (normalizedPhone.length !== 10) {
      setSubmitError('Phone number must contain exactly 10 digits.');
      return;
    }

    const payload = {
      id: crypto.randomUUID(),
      fullName: form.name,
      phoneNumber: normalizedPhone,
      attendance: form.attending,
      guestCount: form.guests,
      createdAt: new Date().toISOString()
    };

    try {
      if (onSubmit) {
        const result = await onSubmit(payload);
        if (result?.ok === false) {
          throw new Error(result?.message || 'Unable to save RSVP.');
        }
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message || 'Unable to save RSVP. Please try again.');
    }
  };

  const field = [
    'w-full px-4 py-3.5 bg-white border border-[#E8C96A] font-body text-lg text-[#1A1A6E]',
  ].join(' ');

  return (
    <div className="pt-16">
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #8B1136 0%, #9C1244 35%, #B3154A 100%)',
          borderBottom: '1px solid rgba(247,234,209,0.35)'
        }}
      >
        <div className="max-w-3xl mx-auto min-h-[320px] px-6 py-16 flex flex-col items-center justify-center text-center">
          <div
            className="flex items-center justify-center rounded-full border mb-5"
            style={{
              width: '92px',
              height: '92px',
              background: 'rgba(255,255,255,0.08)',
              borderColor: 'rgba(247,234,209,0.45)'
            }}
          >
            <WeddingLogo size={64} />
          </div>
          <h1 className="font-script mb-2" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', color: '#F7EAD1', lineHeight: 1.1 }}>
            Apeksha &amp; Utkarsh
          </h1>
          <p className="font-display text-[11px] tracking-[0.3em] uppercase" style={{ color: '#F7EAD1' }}>
            23 &amp; 24 November 2026 · Regenta Marrievilla, Ambala Cantt
          </p>
        </div>
      </div>

      <section className="py-16 px-6 bg-[#FBF5E6]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-display text-[11px] tracking-[0.3em] text-[#C5930A] uppercase mb-3">
              Kindly Revert By October 24, 2026
            </p>
            <h2 className="font-script text-[#9C1244]" style={{ fontSize: '4.2rem' }}>
              RSVP
            </h2>
            <p className="font-body text-[#7A6A5A] text-lg mt-3">
              We'd love to have you celebrate with us
            </p>
            <p className="font-body text-[#7A6A5A] text-base mt-3 italic">
              Kindly note: only one person per family is requested to fill out this form.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 border border-[#E8C96A] bg-white">
              <div
                className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(156,18,68,0.1)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5 9-9" stroke="#9C1244" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-script text-[#9C1244] mb-3" style={{ fontSize: '2.4rem' }}>
                Thank You, {form.name}!
              </h3>
              <p className="font-body text-[#7A6A5A] text-lg leading-8">
                {form.attending === 'yes'
                  ? "We're overjoyed you'll be joining us. See you on November 23rd!"
                  : 'We understand and will miss you dearly. Thank you for letting us know.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#E8C96A] p-8 space-y-5">
              {submitError && (
                <div
                  style={{
                    border: '1px solid #fca5a5',
                    background: '#fef2f2',
                    color: '#dc2626',
                    borderRadius: '0.375rem',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  {submitError}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[10px] tracking-[0.2em] text-[#7A6A5A] uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className={field}
                  />
                </div>
                <div>
                  <label className="block font-display text-[10px] tracking-[0.2em] text-[#7A6A5A] uppercase mb-2">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="9876543210"
                    className={field}
                  />
                </div>
              </div>

              <div>
                <label className="block font-display text-[10px] tracking-[0.2em] text-[#7A6A5A] uppercase mb-2">
                  Will you attend?
                </label>
                <div className="flex gap-6">
                  {['yes', 'no'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => setForm({ ...form, attending: option })}
                        className="w-5 h-5 flex-shrink-0 flex items-center justify-center cursor-pointer border transition-colors"
                        style={{
                          borderColor: form.attending === option ? '#9C1244' : '#E8C96A',
                          background: form.attending === option ? '#9C1244' : 'white'
                        }}
                      >
                        {form.attending === option && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <span className="font-body text-lg text-[#1A1A6E]">
                        {option === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {form.attending === 'yes' && (
                <div>
                  <label className="block font-display text-[10px] tracking-[0.2em] text-[#7A6A5A] uppercase mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                    className={field}
                  >
                    {[1, 2, 3, 4, 5].map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 font-display text-[12px] tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #9C1244 0%, #C2185B 100%)' }}
              >
                Send RSVP
              </button>
            </form>
          )}
        </div>
      </section>

      <Countdown />

      <section className="py-20 px-6 bg-[#FBF5E6]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-display text-[11px] tracking-[0.3em] text-[#C5930A] uppercase mb-3">
              Get In Touch
            </p>
            <h2 className="font-script text-[#9C1244]" style={{ fontSize: '4rem' }}>
              Contact Us
            </h2>
            <p className="font-body text-[#7A6A5A] text-lg mt-2">
              Have questions? We're happy to help.
            </p>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-5 md:gap-6 items-stretch">
              {[
                { name: 'Ajay Veer Saxena', number: '+91 9717632285', note: 'Call or WhatsApp' },
                { name: 'Anjana Saxena', number: '+91 7303503198', note: 'Call or WhatsApp' },
                { name: 'Kartik Saxena', number: '+91 7080167996', note: 'Call or WhatsApp' },
                { name: 'Saumya Saxena', number: '+91 7827007265', note: 'Call or WhatsApp' },
                { name: 'Abhishek Saxena', number: '+91 8287921835', note: 'Call or WhatsApp' }
              ].map((person, index) => (
                <div
                  key={`${person.name}-${index}`}
                  className="flex flex-col items-center text-center p-7 border border-[#E8C96A] bg-white"
                  style={{ minHeight: '290px', minWidth: '220px', width: 'min(100%, 250px)' }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mb-5" style={{ background: 'rgba(156,18,68,0.07)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9C1244" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.83a16 16 0 006.06 6.06l1.2-1.19a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.03z" />
                    </svg>
                  </div>
                  <p className="font-display text-[10px] tracking-[0.2em] text-[#C5930A] uppercase mb-4">
                    {person.name}
                  </p>
                  <p className="font-body text-[#1A1A6E] text-lg font-medium leading-snug mb-4 break-words">
                    {person.number}
                  </p>
                  <p className="font-body text-[#7A6A5A] text-base">{person.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-[#E8C96A]" style={{ background: '#F3E8CC' }}>
        <WeddingLogo size={44} />
        <p className="font-script text-[#9C1244] mt-3" style={{ fontSize: '1.8rem' }}>
          Apeksha &amp; Utkarsh
        </p>
        <p className="font-display text-[9px] tracking-[0.22em] text-[#C5930A] uppercase mt-1">
          23 &amp; 24 November 2026
        </p>
        <p className="font-body text-xs text-[#7A6A5A] mt-1">
          Regenta Marrievilla · Ambala Cantt
        </p>
      </footer>
    </div>
  );
}

function EventsPage() {
  const events = [
    {
      title: 'Haldi',
      emoji: '🌼',
      date: 'November 23, 2026',
      time: '11:00 AM Onwards',
      venue: 'Poolside, Regenta Marrievilla, Ambala Cantt',
      attire: 'Shades of Yellow',
      attireNote: "Wear cheerful yellows, or different shades of yellow. Avoid anything you're precious about — it's a colourful affair!",
      color: '#B8860B',
      accentBg: 'rgba(232,201,106,0.15)',
      image: '1519741196428-6a2175fa2557'
    },
    {
      title: 'Engagement & Sangeet',
      emoji: '💍',
      date: 'November 23, 2026',
      time: '7:00 PM Onwards',
      venue: 'Orchid Hall, Regenta Marrievilla, Ambala Cantt',
      attire: 'Glam and Glitz',
      attireNote: 'Throw on your sparkles, sequins, and shimmer. Think Bollywood glam with a touch of elegance.',
      color: '#9C1244',
      accentBg: 'rgba(156,18,68,0.07)',
      image: '1621621668101-d5c8329b3784'
    },
    {
      title: 'The Wedding',
      emoji: '💒',
      date: 'November 24, 2026',
      time: '12:30 PM Onwards',
      venue: 'Signature Hall,Regenta Marrievilla, Ambala Cantt',
      attire: 'Elegant Traditionals',
      attireNote: 'Sherwanis, sarees, lehengas or formal ethnic wear. Avoid all-white and all-black.',
      color: '#1A1A6E',
      accentBg: 'rgba(26,26,110,0.06)',
      image: '1591604442449-ecc9943efabf'
    }
  ];

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#FBF5E6' }}>
      <div
        className="py-14 px-6 text-center"
        style={{ background: 'linear-gradient(180deg, #F3E8CC 0%, #FBF5E6 100%)', borderBottom: '1px solid #E8C96A' }}
      >
        <p className="font-display text-[10px] tracking-[0.3em] text-[#C5930A] uppercase mb-2">
          23 &amp; 24 November 2026
        </p>
        <h1 className="font-script text-[#9C1244]" style={{ fontSize: '3.2rem' }}>
          Wedding Celebrations
        </h1>
        <p className="font-body text-[#7A6A5A] text-sm mt-2 max-w-md mx-auto">
          Three unforgettable ceremonies — each with its own magic, traditions, dress code, and memories to be made.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-6 items-start">
        {events.map((event, index) => (
          <div
            key={event.title}
            className="flex flex-col border border-[#E8C96A] overflow-hidden"
            style={{ background: 'white', boxShadow: '0 2px 20px rgba(156,18,68,0.05)', display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            <div className="p-8 flex flex-col gap-5 flex-1 w-full items-center text-center">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <p className="text-xl" style={{ margin: 0 }}>{event.emoji}</p>
                <h3 className="font-script" style={{ color: event.color, fontSize: '2.4rem', lineHeight: 1.1, margin: 0 }}>
                  {event.title}
                </h3>
                <p className="font-display text-[9px] tracking-[0.18em] uppercase" style={{ color: event.color, margin: 0 }}>
                  {event.date}
                </p>
              </div>

              <div className="space-y-4 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="flex items-start gap-3 text-center" style={{ maxWidth: '260px' }}>
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: event.accentBg }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={event.color} strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-[8px] tracking-[0.15em] text-[#7A6A5A] uppercase">Time</p>
                    <p className="font-body text-sm text-[#1A1A6E] mt-0.5">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-center" style={{ maxWidth: '260px' }}>
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: event.accentBg }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={event.color} strokeWidth="1.8">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-[8px] tracking-[0.15em] text-[#7A6A5A] uppercase">Venue</p>
                    <p className="font-body text-sm text-[#1A1A6E] mt-0.5">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-center" style={{ maxWidth: '260px' }}>
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: event.accentBg }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={event.color} strokeWidth="1.8">
                      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-[8px] tracking-[0.15em] text-[#7A6A5A] uppercase">Attire</p>
                    <p className="font-body text-sm font-medium mt-0.5" style={{ color: event.color }}>
                      {event.attire}
                    </p>
                    <p className="font-body text-xs text-[#7A6A5A] mt-1 leading-5">{event.attireNote}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${event.color}, transparent)` }} />
          </div>
        ))}
      </div>

      <footer className="py-10 text-center border-t border-[#E8C96A] mt-4" style={{ background: '#F3E8CC' }}>
        <WeddingLogo size={44} />
        <p className="font-script text-[#9C1244] mt-3" style={{ fontSize: '1.8rem' }}>
          Apeksha &amp; Utkarsh
        </p>
        <p className="font-display text-[9px] tracking-[0.22em] text-[#C5930A] uppercase mt-1">
          23 &amp; 24 November 2026
        </p>
        <p className="font-body text-xs text-[#7A6A5A] mt-1">
          Regenta Marrievilla · Ambala Cantt
        </p>
      </footer>
    </div>
  );
}

function HotelPage({ onSubmit }) {
  const [form, setForm] = useState({ name: '', hotelName: '', roomNumber: '' });
  const [submitted, setSubmitted] = useState(false);

  const hotels = [
    'Regenta Marrievilla, Ambala Cantt',
    'Hotel Skylark, Ambala',
    'Hotel Kwality, Ambala Cantt',
    'The Pearl Suites, Ambala',
    'Hotel Maharaja, Ambala',
    'Other'
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      id: crypto.randomUUID(),
      ...form,
      checkedInAt: new Date().toLocaleString()
    };

    if (onSubmit) {
      onSubmit(payload);
    }

    setSubmitted(true);
  };

  const field = 'w-full px-4 py-3 bg-white border border-[#E8C96A] font-body text-sm text-[#1A1A6E] placeholder-[#B8A898] focus:outline-none focus:border-[#9C1244] focus:ring-1 focus:ring-[#9C1244]/20';

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#FBF5E6' }}>
      <div
        className="py-14 px-6 text-center"
        style={{ background: 'linear-gradient(180deg, #F3E8CC 0%, #FBF5E6 100%)', borderBottom: '1px solid #E8C96A' }}
      >
        <p className="font-display text-[10px] tracking-[0.3em] text-[#C5930A] uppercase mb-2">
          November 22–25, 2026
        </p>
        <h1 className="font-script text-[#9C1244]" style={{ fontSize: '3.2rem' }}>
          Hotel Check-In
        </h1>
        <p className="font-body text-[#7A6A5A] text-sm mt-2">
          Let us know your stay details so we can reach you
        </p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-14">
        {submitted ? (
          <div className="text-center py-12 border border-[#E8C96A] bg-white">
            <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: 'rgba(156,18,68,0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5 9-9" stroke="#9C1244" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-script text-[#9C1244] mb-2" style={{ fontSize: '2rem' }}>
              Welcome, {form.name}!
            </h3>
            <p className="font-body text-[#7A6A5A] text-sm leading-7">
              You're all set at <strong className="text-[#1A1A6E]">{form.hotelName}</strong>, Room{' '}
              <strong className="text-[#9C1244]">{form.roomNumber}</strong>. See you at the celebration!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#E8C96A] p-8 space-y-5">
            <div>
              <label className="block font-display text-[9px] tracking-[0.2em] text-[#7A6A5A] uppercase mb-1.5">
                Your Full Name *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="As per reservation"
                className={field}
              />
            </div>
            <div>
              <label className="block font-display text-[9px] tracking-[0.2em] text-[#7A6A5A] uppercase mb-1.5">
                Hotel *
              </label>
              <select
                required
                value={form.hotelName}
                onChange={(e) => setForm({ ...form, hotelName: e.target.value })}
                className={field}
              >
                <option value="">Select your hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel} value={hotel}>
                    {hotel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-display text-[9px] tracking-[0.2em] text-[#7A6A5A] uppercase mb-1.5">
                Room Number *
              </label>
              <input
                required
                value={form.roomNumber}
                onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                placeholder="e.g. 205 or Suite 8"
                className={field}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 font-display text-[11px] tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #9C1244 0%, #C2185B 100%)' }}
            >
              Confirm Check-In
            </button>
          </form>
        )}
      </div>

      <footer className="py-10 text-center border-t border-[#E8C96A]" style={{ background: '#F3E8CC' }}>
        <WeddingLogo size={44} />
        <p className="font-script text-[#9C1244] mt-3" style={{ fontSize: '1.8rem' }}>
          Apeksha &amp; Utkarsh
        </p>
        <p className="font-display text-[9px] tracking-[0.22em] text-[#C5930A] uppercase mt-1">
          23 &amp; 24 November 2026
        </p>
      </footer>
    </div>
  );
}

function AdminPage({ rsvps, hotels }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('rsvp');
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(rsvps || []);

  const loadRows = async () => {
    try {
      const response = await fetch('/api/rsvp');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to load RSVPs.');
      }

      const nextRows = Array.isArray(result?.data) ? result.data : [];
      setRows(
        nextRows.map((entry) => {
          const attendanceValue = String(entry.attendance || '').toLowerCase();
          const attending = ['yes', 'attending', 'accept', 'joyfully accept', 'accepted'].includes(attendanceValue)
            ? 'yes'
            : 'no';

          return {
            id: entry.id || crypto.randomUUID(),
            name: entry.full_name || 'Guest',
            phone: entry.phone_number || 'N/A',
            attending,
            guests: Number(entry.guest_count ?? 1),
            message: entry.dietary_notes || '',
            submittedAt: entry.created_at ? new Date(entry.created_at).toLocaleString() : '—'
          };
        })
      );
    } catch (fetchError) {
      console.error('Admin RSVP fetch failed:', fetchError);
      setRows([]);
    }
  };

  useEffect(() => {
    setRows(rsvps || []);
  }, [rsvps]);

  useEffect(() => {
    if (!authed) return;
    loadRows();
  }, [authed]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (password === 'wedding2026') {
      setError('');
      setAuthed(true);
      await loadRows();
    } else {
      setError('Incorrect password.');
    }
  };

  const field = 'w-full px-4 py-3 bg-white border border-[#E8C96A] font-body text-sm text-[#1A1A6E] placeholder-[#B8A898] focus:outline-none focus:border-[#9C1244] focus:ring-1 focus:ring-[#9C1244]/20';

  if (!authed) {
    return (
      <div className="pt-16 min-h-screen bg-[#FBF5E6] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <WeddingLogo size={56} />
            <h2 className="font-script text-[#9C1244] mt-4" style={{ fontSize: '3rem' }}>
              Admin Access
            </h2>
            <p className="font-body text-lg text-[#7A6A5A]">Wedding guest dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white border border-[#E8C96A] p-8 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={field}
            />
            {error && <p className="font-body text-xs text-[#9C1244]">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 font-display text-[10px] tracking-[0.2em] uppercase text-white hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1A1A6E, #2E2E8A)' }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const attending = rows.filter((entry) => entry.attending === 'yes');
  const totalGuests = attending.reduce((sum, entry) => sum + entry.guests, 0);

  const filteredRsvps = rows.filter(
    (entry) =>
      (entry.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (entry.phone || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredHotels = hotels.filter(
    (entry) =>
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.hotelName.toLowerCase().includes(search.toLowerCase())
  );

  const thStyle = 'px-4 py-3 text-left font-display text-[8px] tracking-[0.2em] text-[#7A6A5A] uppercase';
  const tdStyle = 'px-4 py-3 font-body text-sm';

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#F3E8CC' }}>
      <div className="px-6 py-8" style={{ background: 'linear-gradient(135deg, #8B1136 0%, #9C1244 35%, #B3154A 100%)', minHeight: '210px', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-2">
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <h1 className="font-script" style={{ fontSize: '3rem', lineHeight: 1.1, color: '#F7EAD1', margin: 0 }}>
              Guest Dashboard
            </h1>
            <p className="font-display text-[11px] tracking-[0.2em] uppercase mt-4" style={{ color: '#F7EAD1', marginBottom: 0 }}>
              Apeksha &amp; Utkarsh · November 2026
            </p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="self-start font-display text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 hover:bg-white/10 transition-colors border"
            style={{ color: '#F7EAD1', borderColor: 'rgba(247,234,209,0.7)', background: 'transparent', marginTop: '0.5rem', marginBottom: '0.5rem' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total RSVPs', value: rows.length, color: '#C5930A' },
            { label: 'Attending', value: attending.length, color: '#2E6E2A' },
            { label: 'Declining', value: rows.filter((entry) => entry.attending === 'no').length, color: '#9C1244' },
            { label: 'Guest Count', value: totalGuests, color: '#1A1A6E' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#E8C96A] p-6" style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <p className="font-display text-[8px] tracking-[0.18em] text-[#7A6A5A] uppercase mb-4" style={{ marginTop: 0 }}>
                {stat.label}
              </p>
              <p className="font-script" style={{ color: stat.color, fontSize: '2.8rem', lineHeight: 1, margin: 0 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E8C96A] px-5 py-5 mb-8 flex items-center gap-4" style={{ marginTop: '0.5rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5930A" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-display text-[9px] tracking-[0.18em] text-[#7A6A5A] uppercase">
            Hotel Check-Ins
          </span>
          <span className="font-script text-[#C5930A] ml-auto" style={{ fontSize: '2rem', lineHeight: 1 }}>
            {hotels.length}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8" style={{ marginTop: '0.75rem' }}>
          <div className="flex border border-[#E8C96A] overflow-hidden">
            {['rsvp', 'hotel'].map((view) => (
              <button
                key={view}
                onClick={() => setTab(view)}
                className="px-5 py-3 font-display text-[9px] tracking-[0.15em] uppercase transition-colors"
                style={
                  tab === view
                    ? { background: 'linear-gradient(135deg, #9C1244, #C2185B)', color: 'white' }
                    : { background: 'white', color: '#7A6A5A' }
                }
              >
                {view === 'rsvp' ? `RSVP (${rows.length})` : `Hotels (${hotels.length})`}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="border border-[#E8C96A] bg-white px-4 py-3 font-body text-sm text-[#1A1A6E] placeholder-[#B8A898] focus:outline-none focus:border-[#9C1244] w-full sm:w-60"
          />
        </div>

        {tab === 'rsvp' && (
          <div className="bg-white border border-[#E8C96A] overflow-hidden">
            {filteredRsvps.length === 0 ? (
              <p className="py-14 text-center font-script text-[#B8A898]" style={{ fontSize: '1.4rem' }}>
                {rows.length === 0 ? 'No RSVPs yet.' : 'No results found.'}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#F3E8CC', borderBottom: '1px solid #E8C96A' }}>
                    <tr>
                      {['Name', 'Phone', 'Status', 'Guests', 'Received'].map((heading) => (
                        <th key={heading} className={thStyle}>
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRsvps.map((entry, index) => (
                      <tr key={entry.id} className="border-b border-[#F3E8CC] hover:bg-[#FBF5E6] transition-colors" style={{ background: index % 2 === 0 ? 'white' : '#FDFAF5', lineHeight: '1.7' }}>
                        <td className={`${tdStyle} text-[#1A1A6E] font-medium`}>{entry.name}</td>
                        <td className={`${tdStyle} text-[#7A6A5A]`}>{entry.phone || '—'}</td>
                        <td className={tdStyle}>
                          <span
                            className="inline-block px-2 py-0.5 font-display text-[8px] tracking-[0.1em] uppercase"
                            style={
                              entry.attending === 'yes'
                                ? { background: 'rgba(46,110,42,0.12)', color: '#2E6E2A' }
                                : { background: 'rgba(156,18,68,0.1)', color: '#9C1244' }
                            }
                          >
                            {entry.attending === 'yes' ? 'Attending' : 'Declining'}
                          </span>
                        </td>
                        <td className={`${tdStyle} text-[#1A1A6E]`}>{entry.attending === 'yes' ? entry.guests : '—'}</td>
                        <td className={`${tdStyle} text-[#B8A898] text-xs`}>{entry.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'hotel' && (
          <div className="bg-white border border-[#E8C96A] overflow-hidden">
            {filteredHotels.length === 0 ? (
              <p className="py-14 text-center font-script text-[#B8A898]" style={{ fontSize: '1.4rem' }}>
                {hotels.length === 0 ? 'No check-ins yet.' : 'No results found.'}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#F3E8CC', borderBottom: '1px solid #E8C96A' }}>
                    <tr>
                      {['Guest Name', 'Hotel', 'Room', 'Checked In'].map((heading) => (
                        <th key={heading} className={thStyle}>
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHotels.map((entry, index) => (
                      <tr key={entry.id} className="border-b border-[#F3E8CC] hover:bg-[#FBF5E6] transition-colors" style={{ background: index % 2 === 0 ? 'white' : '#FDFAF5', lineHeight: '1.7' }}>
                        <td className={`${tdStyle} text-[#1A1A6E] font-medium`}>{entry.name}</td>
                        <td className={`${tdStyle} text-[#7A6A5A]`}>{entry.hotelName}</td>
                        <td className={tdStyle}>
                          <span className="inline-block px-2 py-0.5 font-display text-[8px] tracking-[0.1em] uppercase" style={{ background: 'rgba(197,147,10,0.12)', color: '#7A5A00' }}>
                            Room {entry.roomNumber}
                          </span>
                        </td>
                        <td className={`${tdStyle} text-[#B8A898] text-xs`}>{entry.checkedInAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [page, setPage] = useState('rsvp');
  const [rsvps, setRsvps] = useState([]);
  const [hotels, setHotels] = useState([]);

  const loadRsvps = async () => {
    try {
      const response = await fetch('/api/rsvp');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to load RSVPs.');
      }

      const rows = Array.isArray(result?.data) ? result.data : [];
      const normalized = rows.map((entry) => ({
        id: entry.id || crypto.randomUUID(),
        name: entry.full_name || 'Guest',
        phone: entry.phone_number || 'N/A',
        attending: entry.attendance === 'yes' ? 'yes' : 'no',
        guests: Number(entry.guest_count ?? 1),
        message: entry.dietary_notes || '',
        submittedAt: entry.created_at ? new Date(entry.created_at).toLocaleString() : '—'
      }));

      setRsvps(normalized);
    } catch (error) {
      console.error('Unable to fetch RSVPs:', error);
      setRsvps([]);
    }
  };

  const handleRsvpSubmit = async (entry) => {
    const normalized = {
      id: entry?.id || crypto.randomUUID(),
      name: entry?.fullName || entry?.name || '',
      phone: entry?.phoneNumber || entry?.phone || '',
      attending: entry?.attendance || entry?.attending || 'yes',
      guests: Number(entry?.guestCount ?? entry?.guests ?? 1),
      message: entry?.dietaryNotes || entry?.message || '',
      submittedAt: entry?.createdAt || new Date().toLocaleString()
    };

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: normalized.name,
          phoneNumber: normalized.phone || 'N/A',
          attendance: normalized.attending === 'yes' ? 'yes' : 'no',
          guestCount: normalized.guests,
          dietaryNotes: normalized.message
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return { ok: false, message: result?.message || 'Unable to save RSVP.' };
      }

      setRsvps((current) => [...current, normalized]);
      await loadRsvps();
      return { ok: true };
    } catch (error) {
      console.error('RSVP submit failed:', error);
      return { ok: false, message: 'Unable to save RSVP. Please try again.' };
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#FBF5E6' }}>
      <Nav page={page} setPage={setPage} />
      {page === 'rsvp' && <RSVPPage onSubmit={handleRsvpSubmit} />}
      {page === 'events' && <EventsPage />}
      {page === 'hotel' && <HotelPage onSubmit={(entry) => setHotels((current) => [...current, entry])} />}
      {page === 'admin' && <AdminPage rsvps={rsvps} hotels={hotels} />}
    </div>
  );
}
