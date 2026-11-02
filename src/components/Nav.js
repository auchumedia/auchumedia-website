import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BLUE = '#003DA5';

const NAV_LINKS = [
  { id: 'clients', label: 'Clients' },
  { id: 'approche', label: 'Approche' },
  { id: 'pourquoi', label: 'Pourquoi nous' },
];

export function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const goToSection = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav className="pill-nav" style={{
        position: 'fixed', top: '14px', left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)', maxWidth: '1100px', zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#0a0a0a', color: '#fff',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 14px 36px rgba(0,0,0,0.2)',
        padding: scrolled ? '7px 8px 7px 20px' : '12px 10px 12px 26px',
        transition: 'padding 0.3s ease',
      }}>
        <Link to="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '20px', width: 'auto' }} />
        </Link>

        <div className="pill-nav-center" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '32px',
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); goToSection(l.id); }} style={{
              fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button onClick={() => navigate('/planifier-un-appel')} className="pill-nav-cta arrow-btn" style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            fontFamily: "'DM Sans'", fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: '#fff', background: BLUE, border: 'none', borderRadius: '999px', padding: '5px 5px 5px 18px',
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            <span className="arrow-btn-label">Planifier un appel</span>
            <span className="arrow-btn-square" style={{
              width: '26px', height: '26px', flexShrink: 0, borderRadius: '7px', background: '#0a0a0a',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="arrow-btn-arrow" style={{ color: '#fff', fontSize: '13px', display: 'inline-block' }}>→</span>
            </span>
          </button>

          <button onClick={() => setMobileOpen(o => !o)} className="pill-hamburger" aria-label="Menu" style={{
            display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none',
            cursor: 'pointer', padding: '10px', flexShrink: 0,
          }}>
            <span style={{ width: '20px', height: '1.5px', background: '#fff', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(3.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '20px', height: '1.5px', background: '#fff', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className="pill-nav-overlay" style={{
        position: 'fixed', inset: 0, zIndex: 600, background: '#0a0a0a',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px',
        opacity: mobileOpen ? 1 : 0, visibility: mobileOpen ? 'visible' : 'hidden',
        transform: mobileOpen ? 'none' : 'translateY(-16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s',
      }}>
        {NAV_LINKS.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); goToSection(l.id); }} style={{
            fontFamily: "'Bebas Neue'", fontSize: '36px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em',
          }}>
            {l.label}
          </a>
        ))}
        <button onClick={() => { setMobileOpen(false); navigate('/planifier-un-appel'); }} style={{
          marginTop: '14px', fontFamily: "'DM Sans'", fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#fff', background: BLUE, border: 'none', padding: '16px 30px', borderRadius: '999px', cursor: 'pointer',
        }}>
          Planifier un appel →
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pill-nav-center { display: none !important; }
          .pill-hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .pill-nav-cta .arrow-btn-label { display: none !important; }
          .pill-nav-cta { padding: 5px !important; }
        }
      `}</style>
    </>
  );
}
