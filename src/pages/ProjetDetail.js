import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TikTokCarousel from '../components/TikTokCarousel';
import { getProjetBySlug } from '../data/projets';

const BLUE = '#003DA5';

export default function ProjetDetail() {
  const { slug } = useParams();
  const [lang, setLang] = useState('fr');
  const fr = lang === 'fr';

  const projet = getProjetBySlug(slug);
  if (!projet) return <Navigate to="/projets" replace />;

  const t = {
    back: fr ? '← Retour' : '← Back',
    vues: fr ? 'Vues' : 'Views',
    engagement: 'Engagement',
    videos: fr ? 'Vidéos' : 'Videos',
    abonnes: fr ? 'Abonnés' : 'Followers',
    videosLabel: fr ? 'Contenu' : 'Content',
    empty: fr ? 'Vidéos à venir' : 'Videos coming soon',
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO */}
      <section style={{
        position: 'relative', overflow: 'hidden', minHeight: '70vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '148px 60px 72px', borderBottom: '0.5px solid rgba(255,255,255,0.12)',
        background: 'linear-gradient(135deg, #111 0%, #080808 65%)',
      }}>
        <div style={{ position: 'absolute', top: '-96px', right: '-96px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Link
          to="/projets"
          style={{ display: 'inline-block', width: 'fit-content', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '40px', transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
        >
          {t.back}
        </Link>

        <span style={{ display: 'inline-block', width: 'fit-content', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE, background: 'rgba(0,61,165,0.08)', border: '0.5px solid rgba(0,61,165,0.25)', padding: '6px 12px', borderRadius: '20px', marginBottom: '16px' }}>
          {projet.categorie[lang]}
        </span>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 8vw, 104px)', lineHeight: 0.9, color: '#fff', marginBottom: '20px' }}>
          {projet.client}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(18px, 2.4vw, 28px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.03em', maxWidth: '560px' }}>
          {projet.description[lang]}
        </p>
      </section>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        {[
          { num: projet.stats.vues, label: t.vues },
          { num: projet.stats.engagement, label: t.engagement },
          { num: projet.stats.videos, label: t.videos },
          { num: projet.stats.abonnes, label: t.abonnes },
        ].map((s, i) => (
          <div key={i} style={{ padding: '36px 0', textAlign: 'center', borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.12)' : 'none' }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: '36px', color: '#fff', lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* TIKTOK CAROUSEL */}
      <section style={{ padding: '64px 60px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          {t.videosLabel}
        </div>
        <TikTokCarousel videos={projet.tiktokVideos} emptyLabel={t.empty} />
      </section>

      <Footer />
    </div>
  );
}
