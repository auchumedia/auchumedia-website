import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLUE = '#003DA5';

export default function Projets() {
  const [lang, setLang] = useState('fr');
  const fr = lang === 'fr';

  const projects = [
    { cat: 'Hockey · LNAH · Always-On', name: 'Le Bataillon LNAH', desc: fr ? "Stratégie de contenu complète, gestion des médias sociaux et production de contenu hebdomadaire pour l'équipe de hockey du Bataillon." : "Complete content strategy, social media management and weekly content production for the Bataillon hockey team.", stat: '+1M', statLabel: fr ? 'VUES' : 'VIEWS', tags: ['Always-On', 'Hockey'] },
    { cat: fr ? 'Production · Web série' : 'Production · Web series', name: 'NorCan — Au cœur du confort', desc: fr ? "Production d'une web série premium sur YouTube pour NorCan, mettant en valeur leur expertise et leur culture d'entreprise." : "Production of a premium YouTube web series for NorCan, showcasing their expertise and company culture.", stat: fr ? 'SÉRIE' : 'SERIES', statLabel: fr ? 'LANCÉE' : 'LAUNCHED', tags: ['YouTube', fr ? 'Web série' : 'Web series'], statColor: BLUE },
    { cat: 'Always-On · Contenu', name: 'SexxxPlus', desc: fr ? "Stratégie de contenu organique et gestion complète des réseaux sociaux, générant plus de 20 millions de vues." : "Organic content strategy and complete social media management, generating over 20 million views.", stat: '+20M', statLabel: fr ? 'VUES' : 'VIEWS', tags: ['Always-On', fr ? 'Contenu viral' : 'Viral content'], statColor: BLUE },
    { cat: fr ? 'Production · Collaboration' : 'Production · Collaboration', name: 'Pizza Salvatoré × TipsyGuy', desc: fr ? "Production d'une publicité vidéo créative en collaboration avec le créateur TipsyGuy." : "Production of a creative video advertisement in collaboration with creator TipsyGuy.", stat: 'VIRAL', statLabel: '', tags: [fr ? 'Pub vidéo' : 'Video ad', fr ? 'Collaboration' : 'Collaboration'] },
    { cat: fr ? 'Production vidéo' : 'Video production', name: 'Transport Tardif', desc: fr ? "Production de contenu de marque pour Transport Tardif, renforçant leur image professionnelle." : "Brand content production for Transport Tardif, strengthening their professional image.", stat: fr ? 'LIVRÉ' : 'DELIVERED', statLabel: '', tags: [fr ? 'Contenu de marque' : 'Brand content'] },
    { cat: 'Always-On · Contenu', name: 'Fruitz', desc: fr ? "Stratégie de contenu et gestion des médias sociaux pour Fruitz, une marque lifestyle dynamique." : "Content strategy and social media management for Fruitz, a dynamic lifestyle brand.", stat: '↑', statLabel: fr ? 'CROISSANCE' : 'GROWTH', tags: ['Always-On', 'Lifestyle'] },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '148px 60px 72px', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ position: 'absolute', top: '-96px', right: '-96px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{ width: '26px', height: '1px', background: BLUE }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Notre portfolio' : 'Our portfolio'}</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(60px, 8vw, 104px)', lineHeight: 0.9, color: '#fff', marginBottom: '18px' }}>
          {fr ? <>NOS<br />PROJETS.</> : <>OUR<br />PROJECTS.</>}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(20px, 2.8vw, 32px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em' }}>
          {fr ? "Du contenu qui performe. Des marques qui rayonnent." : "Content that performs. Brands that shine."}
        </p>
      </section>

      {/* GRID */}
      <section style={{ padding: '64px 60px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          {fr ? 'Tous les projets' : 'All projects'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {projects.map((p, i) => (
            <div key={i} style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ height: '192px', background: i % 2 === 0 ? '#080f1c' : '#0d0d0d', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: '100px', color: 'rgba(255,255,255,0.03)', position: 'absolute' }}>0{i+1}</span>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: BLUE, marginBottom: '8px' }}>{p.cat}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{p.name}</div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '12px', fontWeight: 300 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', background: 'rgba(0,61,165,0.08)', color: BLUE, border: '0.5px solid rgba(0,61,165,0.2)' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: p.statColor || '#fff' }}>
                  {p.stat} <span style={{ fontSize: '14px', fontFamily: "'DM Sans'", fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>{p.statLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '88px 60px', textAlign: 'center', background: '#0d0d0d', borderTop: '0.5px solid rgba(255,255,255,0.12)' }}>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '0.04em', lineHeight: 0.95, marginBottom: '36px', color: '#fff' }}>
          {fr ? <>PRÊT À BÂTIR<br />TA MARQUE ?</> : <>READY TO BUILD<br />YOUR BRAND?</>}
        </h2>
        <Link to="/athletes#form" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {fr ? 'Démarrer un projet →' : 'Start a project →'}
        </Link>
      </section>

      <Footer />
    </div>
  );
}
