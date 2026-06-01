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
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '28px', letterSpacing: '0.2em', color: '#fff', marginBottom: '16px' }}>AUCHUMEDIA</div>
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
          <a href="mailto:raphael@auchumedia.com" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, display: 'block', marginBottom: '12px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
          >raphael@auchumedia.com</a>
          <Link to="/athletes#form" style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, color: '#fff', background: BLUE, padding: '8px 18px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>
            Prendre RDV
          </Link>
        </div>
      </div>
 
      {/* Bottom bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          © 2025 Agence AuchuMedia Inc. · Montréal, Québec
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { href: 'https://instagram.com/auchumedia', label: 'Instagram' },
            { href: 'https://tiktok.com/@auchumedia', label: 'TikTok' },
            { href: 'https://linkedin.com/company/auchumedia', label: 'LinkedIn' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
            >{s.label}</a>
          ))}
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
