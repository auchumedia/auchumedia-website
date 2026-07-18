import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { projets } from '../data/projets';
import { athletesData } from '../data/athletesData';

const BLUE = '#003DA5';

const navLinks = [
  { id: 'pourquoi', labelFr: 'Pourquoi AuchuMedia', labelEn: 'Why AuchuMedia' },
  { id: 'etudes-de-cas-home', labelFr: 'Études de cas', labelEn: 'Case studies' },
  { id: 'deroulement', labelFr: 'Déroulement', labelEn: 'Process' },
  { id: 'tarification', labelFr: 'Tarification', labelEn: 'Pricing' },
  { id: 'faq', labelFr: 'FAQ', labelEn: 'FAQ' },
];

export default function ProjetDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState('fr');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const fr = lang === 'fr';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projet = [...projets, ...athletesData].find(p => p.slug === slug);
  if (!projet) return <Navigate to="/" replace />;

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* ===== MAIN NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        transition: 'all 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '64px', gap: '16px'
      }}>
        <Link to="/" style={{ flexShrink: 0 }}><img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '22px', width: 'auto', filter: 'invert(1)' }} /></Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', flex: 1, justifyContent: 'center' }} className="nav-links">
          {navLinks.map(link => (
            <Link key={link.id} to={`/#${link.id}`} style={{
              fontSize: '11px', fontWeight: 600,
              color: 'rgba(10,10,10,0.5)',
              background: 'transparent', border: 'none',
              borderBottom: '2px solid transparent',
              padding: '22px 14px', cursor: 'pointer',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              fontFamily: "'DM Sans'", whiteSpace: 'nowrap',
              textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.2s'
            }}>
              {fr ? link.labelFr : link.labelEn}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, position: 'absolute', right: '60px' }}>
          <div style={{ display: 'flex', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            {['fr','en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ fontSize: '9px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', border: 'none', background: lang === l ? 'rgba(0,0,0,0.08)' : 'transparent', color: lang === l ? '#0a0a0a' : 'rgba(10,10,10,0.35)', fontFamily: "'DM Sans'" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger-btn" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexShrink: 0 }}>
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.25s' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0, zIndex: 490, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', padding: '24px 24px', gap: '4px', overflowY: 'auto' }}>
          {navLinks.map(link => (
            <Link key={link.id} to={`/#${link.id}`} onClick={() => setMobileOpen(false)} style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(10,10,10,0.65)', background: 'transparent', border: 'none', borderBottom: '0.5px solid rgba(0,0,0,0.07)', padding: '16px 0', cursor: 'pointer', textAlign: 'left', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'DM Sans'", width: '100%', textDecoration: 'none', display: 'block' }}>
              {fr ? link.labelFr : link.labelEn}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexDirection: 'column' }}>
            <Link to="/athletes" style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0a', background: 'transparent', padding: '12px 20px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.22)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'center' }}>
              {fr ? 'Pour athlètes' : 'For athletes'}
            </Link>
            <Link to="/#contact" onClick={() => setMobileOpen(false)} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: BLUE, padding: '13px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'", textDecoration: 'none', textAlign: 'center' }}>
              {fr ? 'Planifier un appel' : 'Book a call'}
            </Link>
          </div>
        </div>
      )}

      {/* ===== PLACEHOLDER ===== */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '100px 60px', overflow: 'hidden',
        background: 'linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)',
      }}>
        <div style={{ position: 'absolute', top: '-96px', right: '-96px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <button
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: '84px', left: '60px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}
        >
          {fr ? '← Retour' : '← Back'}
        </button>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
            {projet.domaine[lang]}
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.95, color: '#fff', letterSpacing: '0.01em', marginBottom: '28px' }}>
            {projet.client}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: 300 }}>
            {fr ? "Ce chapitre n'est pas encore écrit. Revenez bientôt." : "This chapter hasn't been written yet. Check back soon."}
          </p>
        </div>
      </section>

      <Footer />

      <style>{`
        .hamburger-btn { display: flex !important; }
        @media (max-width: 768px) {
          nav div[style*="padding: 0 60px"] { padding: 0 20px !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:last-child > *:not(.hamburger-btn) { display: none !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  );
}
