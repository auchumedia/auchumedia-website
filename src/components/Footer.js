import React from 'react';
import { Link } from 'react-router-dom';

const BLUE = '#003DA5';

export default function Footer() {
  return (
    <footer style={{ background: '#060606', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
      {/* Main footer */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', padding: '64px 60px 48px' }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '16px' }}><img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '20px', width: 'auto' }} /></div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, fontWeight: 300, maxWidth: '280px' }}>
            L'agence de référence pour les athlètes et les entreprises ambitieuses. Sport · Marketing · Croissance.
          </p>
        </div>

        {/* Services */}
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Services</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { to: '/athletes', label: 'Pour les athlètes' },
              { to: '/entreprises', label: 'Pour les entreprises' },
              { to: '/projets', label: 'Nos projets' },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
              >{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Compagnie */}
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Compagnie</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { to: '/a-propos', label: 'À propos' },
              { to: '/athletes#form', label: 'Contact' },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
              >{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Contact</div>
          <a href="mailto:raphael@auchumedia.com" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, display: 'block', marginBottom: '20px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
          >raphael@auchumedia.com</a>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            {/* Instagram */}
            <a href="https://instagram.com/auchumedia" target="_blank" rel="noreferrer"
              style={{ transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke={BLUE} strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" stroke={BLUE} strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1" fill={BLUE}/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com/auchumedia" target="_blank" rel="noreferrer"
              style={{ transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="https://tiktok.com/@auchumedia" target="_blank" rel="noreferrer"
              style={{ transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          © 2025 Agence AuchuMedia Inc. · Montréal, Québec
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>

          {/* Instagram */}
          <a href="https://instagram.com/auchumedia" target="_blank" rel="noreferrer"
            style={{ color: BLUE, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke={BLUE} strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke={BLUE} strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill={BLUE}/>
            </svg>
          </a>

          {/* Facebook */}
          <a href="https://facebook.com/auchumedia" target="_blank" rel="noreferrer"
            style={{ color: BLUE, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* TikTok */}
          <a href="https://tiktok.com/@auchumedia" target="_blank" rel="noreferrer"
            style={{ color: BLUE, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer div[style*="grid-template-columns"] { grid-template-columns: 1fr 1fr !important; gap: 32px !important; padding: 40px 20px 32px !important; }
          footer div[style*="justify-content: space-between"] { flex-direction: column !important; gap: 16px !important; padding: 20px !important; }
        }
      `}</style>
    </footer>
  );
}
