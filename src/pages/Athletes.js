import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const BLUE = '#003DA5';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const t = { up: 'translateY(30px)', left: 'translateX(-30px)', right: 'translateX(30px)', none: 'none' };
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : t[direction], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const navLinks = [
  { id: 'a-propos', labelFr: 'À propos', labelEn: 'About' },
  { id: 'services', labelFr: 'Services', labelEn: 'Services' },
  { id: 'clients', labelFr: 'Clients', labelEn: 'Clients' },
  { id: 'contact', labelFr: 'Contact', labelEn: 'Contact' },
];

function ContactForm({ fr }) {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', organisation: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: '100%', background: '#0a0a0a', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '13px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans'", marginBottom: '14px' };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: '8px', letterSpacing: '0.02em' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://formspree.io/f/xjgdjoer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          prenom: form.prenom, nom: form.nom, email: form.email,
          organisation: form.organisation, message: form.message,
          _subject: `Nouvelle demande athlète — ${form.prenom} ${form.nom}`
        })
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(0,61,165,0.35)', borderRadius: '16px', padding: '56px 40px', textAlign: 'center', animation: 'fadeInUp 0.5s ease forwards' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: '28px', color: '#ffffff', marginBottom: '12px', letterSpacing: '0.02em' }}>
          {fr ? 'DEMANDE REÇUE !' : 'REQUEST RECEIVED!'}
        </div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
          {fr ? 'Mon équipe te contactera dans les 48h.' : 'My team will contact you within 48h.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '40px', maxWidth: '560px', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
        <div>
          <label style={labelStyle}>{fr ? 'Prénom *' : 'First name *'}</label>
          <input required type="text" value={form.prenom} onChange={e => set('prenom', e.target.value)} placeholder="Jean" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{fr ? 'Nom *' : 'Last name *'}</label>
          <input required type="text" value={form.nom} onChange={e => set('nom', e.target.value)} placeholder="Dupont" style={inputStyle} />
        </div>
      </div>
      <label style={labelStyle}>Email *</label>
      <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jean@courriel.com" style={inputStyle} />
      <label style={labelStyle}>{fr ? 'Ligue / Organisation' : 'League / Organization'}</label>
      <input type="text" value={form.organisation} onChange={e => set('organisation', e.target.value)} placeholder={fr ? 'Optionnel' : 'Optional'} style={inputStyle} />
      <label style={labelStyle}>{fr ? 'Message *' : 'Message *'}</label>
      <textarea required value={form.message} onChange={e => set('message', e.target.value)} placeholder={fr ? 'Parle-moi de ton projet...' : 'Tell me about your project...'} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} />
      <button type="submit" disabled={sending} style={{ width: '100%', fontSize: '12px', fontWeight: 700, color: '#fff', background: BLUE, padding: '15px', borderRadius: '6px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: sending ? 'default' : 'pointer', fontFamily: "'DM Sans'", transition: 'opacity 0.3s ease', opacity: sending ? 0.6 : 1, marginTop: '4px' }}>
        {sending ? (fr ? 'Envoi...' : 'Sending...') : (fr ? 'Envoyer →' : 'Send →')}
      </button>
    </form>
  );
}

export default function Athletes() {
  const [lang, setLang] = useState('fr');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const videoRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [splashLeaving, setSplashLeaving] = useState(false);
  const splashTriggered = useRef(false);
  const fr = lang === 'fr';

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const replaySplash = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    setSplashLeaving(false);
    setShowSplash(true);
  };

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showSplash]);

  useEffect(() => {
    if (!showSplash) return;
    splashTriggered.current = false;

    const triggerSplashExit = () => {
      if (splashTriggered.current) return;
      splashTriggered.current = true;
      window.removeEventListener('wheel', triggerSplashExit);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      setSplashLeaving(true);
      setTimeout(() => setShowSplash(false), 900);
    };

    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 10) { // scroll vers le bas de plus de 10px
        triggerSplashExit();
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('wheel', triggerSplashExit, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('wheel', triggerSplashExit);
    };
  }, [showSplash]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${Math.min(window.scrollY * 0.15, 100)}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => scrollTo(id), 100);
    }
  }, []);

  const pourquoiItems = [
    {
      titre: { fr: 'Contrôle de ton image', en: 'Control your narrative' },
      desc: {
        fr: "Plutôt qu'être défini par les médias ou tes performances du moment, tu deviens maître de ton histoire et de la façon dont le monde te perçoit.",
        en: "Rather than being defined by media or your on-ice performances, you become the author of your story and how the world perceives you.",
      },
      gradient: 'linear-gradient(135deg, #1a0a2a, #2a1a3a)',
    },
    {
      titre: { fr: 'Revenus diversifiés', en: 'Diversified revenue' },
      desc: {
        fr: "Collaborations commerciales, placements de produits, contenu monétisé. Un bon branding ouvre des portes financières bien au-delà du sport.",
        en: "Brand collaborations, product placements, monetized content. Strong branding opens financial doors well beyond the sport itself.",
      },
      image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1788118137/Capture_d_%C3%A9cran_le_2026-08-30_%C3%A0_15.28.22_wwxod5.png',
    },
    {
      titre: { fr: "Préparer l'après-carrière", en: 'Post-career preparation' },
      desc: {
        fr: "Un branding fort te garde visible et pertinent même après avoir raccroché les patins — que ce soit pour lancer une entreprise, devenir analyste ou mentor.",
        en: "A strong personal brand keeps you visible and relevant even after you hang up the skates — whether to launch a business, become an analyst or a mentor.",
      },
      image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1788122678/Capture_d_%C3%A9cran_le_2026-08-30_%C3%A0_16.43.54_qlkahx.png',
    },
  ];

  const services = fr ? [
    { icon: '🎬', title: 'Highlights & Clips', desc: "Des capsules dynamiques de tes meilleurs moments sur glace, optimisées pour capter l'attention et être partagées sur toutes les plateformes." },
    { icon: '🏷️', title: 'Personal Branding & Stratégie', desc: "Une identité de marque cohérente — positionnement, ton, esthétique — pour que ton image reflète vraiment qui tu es." },
    { icon: '🤝', title: 'Brand Partnerships', desc: "J'identifie les marques qui te ressemblent et je structure des collaborations qui reflètent ta vraie valeur." },
    { icon: '🎥', title: 'Production YouTube & Mini-docs', desc: "Des formats longs pour approfondir ton histoire — entraînements, quotidien, coulisses — et bâtir une connexion durable avec ton audience." },
  ] : [
    { icon: '🎬', title: 'Highlights & Clips', desc: "Dynamic clips of your best on-ice moments, optimized to capture attention and get shared across every platform." },
    { icon: '🏷️', title: 'Personal Branding & Strategy', desc: "A consistent brand identity — positioning, tone, aesthetic — so your image truly reflects who you are." },
    { icon: '🤝', title: 'Brand Partnerships', desc: "I identify brands that match who you are and structure collaborations that reflect your real value." },
    { icon: '🎥', title: 'YouTube & Mini-doc Production', desc: "Long-form content to dig deeper into your story — training, day-to-day life, behind the scenes — building a lasting connection with your audience." },
  ];

  const clients = [
    {
      name: 'Bataillon',
      domaine: fr ? 'Hockey · LNAH' : 'Hockey · LNAH',
      gradient: 'linear-gradient(160deg, #1a2e1a 0%, #0a140a 100%)',
      stats: fr ? '3M vues · 100K eng · 38 vidéos' : '3M views · 100K eng · 38 videos',
    },
    {
      name: 'Sylvestre',
      domaine: fr ? 'Hockey · LNAH' : 'Hockey · LNAH',
      gradient: 'linear-gradient(160deg, #0a1628 0%, #050a14 100%)',
      stats: fr ? '2M vues · 26K eng · 7 vidéos' : '2M views · 26K eng · 7 videos',
    },
    {
      name: 'Hockey Extrême',
      domaine: fr ? 'Camps & Formation' : 'Camps & Training',
      gradient: 'linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)',
      stats: fr ? 'Camp élite · Pros NHL' : 'Elite camp · NHL pros',
    },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Helmet>
        <title>{fr ? 'Athlètes | AuchuMedia — Building Athletes Brands' : 'Athletes | AuchuMedia — Building Athletes Brands'}</title>
        <meta name="description" content={fr ? "J'aide les joueurs de hockey de haut niveau à bâtir leur marque personnelle sur et hors glace. Personal branding, production vidéo et partenariats." : "I help elite hockey players build their personal brand on and off the ice. Personal branding, video production and brand partnerships."} />
        <meta name="keywords" content="personal branding hockey, contenu vidéo athlète, agence marketing sportif Québec, storytelling athlète, commandite hockey, building athletes brands" />
        <link rel="canonical" href="https://auchumedia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auchumedia.com/" />
        <meta property="og:title" content={fr ? 'Athlètes | AuchuMedia — Building Athletes Brands' : 'Athletes | AuchuMedia — Building Athletes Brands'} />
        <meta property="og:description" content={fr ? "J'aide les joueurs de hockey de haut niveau à bâtir leur marque personnelle sur et hors glace." : "I help elite hockey players build their personal brand on and off the ice."} />
        <meta property="og:image" content="https://auchumedia.com/Copie%20de%20AUCHU.png.png" />
      </Helmet>

      {/* ===== SPLASH SCREEN ===== */}
      {showSplash && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#080808',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transition: splashLeaving ? 'transform 0.9s ease-in-out' : 'none',
          transform: splashLeaving ? 'scaleY(0)' : 'scaleY(1)',
          transformOrigin: 'top'
        }}>
          <div className="splash-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '16px', fontFamily: "'DM Sans'", textAlign: 'center' }}>
              {fr ? 'Building Athletes Brands' : 'Building Athletes Brands'}
            </p>
          </div>
          <div className="splash-explore" style={{ position: 'absolute', bottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans'", textTransform: 'uppercase' }}>
              {fr ? 'Explorer' : 'Explore'}
            </span>
            <svg className="bounce" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
        </div>
      )}

      {/* ===== NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.08)' : '0.5px solid transparent',
        transition: 'all 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '72px', gap: '16px'
      }}>
        <button onClick={replaySplash} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '22px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }} className="nav-links">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{
              fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.75)',
              background: 'transparent', border: 'none',
              padding: '10px 16px', cursor: 'pointer',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              fontFamily: "'DM Sans'", whiteSpace: 'nowrap',
              transition: 'color 0.3s ease'
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
            >
              {fr ? link.labelFr : link.labelEn}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }} className="nav-right">
          <div style={{ display: 'flex', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            {['fr', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ fontSize: '9px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', border: 'none', background: lang === l ? 'rgba(255,255,255,0.15)' : 'transparent', color: lang === l ? '#ffffff' : 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans'", transition: 'all 0.3s ease' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '11px 22px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans'", transition: 'all 0.3s ease', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,61,165,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {fr ? 'Travailler avec moi' : 'Work with me'}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger-btn" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexShrink: 0 }}>
            <span style={{ width: '22px', height: '1.5px', background: '#fff', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#fff', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.25s' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#fff', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0, zIndex: 490, background: 'rgba(0,0,0,0.98)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', padding: '24px 24px', gap: '4px', overflowY: 'auto' }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => { scrollTo(link.id); setMobileOpen(false); }} style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.75)', background: 'transparent', border: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '16px 0', cursor: 'pointer', textAlign: 'left', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'DM Sans'", width: '100%' }}>
              {fr ? link.labelFr : link.labelEn}
            </button>
          ))}
          <button onClick={() => { scrollTo('contact'); setMobileOpen(false); }} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'", marginTop: '20px' }}>
            {fr ? 'Travailler avec moi' : 'Work with me'}
          </button>
        </div>
      )}

      {/* ===== HERO ===== */}
      <div style={{
        opacity: splashLeaving ? 1 : 0,
        transform: splashLeaving ? 'scale(1)' : 'scale(1.05)',
        transition: 'opacity 0.9s ease-in-out, transform 0.9s ease-in-out'
      }}>
      <section style={{ height: '100vh', marginTop: 0, paddingTop: 0, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <video
            ref={videoRef}
            autoPlay muted loop playsInline crossOrigin="anonymous"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '116%', objectFit: 'cover' }}
          >
            <source src="https://res.cloudinary.com/dr0kwuqqa/video/upload/v1788114759/edit_playoff-3_zidax5.mp4" type="video/mp4" />
            <source src="https://res.cloudinary.com/dr0kwuqqa/video/upload/v1788114759/edit_playoff-3_zidax5.mov" type="video/quicktime" />
          </video>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />

        <div className="hero-content" style={{ position: 'absolute', bottom: '60px', left: '60px', right: '40%', zIndex: 2 }}>
          <div className="hero-label" style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {fr ? 'BUILDING ATHLETES BRANDS' : 'BUILDING ATHLETES BRANDS'}
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 64px)', lineHeight: 1, color: '#ffffff', marginBottom: '32px', letterSpacing: '0.01em' }}>
            {fr ? <>TA CARRIÈRE.<br />TON IMAGE.<br />TON HÉRITAGE.</> : <>YOUR CAREER.<br />YOUR IMAGE.<br />YOUR LEGACY.</>}
          </h1>
          <div className="hero-cta">
            <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: 'transparent', padding: '10px 24px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1.5px solid rgba(255,255,255,0.8)', cursor: 'pointer', fontFamily: "'DM Sans'", transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#0a0a0a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
            >
              {fr ? 'Travailler avec moi →' : 'Work with me →'}
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <svg className="bounce" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </section>
      </div>

      {/* ===== MISSION / À PROPOS ===== */}
      <section id="a-propos" style={{ padding: '120px 60px', background: '#ffffff', scrollMarginTop: '72px' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeIn direction="left">
            <div>
              <div style={{ width: '48px', height: '3px', background: BLUE, marginBottom: '20px' }} />
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
                {fr ? 'Ma mission' : 'My mission'}
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(40px, 5vw, 72px)', color: '#0a0a0a', lineHeight: 0.95, marginBottom: '28px', letterSpacing: '0.01em' }}>
                {fr ? <>LE HOCKEY<br />MÉRITE MIEUX.</> : <>HOCKEY<br />DESERVES MORE.</>}
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(10,10,10,0.6)', lineHeight: 1.9, fontFamily: "'DM Sans'", fontWeight: 300 }}>
                {fr
                  ? "Dans plusieurs sports professionnels, l'image personnelle est devenue aussi importante que la performance elle-même. Au hockey, cette réalité reste encore trop souvent ignorée — je continue de voir des joueurs miser uniquement sur les statistiques, en oubliant que les marques et les partisans s'attachent d'abord à une histoire, une personnalité, une communauté. Les joueurs qui prennent le contrôle de leur récit — qui documentent leur parcours, partagent qui ils sont vraiment et bâtissent une audience fidèle — se positionnent différemment : plus visibles, plus attractifs pour les commanditaires, et mieux préparés pour l'après-carrière. Je crois que chaque joueur mérite cette opportunité, peu importe son niveau."
                  : "In many professional sports, personal image has become just as important as performance itself. In hockey, that reality is still too often ignored — I keep seeing players rely only on stats, forgetting that brands and fans connect first with a story, a personality, a community. Players who take control of their narrative — documenting their journey, sharing who they truly are, and building a loyal audience — position themselves differently: more visible, more attractive to sponsors, and better prepared for life after their playing career. I believe every player deserves that opportunity, no matter their level."}
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.15}>
            <div style={{ background: '#f5f5f5', borderLeft: `4px solid ${BLUE}`, padding: '56px 48px', position: 'relative' }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '100px', color: 'rgba(0,61,165,0.18)', lineHeight: 0.5, marginBottom: '8px' }}>"</div>
              <p style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(24px, 3vw, 40px)', color: '#0a0a0a', lineHeight: 1.15, letterSpacing: '0.005em', fontStyle: 'italic' }}>
                {fr
                  ? "Ceux qui marquent vraiment l'histoire bâtissent une image solide sur et en dehors de la glace."
                  : "Those who truly make history build a strong image on and off the ice."}
              </p>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '100px', color: 'rgba(0,61,165,0.18)', lineHeight: 0.2, marginTop: '24px', textAlign: 'right' }}>"</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== FONDATEUR ===== */}
      <section style={{ padding: '120px 60px', background: '#ffffff' }}>
        <div className="two-col founder-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '80px', alignItems: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn direction="left">
            <div style={{ width: '100%', maxWidth: '400px', height: '500px', borderRadius: '16px', background: 'linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '0 auto' }}>
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
                {fr ? 'Photo à venir' : 'Photo coming soon'}
              </span>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.15}>
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 56px)', color: '#0a0a0a', letterSpacing: '0.02em', marginBottom: '10px' }}>
                RAPHAËL AUCHU
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(10,10,10,0.5)', fontFamily: "'DM Sans'", marginBottom: '24px' }}>
                {fr ? 'Brand Builder & Ancien joueur LHJMQ' : 'Brand Builder & Former QMJHL Player'}
              </p>
              <div style={{ width: '100%', height: '1px', background: 'rgba(0,61,165,0.25)', marginBottom: '24px' }} />
              <p style={{ fontSize: '15px', color: 'rgba(10,10,10,0.65)', lineHeight: 1.9, fontFamily: "'DM Sans'", fontWeight: 300, marginBottom: '24px' }}>
                {fr
                  ? "Ancien gardien de but repêché dans la LHJMQ, Raphaël a vécu de l'intérieur les hauts et les bas du hockey junior — la pression de performer, la compétition pour une place, et l'incertitude de l'après-carrière. Cette expérience l'a convaincu qu'un joueur ne devrait jamais dépendre uniquement de ses statistiques pour être reconnu."
                  : "A former QMJHL drafted goaltender, Raphaël experienced firsthand the highs and lows of junior hockey — the pressure to perform, the competition for a spot, and the uncertainty of life after the game. That experience convinced him that a player should never have to rely on stats alone to be recognized."}
              </p>
              <p style={{ fontSize: '15px', color: 'rgba(10,10,10,0.65)', lineHeight: 1.9, fontFamily: "'DM Sans'", fontWeight: 300, marginBottom: '32px' }}>
                {fr
                  ? "Il a fondé AuchuMedia pour donner aux athlètes les outils, la stratégie et la caméra nécessaires pour raconter leur propre histoire — et pour qu'ils gardent le contrôle de leur image, sur la glace comme en dehors."
                  : "He founded AuchuMedia to give athletes the tools, strategy and camera they need to tell their own story — and to stay in control of their image, on the ice and off it."}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" style={{ padding: '120px 60px', background: '#000000', scrollMarginTop: '72px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
              {fr ? 'Mes services' : 'My services'}
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#ffffff', letterSpacing: '0.02em' }}>
              {fr ? 'CE QUE JE FAIS.' : 'WHAT I DO.'}
            </h2>
          </div>
        </FadeIn>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '960px', margin: '0 auto' }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="service-card"
                style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '36px', position: 'relative', overflow: 'hidden', height: '100%', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,61,165,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ position: 'absolute', top: '12px', right: '20px', fontFamily: "'Bebas Neue'", fontSize: '90px', color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>
                  0{i + 1}
                </span>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '32px', marginBottom: '18px' }}>{s.icon}</div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '12px', fontFamily: "'DM Sans'" }}>{s.title}</h3>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontWeight: 300, margin: '0 0 20px' }}>{s.desc}</p>
                  <div style={{ width: '40px', height: '3px', background: BLUE }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== POURQUOI ===== */}
      <section id="pourquoi" style={{ background: '#050505', padding: '100px 60px 200px' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', fontFamily: "'Bebas Neue'", fontSize: 'clamp(40px,5vw,64px)', marginBottom: '80px', letterSpacing: '0.02em' }}>
          {fr ? 'POURQUOI AUCHUMEDIA ?' : 'WHY AUCHUMEDIA?'}
        </h2>

        <div>
          {pourquoiItems.map((item, i) => (
            <div
              key={i}
              className="pourquoi-card"
              style={{
                position: 'sticky',
                top: `${80 + i * 30}px`,
                zIndex: i + 1,
                height: '500px',
                maxWidth: '900px',
                margin: '0 auto',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.image ? (
                <img src={item.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: item.gradient }} />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 100%)' }} />
              <div className="pourquoi-card-text" style={{ position: 'absolute', bottom: '48px', left: '48px', maxWidth: '440px', zIndex: 2 }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#003DA5', marginBottom: '12px' }}>
                  {fr ? 'POURQUOI AUCHUMEDIA' : 'WHY AUCHUMEDIA'}
                </div>
                <div className="pourquoi-card-title" style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 48px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
                  {fr ? item.titre.fr : item.titre.en}
                </div>
                <p className="pourquoi-card-desc" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: 0 }}>
                  {fr ? item.desc.fr : item.desc.en}
                </p>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '24px', letterSpacing: '0.1em' }}>
                  0{i + 1} / 0{pourquoiItems.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CLIENTS ===== */}
      <section id="clients" style={{ padding: '120px 60px', background: '#ffffff', scrollMarginTop: '72px' }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#0a0a0a', letterSpacing: '0.02em', textAlign: 'center', marginBottom: '64px' }}>
            {fr ? 'ILS ME FONT CONFIANCE.' : 'THEY TRUST ME.'}
          </h2>
        </FadeIn>
        <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '1080px', margin: '0 auto' }}>
          {clients.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.1}>
              <div
                className="client-card"
                style={{ background: '#0a0a0a', height: '360px', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.015)'; e.currentTarget.querySelector('.client-overlay').style.opacity = 1; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.querySelector('.client-overlay').style.opacity = 0; }}
              >
                <div style={{ flex: 1, position: 'relative', background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
                    {fr ? 'Photo/vidéo à venir' : 'Photo/video coming soon'}
                  </span>
                  <div className="client-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,61,165,0.3)', opacity: 0, transition: 'opacity 0.3s ease' }} />
                </div>
                <div style={{ padding: '22px 24px' }}>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE, marginBottom: '6px' }}>{c.domaine}</span>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '26px', color: '#ffffff', marginBottom: '10px', letterSpacing: '0.02em' }}>{c.name}</div>
                  <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans'" }}>{c.stats}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ padding: '120px 60px', background: '#000000', scrollMarginTop: '72px' }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(40px, 5vw, 72px)', color: '#ffffff', letterSpacing: '0.01em', lineHeight: 0.95, textAlign: 'center', marginBottom: '16px' }}>
            {fr ? <>TRAVAILLONS<br />ENSEMBLE.</> : <>LET'S WORK<br />TOGETHER.</>}
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', textAlign: 'center', maxWidth: '480px', margin: '0 auto 56px', lineHeight: 1.8, fontFamily: "'DM Sans'", fontWeight: 300 }}>
            {fr ? 'Mon équipe te reviendra dans les 48h.' : "My team will get back to you within 48h."}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ContactForm fr={fr} />
          </div>
        </FadeIn>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#080808', padding: '48px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '22px', filter: 'brightness(0) invert(1)' }} />
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
          {fr ? 'Building Athletes Brands' : 'Building Athletes Brands'}
        </div>
        <div style={{ display: 'flex', gap: '20px', margin: '8px 0' }}>
          <a href="https://instagram.com/auchumedia" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.3s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke={BLUE} strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke={BLUE} strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill={BLUE}/></svg>
          </a>
          <a href="https://tiktok.com/@auchumedia" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.3s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100064750933718" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.3s ease', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div style={{ width: '100%', maxWidth: '320px', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '8px 0' }} />
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontFamily: "'DM Sans'" }}>
          © 2025 AuchuMedia Inc. {fr ? 'Tous droits réservés.' : 'All rights reserved.'}
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes fadeInLogo {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .splash-logo { animation: fadeInLogo 0.8s ease forwards; }
        .splash-explore { animation: fadeInLogo 0.8s ease 0.4s both; }
        .bounce { animation: bounce 1.4s ease-in-out infinite; }
        .hero-label { opacity: 0; animation: fadeInUp 0.8s ease 0.2s forwards; }
        .hero-title { opacity: 0; animation: fadeInUp 0.8s ease 0.2s forwards; }
        .hero-cta { opacity: 0; animation: fadeInUp 0.8s ease 0.8s forwards; }
        .hamburger-btn { display: flex !important; }

        html, body {
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }
        .pourquoi-card {
          position: -webkit-sticky;
          position: sticky;
        }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
        }
        @media (min-width: 901px) {
          .hamburger-btn { display: none !important; }
        }

        @media (max-width: 768px) {
          nav { padding: 0 20px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .founder-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .clients-grid { grid-template-columns: 1fr !important; }
          .nav-right button:not(.hamburger-btn) { padding: 9px 14px !important; font-size: 10px !important; }
          .hero-content { bottom: 40px !important; left: 24px !important; right: 24px !important; }
          .pourquoi-card { height: 420px !important; }
          .pourquoi-card-text { bottom: 28px !important; left: 24px !important; right: 24px !important; }
          .pourquoi-card-title { font-size: 30px !important; }
          .pourquoi-card-desc { font-size: 13px !important; }
        }

        @media (max-width: 480px) {
          .nav-right > div:first-child { display: none !important; }
        }
      `}</style>
    </div>
  );
}
