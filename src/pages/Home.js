import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLUE = '#003DA5';
const BLACK = '#0a0a0a';

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

const TRAVAUX = [
  { slug: 'cardinal-asphalte', nom: 'Cardinal Asphalte', domaine: 'Construction & Asphalte', image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784411817/Capture_d_e%CC%81cran_le_2026-07-18_a%CC%80_17.56.25_rfb74n.png' },
  { slug: 'sexxxplus', nom: 'SexxxPlus', domaine: 'Boutique érotique', image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410803/A7505403_sfvtwp.jpg' },
  { slug: 'nor-can', nom: 'Nor-Can', domaine: 'Chauffage & Climatisation', image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png' },
  { slug: 'famille-maher', nom: 'Famille Maher', domaine: 'Immobilier · RE/MAX', image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410790/Raf_Steve_ycvtgk.png' },
  { slug: 'goconsigne', nom: 'GoConsigne', domaine: 'Technologie & Environnement', image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410466/A7504056_xfafya.jpg' },
  { slug: 'lemire-automobiles', nom: 'Lemire Automobiles', domaine: 'Concessionnaire automobile', image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784411565/Capture_d_e%CC%81cran_le_2026-07-18_a%CC%80_17.52.07_pyng1i.png' },
];

const FORFAITS = [
  {
    titre: 'FORFAIT ESSENTIEL',
    sousTitre: '4 vidéos/mois',
    prix: '2 000$/mois',
    points: ['Stratégie & idéation', 'Préproduction & tournage', 'Montage & publication', 'Rapport mensuel'],
    populaire: false,
  },
  {
    titre: 'FORFAIT CROISSANCE',
    sousTitre: '8 vidéos/mois',
    prix: '3 500$/mois',
    points: ['Stratégie & idéation', 'Préproduction & tournage', 'Montage & publication', 'Rapport mensuel', 'Gestion communauté incluse'],
    populaire: true,
  },
];

function ContactForm() {
  const [form, setForm] = useState({ nomComplet: '', email: '', entreprise: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: '100%', background: '#ffffff', border: '0.5px solid rgba(0,0,0,0.15)',
    borderRadius: '8px', padding: '13px 16px', color: BLACK, fontSize: '14px',
    outline: 'none', fontFamily: "'DM Sans'", marginBottom: '14px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('https://formspree.io/f/xjgdjoer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          nom: form.nomComplet, email: form.email, entreprise: form.entreprise, message: form.message,
          _subject: `Nouveau message — ${form.nomComplet} (${form.entreprise || 'sans entreprise'})`,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center', background: '#f5f5f5', borderRadius: '16px' }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: '28px', color: BLACK, marginBottom: '12px' }}>MERCI.</div>
        <p style={{ fontFamily: "'DM Sans'", fontSize: '14px', color: 'rgba(10,10,10,0.6)' }}>
          On te répond dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, marginBottom: 0 }}>
        <input required type="text" placeholder="Prénom et nom" value={form.nomComplet} onChange={e => set('nomComplet', e.target.value)} style={inputStyle} />
      </div>
      <input required type="email" placeholder="Email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
      <input type="text" placeholder="Entreprise" value={form.entreprise} onChange={e => set('entreprise', e.target.value)} style={inputStyle} />
      <textarea required placeholder="Message" value={form.message} onChange={e => set('message', e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} />
      <button type="submit" disabled={sending} style={{
        width: '100%', fontSize: '12px', fontWeight: 700, color: '#fff', background: BLACK,
        padding: '16px', borderRadius: '8px', letterSpacing: '0.1em', textTransform: 'uppercase',
        border: 'none', cursor: sending ? 'default' : 'pointer', fontFamily: "'DM Sans'",
        transition: 'opacity 0.2s ease', opacity: sending ? 0.6 : 1,
      }}>
        {sending ? 'Envoi...' : 'Envoyer →'}
      </button>
      {error && (
        <p style={{ color: '#d1343c', fontSize: '13px', marginTop: '14px', textAlign: 'center', fontFamily: "'DM Sans'" }}>
          Une erreur est survenue. Réessaie ou écris-moi directement à raphael@auchumedia.com
        </p>
      )}
    </form>
  );
}

export default function Home() {
  return (
    <div style={{ background: '#ffffff', overflowX: 'clip' }}>
      <Nav />

      {/* HERO */}
      <section id="top" className="section-pad hero" style={{
        minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 60px 90px', position: 'relative',
      }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.45)', marginBottom: '28px' }}>
            Studio de contenu vidéo
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(64px, 9vw, 140px)',
            lineHeight: 0.88, textTransform: 'uppercase', margin: 0, maxWidth: '1100px',
          }}>
            L'ATTENTION<br />SE MÉRITE.<br />ON SAIT COMMENT<br />L'OBTENIR.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontFamily: "'DM Sans'", fontSize: '16px', color: 'rgba(10,10,10,0.55)', maxWidth: '480px', lineHeight: 1.7, margin: '32px 0 40px' }}>
            On produit du contenu vidéo stratégique pour les entreprises B2C qui veulent capter l'attention, bâtir leur autorité et convertir.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <button onClick={() => scrollTo('travaux')} style={{
            fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: BLACK, background: 'transparent',
            border: `1px solid ${BLACK}`, padding: '16px 32px', borderRadius: '6px',
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = BLACK; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BLACK; }}
          >
            Voir nos travaux →
          </button>
        </FadeIn>

        <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div className="scroll-indicator" style={{ width: '1px', height: '36px', background: 'rgba(10,10,10,0.25)' }} />
        </div>
      </section>

      {/* TRAVAUX */}
      <section id="travaux" className="section-pad" style={{ padding: '140px 60px', background: '#ffffff' }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(40px, 5vw, 64px)', margin: 0, textTransform: 'uppercase' }}>
            Nos travaux.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'DM Sans'", fontSize: '15px', color: 'rgba(10,10,10,0.5)', margin: '14px 0 56px' }}>
            Des mandats choisis. Une qualité sans compromis.
          </p>
        </FadeIn>

        <div className="travaux-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {TRAVAUX.map((t, i) => (
            <FadeIn key={t.slug} delay={0.05 * i}>
              <Link to={`/travaux/${t.slug}`} className="travail-card" style={{
                position: 'relative', display: 'block', height: '400px', borderRadius: '12px',
                overflow: 'hidden', backgroundColor: '#111',
              }}>
                <div className="travail-img" style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${t.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
                  transition: 'transform 0.3s ease',
                }} />
                <div className="travail-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 100%)',
                  transition: 'opacity 0.3s ease',
                }} />
                <div style={{ position: 'absolute', left: '24px', bottom: '22px', right: '24px' }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: '#fff', letterSpacing: '0.02em' }}>{t.nom}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{t.domaine}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* APPROCHE */}
      <section id="approche" className="section-pad" style={{ padding: '140px 60px', background: BLACK }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", color: '#fff', fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 0 56px', textTransform: 'uppercase' }}>
            Notre approche.
          </h2>
        </FadeIn>

        <div className="approche-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '64px', alignItems: 'start' }}>
          <FadeIn direction="left">
            <div style={{ fontFamily: "'DM Sans'", fontSize: '20px', color: '#fff', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <p style={{ margin: 0 }}>On ne travaille pas avec tout le monde. On choisit 6 à 8 clients par année — par choix. Pas par manque de demande.</p>
              <p style={{ margin: 0 }}>Chaque mandat reçoit l'attention complète de notre équipe. Pas de junior qui gère ton compte pendant que le senior vend. Nous.</p>
              <p style={{ margin: 0 }}>Du contenu qui ressemble à ton entreprise, qui parle à ton audience, et qui génère de vraies résultats.</p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {[
                { chiffre: '6-8', label: 'clients par année' },
                { chiffre: '100%', label: 'de notre attention sur chaque mandat' },
                { chiffre: '0', label: 'contenu générique produit' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '56px', color: BLUE, lineHeight: 1 }}>{stat.chiffre}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '8px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad" style={{ padding: '140px 60px', background: '#ffffff' }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(40px, 5vw, 64px)', margin: '0 0 56px', textTransform: 'uppercase' }}>
            Ce qu'on fait.
          </h2>
        </FadeIn>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {FORFAITS.map((f, i) => (
            <FadeIn key={f.titre} delay={0.1 * i}>
              <div style={{ position: 'relative', background: '#f5f5f5', borderRadius: '16px', padding: '48px', height: '100%' }}>
                {f.populaire && (
                  <div style={{
                    position: 'absolute', top: '24px', right: '24px', background: BLUE, color: '#fff',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '5px 12px', borderRadius: '999px',
                  }}>
                    Populaire
                  </div>
                )}
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '26px', color: BLACK, letterSpacing: '0.01em' }}>
                  {f.titre} <span style={{ color: 'rgba(10,10,10,0.4)', fontSize: '18px' }}>({f.sousTitre})</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '40px', color: BLUE, margin: '18px 0 28px' }}>{f.prix}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {f.points.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'DM Sans'", fontSize: '14px', color: 'rgba(10,10,10,0.7)' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p style={{ fontFamily: "'DM Sans'", fontSize: '14px', color: 'rgba(10,10,10,0.5)', fontStyle: 'italic', textAlign: 'center', margin: '48px 0 0' }}>
            Chaque mandat est unique. Si tu cherches quelque chose de différent, parlons-en.
          </p>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad" style={{ padding: '140px 60px', background: '#ffffff' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          <FadeIn direction="left">
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.95, margin: '0 0 24px', textTransform: 'uppercase' }}>
                TRAVAILLONS<br />ENSEMBLE.
              </h2>
              <p style={{ fontFamily: "'DM Sans'", fontSize: '15px', color: 'rgba(10,10,10,0.55)', maxWidth: '380px', lineHeight: 1.7, marginBottom: '28px' }}>
                Une idée de projet, une question, ou simplement envie de jaser contenu vidéo ? Écris-nous.
              </p>
              <a href="mailto:raphael@auchumedia.com" style={{ fontFamily: "'DM Sans'", fontSize: '16px', fontWeight: 700, color: BLACK, display: 'inline-block', marginBottom: '28px', borderBottom: `1px solid ${BLACK}` }}>
                raphael@auchumedia.com
              </a>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="https://instagram.com/auchumedia" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke={BLUE} strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" stroke={BLUE} strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1" fill={BLUE} />
                  </svg>
                </a>
                <a href="https://tiktok.com/@auchumedia" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(10px); opacity: 1; }
        }
        .scroll-indicator { animation: scrollBounce 1.8s ease-in-out infinite; }

        .travail-card:hover .travail-img { transform: scale(1.04); }
        .travail-card:hover .travail-overlay { opacity: 0.85; }

        @media (max-width: 768px) {
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .hero { padding-left: 20px !important; padding-right: 20px !important; padding-bottom: 60px !important; }
          .travaux-grid { grid-template-columns: 1fr !important; }
          .approche-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  );
}
