import React, { useState, useEffect } from 'react';
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
    },
    {
      key: 'entreprises',
      to: '/entreprises',
      eyebrow: fr ? 'Pour les entreprises' : 'For businesses',
      title: fr ? ['PROPULSONS', 'VOTRE', 'CROISSANCE.'] : ["LET'S SCALE", 'YOUR', 'BUSINESS.'],
      desc: fr ? 'Médias sociaux, Meta Ads et CRM pour les entreprises B2C ambitieuses.' : 'Social media, Meta Ads and CRM for ambitious B2C businesses.',
      cta: fr ? 'Je suis une entreprise →' : 'I am a business →',
    },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Mini top bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500, background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(10px)', borderBottom: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '52px' }}>
        <div><img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '22px', width: 'auto' }} /></div>
        <div style={{ display: 'flex', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
          {['fr', 'en'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ fontSize: '9px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', border: 'none', background: lang === l ? 'rgba(255,255,255,0.1)' : 'transparent', color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans'" }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* HERO split */}
      <div style={{ display: 'flex', height: '100vh', paddingTop: '52px' }}>
        {cards.map((card, i) => (
          <a key={card.key} href={card.to}
            onMouseEnter={() => setHovered(card.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: hovered === card.key ? '1.6' : hovered && hovered !== card.key ? '0.4' : '1',
              transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative', overflow: 'hidden', display: 'flex',
              flexDirection: 'column', justifyContent: 'flex-end',
              padding: '60px', cursor: 'pointer', textDecoration: 'none',
              borderRight: i === 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
              background: '#080808',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at ${i === 0 ? '30%' : '70%'} 40%, rgba(0,61,165,${hovered === card.key ? '0.12' : '0.05'}) 0%, transparent 70%)`, transition: 'all 0.5s', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(30px)', transition: `opacity 0.8s ease ${0.3 + i * 0.2}s, transform 0.8s ease ${0.3 + i * 0.2}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '20px', height: '1px', background: BLUE }} />
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>{card.eyebrow}</span>
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9, color: '#fff', marginBottom: '20px', letterSpacing: '0.01em' }}>
                {card.title.map((line, j) => <span key={j}>{line}<br /></span>)}
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '28px', maxWidth: '340px', fontWeight: 300, opacity: hovered === card.key ? 1 : 0.6, transition: 'opacity 0.3s' }}>{card.desc}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#fff', background: hovered === card.key ? BLUE : 'rgba(0,61,165,0.2)', border: `1px solid ${hovered === card.key ? BLUE : 'rgba(0,61,165,0.3)'}`, padding: '12px 24px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s' }}>
                {card.cta}
              </div>
            </div>
            <div style={{ position: 'absolute', top: '50%', right: '-20px', transform: 'translateY(-50%)', fontFamily: "'Bebas Neue'", fontSize: '280px', color: 'rgba(255,255,255,0.02)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
              {i + 1}
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="display: flex; height: 100vh"] { flex-direction: column !important; height: auto !important; }
          div[style*="display: flex; height: 100vh"] > a { flex: 1 !important; min-height: 50vh !important; padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
}
