import React, { useState, useEffect } from 'react';

const LINKS = [
  { id: 'travaux', label: 'Travaux' },
  { id: 'approche', label: 'Approche' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '76px',
        background: scrolled ? 'rgba(255,255,255,0.88)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }} className="nav-root">
        <a href="#top" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '20px', width: 'auto', filter: 'invert(1)' }} />
        </a>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.6)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(10,10,10,0.6)'}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={() => setMobileOpen(o => !o)} className="hamburger-btn" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.25s' }} />
          <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      <div style={{
        position: 'fixed', top: '76px', left: 0, right: 0, zIndex: 400,
        background: '#ffffff', borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        overflow: 'hidden', maxHeight: mobileOpen ? '240px' : '0',
        transition: 'max-height 0.35s ease',
      }}>
        <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMobileOpen(false)} style={{
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.7)', padding: '14px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)',
            }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-root { padding: 0 20px !important; }
          .nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
