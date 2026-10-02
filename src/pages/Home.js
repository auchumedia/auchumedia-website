import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BLUE = '#003DA5';
const BLACK = '#0a0a0a';
const GRAY_BG = '#f8f8f8';

/* ---------- Shared hooks / helpers ---------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const t = { up: 'translateY(32px)', left: 'translateX(-32px)', right: 'translateX(32px)', none: 'none' };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : t[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---------- Nav ---------- */

const NAV_LINKS = [
  { id: 'clients', label: 'Nos clients' },
  { id: 'approche', label: 'Notre approche' },
  { id: 'pourquoi', label: 'Pourquoi nous' },
];

export function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className="nav-root" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '76px',
        background: scrolled ? 'rgba(255,255,255,0.88)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '20px', width: 'auto', filter: 'invert(1)' }} />
        </Link>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.6)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = BLACK}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(10,10,10,0.6)'}
            >
              {l.label}
            </a>
          ))}
          <button onClick={() => navigate('/planifier-un-appel')} style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#fff', background: BLUE, border: 'none', padding: '11px 22px', borderRadius: '6px',
            cursor: 'pointer', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Planifier un appel
          </button>
        </div>

        <button onClick={() => setMobileOpen(o => !o)} className="hamburger-btn" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <span style={{ width: '22px', height: '1.5px', background: BLACK, display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span style={{ width: '22px', height: '1.5px', background: BLACK, display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.25s' }} />
          <span style={{ width: '22px', height: '1.5px', background: BLACK, display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      <div style={{
        position: 'fixed', top: '76px', left: 0, right: 0, zIndex: 400,
        background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden', maxHeight: mobileOpen ? '320px' : '0',
        transition: 'max-height 0.35s ease',
      }}>
        <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMobileOpen(false)} style={{
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.7)', padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
              {l.label}
            </a>
          ))}
          <button onClick={() => { setMobileOpen(false); navigate('/planifier-un-appel'); }} style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#fff', background: BLUE, border: 'none', padding: '14px', borderRadius: '6px',
            cursor: 'pointer', marginTop: '14px',
          }}>
            Planifier un appel
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-root { padding: 0 20px !important; }
          .nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- Hero ---------- */

function HeroWord({ word, index }) {
  return (
    <span className="hero-word" style={{
      display: 'inline-block', marginRight: '0.28em',
      animationDelay: `${0.5 + index * 0.1}s`,
    }}>
      {word}
    </span>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section id="top" className="section-pad hero" style={{
      minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '140px 60px 40px', textAlign: 'center',
    }}>
      <h1 className="hero-title" style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.9, textTransform: 'uppercase', margin: 0, maxWidth: '1200px', textAlign: 'center' }}>
        <HeroWord word="L'ATTENTION" index={0} /><br />
        <HeroWord word="SE" index={1} /><HeroWord word="MÉRITE." index={2} /><br />
        <HeroWord word="ON" index={3} /><HeroWord word="SAIT" index={4} /><br />
        <HeroWord word="COMMENT" index={5} /><br />
        <HeroWord word="L'OBTENIR." index={6} />
      </h1>

      <p style={{ fontFamily: "'DM Sans'", fontSize: '18px', color: 'rgba(10,10,10,0.55)', maxWidth: '560px', lineHeight: 1.8, margin: '36px 0 40px' }}>
        On produit du contenu vidéo stratégique pour les entreprises B2C qui veulent capter l'attention, bâtir leur autorité et convertir.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => scrollTo('clients')} style={{
          fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#fff', background: BLUE, border: `1px solid ${BLUE}`, padding: '16px 32px', borderRadius: '6px',
          cursor: 'pointer', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Voir nos clients →
        </button>
        <button onClick={() => navigate('/planifier-un-appel')} style={{
          fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: BLACK, background: 'transparent', border: `1px solid ${BLACK}`, padding: '16px 32px', borderRadius: '6px',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = BLACK; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BLACK; }}
        >
          Planifier un appel
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '56px' }}>
        <span className="urgence-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e23b3b' }} />
        <span style={{ fontFamily: "'DM Sans'", fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)' }}>
          6 / 8 mandats actifs · 2 spots disponibles
        </span>
      </div>
    </section>
  );
}

/* ---------- Clients ---------- */

const TRAVAUX = [
  { nom: 'Cardinal Asphalte', bg: 'url(https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784411817/Capture_d_e%CC%81cran_le_2026-07-18_a%CC%80_17.56.25_rfb74n.png)', badge: 'ACTIF' },
  { nom: 'Nor-Can', bg: 'url(https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png)', badge: 'ACTIF' },
  { nom: 'Famille Maher', bg: 'url(https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410790/Raf_Steve_ycvtgk.png)', badge: 'ACTIF' },
  { nom: 'Bâton Rouge', bg: 'linear-gradient(135deg, #8B0000, #2a0a0a)', badge: 'ACTIF' },
  { nom: 'Groupe DDC', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)', badge: 'BIENTÔT' },
  { nom: 'Équipe Lemire Fillion', bg: 'linear-gradient(135deg, #0a2a1a, #1a3a2a)', badge: 'BIENTÔT' },
];

function ClientCard({ t }) {
  return (
    <div style={{
      position: 'relative', width: '280px', height: '380px', borderRadius: '16px',
      overflow: 'hidden', flexShrink: 0, backgroundColor: '#111', transform: 'rotate(-3deg)',
    }}>
      <div style={{
        position: 'absolute', inset: 0, background: t.bg, backgroundSize: 'cover', backgroundPosition: 'center',
        objectFit: 'cover',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
      <div style={{
        position: 'absolute', top: '16px', left: '16px', fontFamily: "'Bebas Neue'", fontSize: '22px',
        color: '#fff', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.6)', zIndex: 2,
        letterSpacing: '0.05em',
      }}>
        {t.nom}
      </div>
      <div style={{
        position: 'absolute', bottom: '16px', right: '16px', zIndex: 2, fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '999px',
        color: '#fff', background: t.badge === 'ACTIF' ? '#1a9b55' : '#e2873b',
      }}>
        {t.badge}
      </div>
    </div>
  );
}

function Clients() {
  return (
    <section id="clients" style={{ background: '#ffffff', padding: '40px 0 100px' }}>
      <FadeIn>
        <h2 style={{ fontFamily: "'Bebas Neue'", color: BLUE, fontSize: 'clamp(40px, 6vw, 72px)', textAlign: 'center', margin: '0 0 56px', textTransform: 'uppercase' }}>
          Nos clients actuels
        </h2>
      </FadeIn>

      <div className="carousel-container" style={{ overflow: 'hidden', padding: '80px 0' }}>
        <div className="carousel-track">
          {[...TRAVAUX, ...TRAVAUX].map((t, i) => <ClientCard key={i} t={t} />)}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span style={{ fontSize: '15px', color: BLUE, fontStyle: 'italic', fontFamily: "'DM Sans'" }}>Signé</span>
        <img
          src="/Copie de AUCHU.png.png"
          alt="AuchuMedia"
          style={{ height: '16px', width: 'auto', filter: 'invert(1) brightness(0)' }}
        />
      </div>
    </section>
  );
}

/* ---------- Approche ---------- */

const APPROCHE_BLOCS = [
  { titre: '8 CLIENTS MAX. PAR CHOIX.', texte: "On limite volontairement notre portefeuille à 8 mandats. Chaque client reçoit l'attention complète de notre équipe — pas un junior qui gère ton compte pendant que le senior vend." },
  { titre: 'UNE ÉQUIPE. PAS UNE USINE.', texte: 'Raphael et Ben travaillent directement sur chaque mandat. Tu sais toujours à qui tu parles et qui produit ton contenu.' },
  { titre: 'DU CONTENU QUI CONVERTIT.', texte: "On ne fait pas du contenu pour faire du contenu. Chaque vidéo a un but stratégique — capter l'attention, bâtir la confiance, générer des ventes." },
];

function Approche() {
  return (
    <section id="approche" className="section-pad" style={{ padding: '140px 60px', background: GRAY_BG }}>
      <div className="approche-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'start' }}>
        <div className="approche-sticky" style={{ position: 'sticky', top: '120px' }}>
          <FadeIn direction="left">
            <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
              Notre différence
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: '52px', lineHeight: 1, margin: '0 0 32px', textTransform: 'uppercase' }}>
              On ne travaille pas<br />avec tout le monde.
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{
                  width: '22px', height: '10px', borderRadius: '2px',
                  background: i < 6 ? BLUE : 'transparent',
                  border: i < 6 ? 'none' : `1px solid rgba(10,10,10,0.25)`,
                }} />
              ))}
            </div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)' }}>
              6/8 mandats
            </div>
          </FadeIn>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          {APPROCHE_BLOCS.map((b, i) => (
            <FadeIn key={b.titre} delay={0.12 * i} direction="right">
              <div style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: '28px' }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: '16px', fontWeight: 700, color: BLACK, marginBottom: '12px', letterSpacing: '0.01em' }}>
                  {b.titre}
                </div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: '15px', color: 'rgba(10,10,10,0.6)', lineHeight: 1.75, margin: 0 }}>
                  {b.texte}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pourquoi ---------- */

const POURQUOI_COLS = [
  { icon: '🎯', titre: "STRATÉGIE D'ABORD", texte: "Chaque vidéo a un rôle précis dans ton funnel. Rien n'est publié par hasard." },
  { icon: '🎬', titre: 'PRODUCTION PREMIUM', texte: 'Sony A7 IV, équipement pro, post-production soignée. Ton contenu reflète ton niveau.' },
  { icon: '📈', titre: 'RÉSULTATS MESURÉS', texte: "On suit les métriques qui comptent : attention, engagement, conversions. Pas juste les vues." },
];

function Pourquoi() {
  return (
    <section id="pourquoi" className="section-pad" style={{ padding: '140px 60px', background: '#ffffff', textAlign: 'center' }}>
      <FadeIn>
        <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
          Notre vision
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.02, margin: '0 auto 28px', textTransform: 'uppercase' }}>
          Le contenu viral<br />n'est pas un accident.<br />C'est une stratégie.
        </h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: '17px', color: 'rgba(10,10,10,0.55)', maxWidth: '680px', lineHeight: 1.8, margin: '0 auto 72px' }}>
          On croit que chaque entreprise mérite une présence en ligne qui capte l'attention, inspire confiance et génère de vraies ventes — pas juste des likes. On comprend comment les gens découvrent les marques, comment l'attention se gagne, et comment la confiance se bâtit. On traduit ça en vidéos qui convertissent.
        </p>
      </FadeIn>

      <div className="pourquoi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'left' }}>
        {POURQUOI_COLS.map((c, i) => (
          <FadeIn key={c.titre} delay={0.1 * i}>
            <div style={{ fontSize: '34px', marginBottom: '20px' }}>{c.icon}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: '15px', fontWeight: 700, color: BLACK, marginBottom: '12px', letterSpacing: '0.04em' }}>
              {c.titre}
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: '14px', color: 'rgba(10,10,10,0.55)', lineHeight: 1.7, margin: 0 }}>
              {c.texte}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ---------- Témoignages ---------- */

const TEMOIGNAGES = [
  { texte: "AuchuMedia a complètement transformé notre présence sur les réseaux. En 3 mois, on a vu une augmentation significative de nos demandes de soumission.", nom: 'Jean-Philippe Tremblay', titre: 'Directeur général, Cardinal Asphalte' },
  { texte: "Ce qui nous a le plus impressionné, c'est leur compréhension de notre industrie. Le contenu qu'ils créent résonne vraiment avec notre clientèle.", nom: 'Marie-Pier Gagnon', titre: 'Directrice marketing, Nor-Can' },
  { texte: "On cherchait une équipe qui comprend les réseaux sociaux et le monde immobilier. AuchuMedia dépasse largement nos attentes.", nom: 'Steve Maher', titre: 'Courtier immobilier, RE/MAX' },
];

function Temoignages() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TEMOIGNAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const current = TEMOIGNAGES[active];

  return (
    <section className="section-pad" style={{ padding: '140px 60px', background: GRAY_BG, textAlign: 'center' }}>
      <FadeIn>
        <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
          Ils parlent de nous
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(36px, 5vw, 56px)', margin: '0 0 56px', textTransform: 'uppercase' }}>
          Ce que nos clients disent.
        </h2>
      </FadeIn>

      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div key={active} className="testimonial-card" style={{
          background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px',
          padding: '40px 36px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', textAlign: 'left',
        }}>
          <div style={{ color: '#f5b400', fontSize: '16px', marginBottom: '18px', letterSpacing: '2px' }}>★★★★★</div>
          <p style={{ fontFamily: "'DM Sans'", fontSize: '16px', fontStyle: 'italic', color: 'rgba(10,10,10,0.7)', lineHeight: 1.75, margin: '0 0 24px' }}>
            "{current.texte}"
          </p>
          <div style={{ fontFamily: "'DM Sans'", fontSize: '14px', fontWeight: 700, color: BLACK }}>{current.nom}</div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: '13px', color: 'rgba(10,10,10,0.5)', marginTop: '2px' }}>{current.titre}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
          {TEMOIGNAGES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Témoignage ${i + 1}`} style={{
              width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px',
              background: i === active ? BLUE : 'rgba(10,10,10,0.2)', border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease', padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA finale ---------- */

function CtaFinale() {
  const navigate = useNavigate();
  return (
    <section className="cta-finale section-pad" style={{ padding: '140px 60px', paddingBottom: '100px', textAlign: 'center', position: 'relative' }}>
      <FadeIn>
        <h2 style={{ fontFamily: "'Bebas Neue'", color: '#fff', fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.05, margin: '0 0 24px', textTransform: 'uppercase' }}>
          Prêts à transformer<br />votre marketing en revenus?
        </h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: '16px', color: 'rgba(255,255,255,0.8)', margin: '0 0 44px' }}>
          2 spots disponibles. Les mandats se font rares.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/planifier-un-appel')} style={{
            fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: BLUE, background: '#fff', border: '1px solid #fff', padding: '16px 32px', borderRadius: '6px',
            cursor: 'pointer', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Planifier un appel →
          </button>
          <button onClick={() => scrollTo('clients')} style={{
            fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#fff', background: 'transparent', border: '1px solid #fff', padding: '16px 32px', borderRadius: '6px',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = BLUE; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            Voir nos clients →
          </button>
        </div>
      </FadeIn>

      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '150px',
        background: 'linear-gradient(to bottom, transparent, #ffffff)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}

/* ---------- Footer ---------- */

const FOOTER_NAV = [
  { label: 'Nos clients', action: 'scroll', target: 'clients' },
  { label: 'Notre approche', action: 'scroll', target: 'approche' },
  { label: 'Pourquoi nous', action: 'scroll', target: 'pourquoi' },
  { label: 'Planifier un appel', action: 'navigate', target: '/planifier-un-appel' },
];

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ background: '#ffffff', padding: '60px 60px 40px', marginTop: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '24px', filter: 'invert(1)', marginBottom: '16px' }} />
          <p style={{ fontSize: '13px', color: '#0a0a0a', maxWidth: '280px', lineHeight: 1.6 }}>
            L'attention se mérite. On sait comment l'obtenir.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '16px' }}>Navigation</div>
            {FOOTER_NAV.map(link => (
              <div
                key={link.label}
                onClick={() => link.action === 'scroll' ? scrollTo(link.target) : navigate(link.target)}
                style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', marginBottom: '10px', cursor: 'pointer' }}
              >
                {link.label}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '16px' }}>Contact</div>
            <a href="mailto:raphael@auchumedia.com" style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', display: 'block', marginBottom: '10px', textDecoration: 'none' }}>raphael@auchumedia.com</a>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://instagram.com/auchumedia" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke={BLUE} strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke={BLUE} strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill={BLUE} />
                </svg>
              </a>
              <a href="https://tiktok.com/@auchumedia" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>© 2026 AuchuMedia Inc. Tous droits réservés.</span>
        <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>Montréal, Québec</span>
      </div>
    </footer>
  );
}

/* ---------- Home ---------- */

export default function Home() {
  return (
    <div style={{ background: '#ffffff', overflowX: 'clip' }}>
      <Nav />
      <Hero />
      <Clients />
      <Approche />
      <Pourquoi />
      <Temoignages />
      <CtaFinale />
      <Footer />

      <style>{`
        @keyframes wordFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-word { opacity: 0; animation: wordFadeIn 0.6s ease forwards; }

        @media (min-width: 769px) {
          .hero-title br { display: none; }
          .hero-title { white-space: pre-wrap; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(52px, 14vw, 80px) !important; line-height: 0.92 !important; }
        }

        @keyframes urgencePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .urgence-dot { animation: urgencePulse 2s ease-in-out infinite; }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          display: flex;
          gap: 20px;
          animation: scrollLeft 20s linear infinite;
          width: max-content;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes ctaGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .cta-finale {
          background: linear-gradient(120deg, #003DA5, #0050d6, #002d7a, #003DA5);
          background-size: 300% 300%;
          animation: ctaGradient 12s ease infinite;
        }

        .testimonial-card { animation: wordFadeIn 0.5s ease; }

        @media (max-width: 900px) {
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .hero { padding-top: 120px !important; padding-bottom: 40px !important; }
          .approche-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .approche-sticky { position: static !important; }
          .pourquoi-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </div>
  );
}
