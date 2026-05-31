import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLUE = '#003DA5';

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [heroVisible, setHeroVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const fr = lang === 'fr';

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const cards = [
    {
      key: 'athletes',
      to: '/athletes',
      eyebrow: fr ? 'Pour les athlètes' : 'For athletes',
      title: fr ? ['RAYONNE', 'AU-DELÀ DE', 'TON SPORT.'] : ['RISE ABOVE', 'YOUR', 'SPORT.'],
      desc: fr ? 'Personal branding, partnerships et production vidéo pour les athlètes qui veulent dominer.' : 'Personal branding, partnerships and video production for athletes who want to dominate.',
      cta: fr ? 'Je suis un athlète →' : 'I am an athlete →',
      bg: 'linear-gradient(135deg, #080808 0%, #0a0f1a 100%)',
      icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>,
      iconCircle: <circle cx="12" cy="7" r="4"/>,
    },
    {
      key: 'entreprises',
      to: '/entreprises',
      eyebrow: fr ? 'Pour les entreprises' : 'For businesses',
      title: fr ? ['PROPULSONS', 'VOTRE', 'CROISSANCE.'] : ["LET'S SCALE", 'YOUR', 'BUSINESS.'],
      desc: fr ? 'Médias sociaux, Meta Ads et CRM pour les entreprises B2C ambitieuses.' : 'Social media, Meta Ads and CRM for ambitious B2C businesses.',
      cta: fr ? 'Je suis une entreprise →' : 'I am a business →',
      bg: 'linear-gradient(135deg, #080808 0%, #0a0808 100%)',
      icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
      iconCircle: null,
    },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh', overflow: 'hidden' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO — full screen split */}
      <div style={{ display: 'flex', height: '100vh', paddingTop: '68px' }}>
        {cards.map((card, i) => (
          <Link
            key={card.key}
            to={card.to}
            onMouseEnter={() => setHovered(card.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: hovered === card.key ? '1.6' : hovered && hovered !== card.key ? '0.4' : '1',
              transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative', overflow: 'hidden', display: 'flex',
              flexDirection: 'column', justifyContent: 'flex-end',
              padding: '60px', cursor: 'pointer',
              borderRight: i === 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
              background: card.bg,
            }}
          >
            {/* BG glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at ${i === 0 ? '30%' : '70%'} 40%, rgba(0,61,165,${hovered === card.key ? '0.12' : '0.05'}) 0%, transparent 70%)`,
              transition: 'all 0.5s', pointerEvents: 'none'
            }} />
            {/* Grid texture */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(30px)', transition: `opacity 0.8s ease ${0.3 + i * 0.2}s, transform 0.8s ease ${0.3 + i * 0.2}s` }}>
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '20px', height: '1px', background: BLUE }} />
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>{card.eyebrow}</span>
              </div>

              {/* Title */}
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9, color: '#fff', marginBottom: '20px', letterSpacing: '0.01em' }}>
                {card.title.map((line, j) => <span key={j}>{line}<br /></span>)}
              </h2>

              {/* Desc */}
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '28px', maxWidth: '340px', fontWeight: 300, opacity: hovered === card.key ? 1 : 0.6, transition: 'opacity 0.3s' }}>{card.desc}</p>

              {/* CTA */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '11px', fontWeight: 700, color: '#fff',
                background: hovered === card.key ? BLUE : 'rgba(0,61,165,0.2)',
                border: `1px solid ${hovered === card.key ? BLUE : 'rgba(0,61,165,0.3)'}`,
                padding: '12px 24px', borderRadius: '4px',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 0.3s',
              }}>
                {card.cta}
              </div>
            </div>

            {/* Big number */}
            <div style={{ position: 'absolute', top: '50%', right: '-20px', transform: 'translateY(-50%)', fontFamily: "'Bebas Neue'", fontSize: '280px', color: 'rgba(255,255,255,0.02)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em' }}>
              {i + 1}
            </div>
          </Link>
        ))}
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          div[style*="display: flex; height: 100vh"] { flex-direction: column !important; height: auto !important; }
          div[style*="display: flex; height: 100vh"] > a { flex: 1 !important; min-height: 50vh !important; padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
}
