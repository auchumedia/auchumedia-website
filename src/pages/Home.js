import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from '../components/Nav';
import ArrowButton from '../components/ArrowButton';
import VideoWall from '../components/VideoWall';
import PresentationVideo from '../components/PresentationVideo';
import FanShowcase from '../components/FanShowcase';
import StatsBlock from '../components/StatsBlock';
import ComparisonTable from '../components/ComparisonTable';

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

/* ---------- Hero ---------- */

function Reveal({ children, delay = 0, style = {} }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 20);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section id="top" className="section-pad hero" style={{
      position: 'relative', minHeight: '100vh', background: '#ffffff', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '140px 60px 64px', textAlign: 'center',
    }}>
      <VideoWall />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Reveal delay={0}>
          <h1 className="hero-title" style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(64px, 7vw, 110px)', lineHeight: 0.92, color: BLACK, textAlign: 'center', textTransform: 'uppercase', margin: 0, maxWidth: '1200px' }}>
            <span className="desktop-line">L'ATTENTION SE MÉRITE.</span>
            <span className="desktop-line hero-gradient-line"><br />ON SAIT COMMENT L'OBTENIR.</span>
            <span className="mobile-only">
              <span className="mobile-line">L'ATTENTION</span>
              <span className="mobile-line">SE MÉRITE. <span className="hero-gradient-line">ON SAIT</span></span>
              <span className="mobile-line hero-gradient-line">COMMENT L'OBTENIR.</span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.12} style={{ marginTop: '36px' }}>
          <p className="hero-subtitle" style={{ fontFamily: "'DM Sans'", fontSize: '18px', color: 'rgba(10,10,10,0.55)', maxWidth: '560px', lineHeight: 1.8, margin: 0 }}>
            <span className="desktop-line">On produit du contenu vidéo stratégique pour les entreprises B2C qui veulent capter l'attention, bâtir leur autorité et convertir.</span>
            <span className="subtitle-mobile-only">
              <span className="mobile-line">On produit du contenu vidéo stratégique</span>
              <span className="mobile-line">pour les entreprises B2C qui veulent capter</span>
              <span className="mobile-line">l'attention, bâtir leur autorité et convertir.</span>
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.24} style={{ marginTop: '48px', width: '100%' }}>
          <PresentationVideo />
        </Reveal>

        <Reveal delay={0.36} style={{ marginTop: '40px' }}>
          <ArrowButton lift onClick={() => navigate('/planifier-un-appel')} className="hero-cta" style={{ fontSize: '13px', padding: '8px 8px 8px 28px' }}>
            Réserver mon appel découverte
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Notre approche ---------- */

function NotreApproche() {
  return (
    <section
      id="approche"
      className="section-pad notre-approche"
      style={{ paddingTop: '210px', paddingBottom: '140px', paddingLeft: '60px', paddingRight: '60px', background: '#f8f8fa', scrollMarginTop: '90px' }}
    >
      <FadeIn>
        <h2 style={{ fontFamily: "'Bebas Neue'", textAlign: 'center', fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.05, margin: '0 auto 24px', textTransform: 'uppercase', maxWidth: '760px' }}>
          <span style={{ color: BLACK }}>Pas du contenu de masse.</span><br />
          <span style={{ color: BLUE }}>Du contenu qui marque.</span>
        </h2>
      </FadeIn>
      <FadeIn delay={0.08}>
        <p className="approche-intro" style={{ fontFamily: "'DM Sans'", textAlign: 'center', fontSize: '16px', color: 'rgba(10,10,10,0.55)', margin: 0, lineHeight: 1.8 }}>
          <span className="approche-desktop-lines">
            <span className="approche-line">Beaucoup d'agences misent sur le volume : 20 à 30 vidéos par mois,</span>
            <span className="approche-line">mais peu d'impact. Nous, on choisit moins de vidéos,</span>
            <span className="approche-line">mais chacune a une histoire, un rôle et un objectif.</span>
          </span>
          <span className="approche-mobile-lines">
            <span className="approche-line">Beaucoup d'agences misent sur le volume :</span>
            <span className="approche-line">20 à 30 vidéos par mois, mais peu d'impact.</span>
            <span className="approche-line">Nous, on choisit moins de vidéos, mais</span>
            <span className="approche-line">chacune a une histoire, un rôle et un objectif.</span>
          </span>
        </p>
      </FadeIn>

      <ComparisonTable />
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
      <FanShowcase />
      <StatsBlock />
      <NotreApproche />
      <Temoignages />
      <CtaFinale />
      <Footer />

      <style>{`
        @keyframes wordFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none; }
          .subtitle-mobile-only { display: none; }
          .desktop-line { display: inline; }
        }
        @media (max-width: 768px) {
          .desktop-line { display: none; }
          .mobile-only { display: block; font-size: min(12.5vw, 64px); }
          .subtitle-mobile-only { display: block; font-size: min(4.1vw, 17.5px); }
          .mobile-line { display: block; white-space: nowrap; }
          .notre-approche { padding-top: 130px !important; }
        }

        .approche-line { display: block; white-space: nowrap; }
        .approche-mobile-lines { display: none; }
        @media (min-width: 769px) and (max-width: 900px) {
          .approche-intro { font-size: 14.5px !important; }
        }
        @media (max-width: 768px) {
          .approche-desktop-lines { display: none; }
          .approche-mobile-lines { display: block; }
          .approche-intro { font-size: 14.5px !important; }
        }
        @media (max-width: 400px) {
          .hero-cta { font-size: 11px !important; }
        }

        .hero-gradient-line {
          background: linear-gradient(100deg, #003DA5 0%, #2f6fe0 50%, #003DA5 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: heroReflet 6s ease-in-out infinite;
        }
        @keyframes heroReflet {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
          .hero { padding-top: 104px !important; padding-bottom: 48px !important; }
        }
      `}</style>
    </div>
  );
}
