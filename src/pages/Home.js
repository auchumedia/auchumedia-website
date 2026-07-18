import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { projets } from '../data/projets';

const BLUE = '#003DA5';

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [hovered, setHovered] = useState(null);
  const fr = lang === 'fr';

  const t = {
    eyebrow: fr ? 'Agence de référence · Sport · Marketing' : 'Reference agency · Sport · Marketing',
    h1: fr ? ['ON RACONTE', 'TON HISTOIRE.'] : ['WE TELL', 'YOUR STORY.'],
    h2: fr ? 'Contenu premium pour athlètes et marques ambitieuses.' : 'Premium content for athletes and ambitious brands.',
    scroll: fr ? 'Voir nos projets' : 'See our projects',
    projectsLabel: fr ? 'Nos projets' : 'Our projects',
    projectsTitle: fr ? 'NOS PROJETS' : 'OUR PROJECTS',
    view: fr ? 'Voir le projet →' : 'View project →',
    athletesEyebrow: fr ? 'Division athlètes' : 'Athletes division',
    athletesTitle: fr ? ['TU ES UN ATHLÈTE', 'DE HAUT NIVEAU ?'] : ['ARE YOU AN', 'ELITE ATHLETE?'],
    athletesDesc: fr
      ? 'On bâtit la marque personnelle des athlètes qui dominent — sur et en dehors du terrain.'
      : 'We build the personal brand of athletes who dominate — on and off the field.',
    athletesBtn: fr ? 'Pour athlètes →' : 'For athletes →',
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          src="https://res.cloudinary.com/dr0kwuqqa/video/upload/v1780793836/Expedia_ip7xmb.mp4"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>{t.eyebrow}</span>
            <div style={{ width: '24px', height: '1px', background: BLUE }} />
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(56px, 9vw, 128px)', lineHeight: 0.92, color: '#fff', marginBottom: '24px', letterSpacing: '0.01em' }}>
            {t.h1.map((line, i) => <span key={i}>{line}<br /></span>)}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.6vw, 19px)', color: 'rgba(255,255,255,0.7)', marginBottom: '48px', maxWidth: '480px' }}>
            {t.h2}
          </p>
          <a
            href="#projets"
            style={{ fontSize: '11px', fontWeight: 700, color: '#fff', border: '1px solid #fff', padding: '14px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#080808'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            {t.scroll}
          </a>
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 1, opacity: 0.6 }}>
          <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.5)', animation: 'scrollpulse 1.8s ease-in-out infinite' }} />
        </div>
        <style>{`@keyframes scrollpulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }`}</style>
      </section>

      {/* NOS PROJETS */}
      <section id="projets" style={{ padding: '80px 60px', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
          {t.projectsLabel}
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.95, color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
          {t.projectsTitle}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {projets.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projets/${p.slug}`}
              onMouseEnter={() => setHovered(p.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', display: 'block', overflow: 'hidden', borderRadius: '12px',
                border: '0.5px solid rgba(255,255,255,0.08)', height: '380px',
                background: 'linear-gradient(160deg, #141414 0%, #080808 75%)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.04)', opacity: hovered === p.slug ? 1 : 0, transition: 'opacity 0.3s ease' }} />
              <span style={{ position: 'absolute', top: '24px', right: '28px', fontFamily: "'Bebas Neue'", fontSize: '110px', color: hovered === p.slug ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)', transition: 'color 0.3s ease' }}>
                0{i + 1}
              </span>

              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px' }}>
                <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE, background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.28)', padding: '4px 10px', borderRadius: '20px', marginBottom: '12px' }}>
                  {p.categorie[lang]}
                </span>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '30px', color: '#fff', marginBottom: '12px', lineHeight: 1 }}>
                  {p.client}
                </div>
                <span style={{
                  fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em',
                  display: 'inline-block', opacity: hovered === p.slug ? 1 : 0,
                  transform: hovered === p.slug ? 'translateY(0)' : 'translateY(4px)',
                  transition: 'all 0.3s ease',
                }}>
                  {t.view}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ATHLETES DIVISION */}
      <section style={{ padding: '96px 60px', textAlign: 'center', background: '#111', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          {t.athletesEyebrow}
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 0.95, color: '#fff', marginBottom: '24px', letterSpacing: '0.02em' }}>
          {t.athletesTitle.map((line, i) => <span key={i}>{line}<br /></span>)}
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', maxWidth: '440px', margin: '0 auto 40px' }}>
          {t.athletesDesc}
        </p>
        <Link
          to="/athletes"
          style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#fff', border: '1px solid #fff', padding: '14px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#111'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
        >
          {t.athletesBtn}
        </Link>
      </section>

      <Footer />
    </div>
  );
}
