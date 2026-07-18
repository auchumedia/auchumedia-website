import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
const BLUE = '#003DA5';
 
export default function Nav({ lang, onLangChange }) {
  const [ddOpen, setDdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  const fr = lang === 'fr';
 
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '68px',
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#ffffff',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s'
      }}>
        {/* Logo */}
        <Link to="/" style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', letterSpacing: '0.2em', color: '#0a0a0a' }}>
          AUCHUMEDIA
        </Link>
 
        {/* Desktop center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="nav-desktop">
          {/* Dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setDdOpen(true)}
            onMouseLeave={() => setDdOpen(false)}
          >
            <button onClick={() => setDdOpen(!ddOpen)} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: '5px', cursor: 'pointer',
              background: ddOpen ? 'rgba(0,0,0,0.05)' : 'transparent',
              border: 'none', color: 'rgba(10,10,10,0.55)',
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              fontFamily: "'DM Sans'",
              transition: 'all 0.15s'
            }}>
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: ddOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="1 1 5 5 9 1" stroke="rgba(10,10,10,0.35)" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
 
            {ddOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '360px',
                background: '#ffffff', border: '0.5px solid rgba(0,0,0,0.08)',
                borderRadius: '10px', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
              }}>
                <Link to="/athletes" onClick={() => setDdOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '18px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.06)',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(0,0,0,0.05)', border: '0.5px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(10,10,10,0.65)" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a', marginBottom: '3px' }}>{fr ? 'Pour athlètes' : 'For athletes'}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(10,10,10,0.45)' }}>{fr ? 'Personal branding · Partnerships · Post-carrière' : 'Personal branding · Partnerships · Post-career'}</div>
                  </div>
                  <span style={{ color: 'rgba(10,10,10,0.3)' }}>→</span>
                </Link>
                <Link to="/" onClick={() => setDdOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a', marginBottom: '3px' }}>{fr ? 'Pour entreprises' : 'For businesses'}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(10,10,10,0.45)' }}>Always-On · Meta Ads · CRM</div>
                  </div>
                  <span style={{ color: 'rgba(10,10,10,0.3)' }}>→</span>
                </Link>
              </div>
            )}
          </div>
 
          <div style={{ width: '0.5px', height: '16px', background: 'rgba(0,0,0,0.1)', margin: '0 4px' }} />
          <Link to="/a-propos" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)', padding: '8px 14px', borderRadius: '5px' }}>
            {fr ? 'À propos' : 'About'}
          </Link>
        </div>
 
        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            {['fr', 'en'].map(l => (
              <button key={l} onClick={() => onLangChange(l)} style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em',
                padding: '5px 10px', cursor: 'pointer', border: 'none',
                background: lang === l ? 'rgba(0,0,0,0.08)' : 'transparent',
                color: lang === l ? '#0a0a0a' : 'rgba(10,10,10,0.35)',
                fontFamily: "'DM Sans'", transition: 'all 0.15s'
              }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to="/athletes#form" style={{
            fontSize: '10px', fontWeight: 700, color: '#fff',
            background: BLUE, padding: '9px 18px', borderRadius: '4px',
            letterSpacing: '0.07em', textTransform: 'uppercase'
          }}>
            {fr ? 'Prendre RDV' : 'Book a call'}
          </Link>
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger-btn" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.25s' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>
 
      {/* Mobile menu */}
      <div style={{
        position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 400,
        background: '#ffffff', borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        overflow: 'hidden', maxHeight: mobileOpen ? '500px' : '0',
        transition: 'max-height 0.35s ease'
      }}>
        <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)', padding: '12px 0 8px' }}>Services</div>
          {[
            { to: '/athletes', label: fr ? 'Pour athlètes' : 'For athletes' },
            { to: '/', label: fr ? 'Pour entreprises' : 'For businesses' },
          ].map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: 'rgba(10,10,10,0.6)', padding: '10px 0 10px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
              {item.label}
            </Link>
          ))}
          <Link to="/a-propos" onClick={() => setMobileOpen(false)} style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.65)', padding: '12px 0', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
            {fr ? 'À propos' : 'About'}
          </Link>
          <div style={{ display: 'flex', gap: '8px', padding: '12px 0' }}>
            {['fr', 'en'].map(l => (
              <button key={l} onClick={() => onLangChange(l)} style={{ fontSize: '10px', fontWeight: 700, color: lang === l ? '#0a0a0a' : 'rgba(10,10,10,0.4)', border: '0.5px solid rgba(0,0,0,0.15)', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', background: lang === l ? 'rgba(0,0,0,0.08)' : 'none', fontFamily: "'DM Sans'" }}>
                {l === 'fr' ? 'FR 🇶🇨' : 'EN 🇺🇸'}
              </button>
            ))}
          </div>
          <Link to="/athletes#form" onClick={() => setMobileOpen(false)} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: BLUE, padding: '12px 20px', borderRadius: '4px', textAlign: 'center', marginTop: '12px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {fr ? 'Prendre RDV' : 'Book a call'}
          </Link>
        </div>
      </div>
 
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
