import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

function useCountUp(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return count;
}

function StatCount({ value, suffix, label, inView, delay }) {
  const count = useCountUp(value, inView, 2000);
  return (
    <div style={{ textAlign: 'center', padding: '0 32px', flex: '1 1 0', minWidth: '160px' }}>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '80px', color: BLUE, lineHeight: 1, letterSpacing: '0.01em' }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '12px', color: '#ffffff', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: '10px', fontWeight: 500 }}>
        {label}
      </div>
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
          {fr ? 'Notre équipe te contactera dans les 48h.' : 'Our team will contact you within 48h.'}
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
      <textarea required value={form.message} onChange={e => set('message', e.target.value)} placeholder={fr ? 'Parle-nous de ton projet...' : 'Tell us about your project...'} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }} />
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
  const [scrollY, setScrollY] = useState(0);
  const fr = lang === 'fr';

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => scrollTo(id), 100);
    }
  }, []);

  const [statsRef, statsInView] = useInView(0.3);

  const pourquoiCards = fr ? [
    { icon: '🎯', title: 'Partenariats mieux rémunérés', desc: "Les marques veulent s'associer à une image forte, des valeurs, une communauté engagée." },
    { icon: '🤝', title: 'Communauté fidèle', desc: "Une audience bien construite devient un véritable actif qui te suit au-delà de ta carrière." },
    { icon: '💰', title: 'Revenus diversifiés', desc: "Collaborations, placements de produits, contenu monétisé — le branding ouvre des portes hors-glace." },
    { icon: '📱', title: 'Contrôle de ton image', desc: "Plutôt qu'être défini par les médias, tu deviens maître de ton histoire." },
    { icon: '🏆', title: "Préparer l'après-carrière", desc: "Un branding fort te garde visible et pertinent même après avoir raccroché les patins." },
  ] : [
    { icon: '🎯', title: 'Better brand deals', desc: "Brands want to associate with a strong image, values and an engaged community." },
    { icon: '🤝', title: 'Loyal community', desc: "A well-built audience becomes a real asset that follows you beyond your career." },
    { icon: '💰', title: 'Diversified revenue', desc: "Collaborations, product placements, monetized content — branding opens doors off the ice." },
    { icon: '📱', title: 'Control your narrative', desc: "Rather than being defined by media, you become the author of your story." },
    { icon: '🏆', title: 'Post-career preparation', desc: "A strong brand keeps you visible and relevant even after you hang up the skates." },
  ];

  const services = fr ? [
    { icon: '🎬', title: 'Highlights & Clips', desc: "Des capsules dynamiques de tes meilleurs moments sur glace, optimisées pour capter l'attention et être partagées sur toutes les plateformes." },
    { icon: '🏷️', title: 'Personal Branding & Stratégie', desc: "Une identité de marque cohérente — positionnement, ton, esthétique — pour que ton image reflète vraiment qui tu es." },
    { icon: '🤝', title: 'Brand Partnerships', desc: "On identifie les marques qui te ressemblent et on structure des collaborations qui reflètent ta vraie valeur." },
    { icon: '🎥', title: 'Production YouTube & Mini-docs', desc: "Des formats longs pour approfondir ton histoire — entraînements, quotidien, coulisses — et bâtir une connexion durable avec ton audience." },
  ] : [
    { icon: '🎬', title: 'Highlights & Clips', desc: "Dynamic clips of your best on-ice moments, optimized to capture attention and get shared across every platform." },
    { icon: '🏷️', title: 'Personal Branding & Strategy', desc: "A consistent brand identity — positioning, tone, aesthetic — so your image truly reflects who you are." },
    { icon: '🤝', title: 'Brand Partnerships', desc: "We identify brands that match who you are and structure collaborations that reflect your real value." },
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
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Helmet>
        <title>{fr ? 'Athlètes | AuchuMedia — Building Athletes Brands' : 'Athletes | AuchuMedia — Building Athletes Brands'}</title>
        <meta name="description" content={fr ? "On aide les joueurs de hockey de haut niveau à bâtir leur marque personnelle sur et hors glace. Personal branding, production vidéo et partenariats." : "We help elite hockey players build their personal brand on and off the ice. Personal branding, video production and brand partnerships."} />
        <meta name="keywords" content="personal branding hockey, contenu vidéo athlète, agence marketing sportif Québec, storytelling athlète, commandite hockey, building athletes brands" />
        <link rel="canonical" href="https://auchumedia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auchumedia.com/" />
        <meta property="og:title" content={fr ? 'Athlètes | AuchuMedia — Building Athletes Brands' : 'Athletes | AuchuMedia — Building Athletes Brands'} />
        <meta property="og:description" content={fr ? "On aide les joueurs de hockey de haut niveau à bâtir leur marque personnelle sur et hors glace." : "We help elite hockey players build their personal brand on and off the ice."} />
        <meta property="og:image" content="https://auchumedia.com/Copie%20de%20AUCHU.png.png" />
      </Helmet>

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
        <Link to="/" style={{ flexShrink: 0, fontFamily: "'Bebas Neue'", fontSize: '22px', letterSpacing: '0.18em', color: '#ffffff' }}>
          AUCHUMEDIA
        </Link>

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
            {fr ? 'Travailler avec nous' : 'Work with us'}
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
            {fr ? 'Travailler avec nous' : 'Work with us'}
          </button>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <video
            autoPlay muted loop playsInline crossOrigin="anonymous"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '116%', objectFit: 'cover', transform: `translateY(${Math.min(scrollY * 0.15, 100)}px)` }}
          >
            <source src="https://res.cloudinary.com/dr0kwuqqa/video/upload/v1780793140/Video_hero_li3pom.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', textAlign: 'center', padding: '0 24px' }}>
          <div className="hero-label" style={{ fontSize: '12px', fontWeight: 700, color: BLUE, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '24px' }}>
            {fr ? 'BUILDING ATHLETES BRANDS' : 'BUILDING ATHLETES BRANDS'}
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(64px, 9vw, 130px)', lineHeight: 0.88, color: '#ffffff', marginBottom: '28px', letterSpacing: '0.01em' }}>
            {fr ? <>TON HISTOIRE.<br />NOTRE CAMÉRA.</> : <>YOUR STORY.<br />OUR CAMERA.</>}
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 40px', fontFamily: "'DM Sans'" }}>
            {fr ? "On aide les joueurs de hockey de haut niveau à bâtir leur marque personnelle sur et hors glace." : "We help elite hockey players build their personal brand on and off the ice."}
          </p>
          <div className="hero-cta">
            <button onClick={() => scrollTo('contact')} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: BLUE, padding: '16px 36px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans'", boxShadow: '0 0 30px rgba(0,61,165,0.35)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,61,165,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,61,165,0.35)'; }}
            >
              {fr ? 'Travailler avec nous →' : 'Work with us →'}
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, animation: 'bounce 2s ease-in-out infinite' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </section>

      {/* ===== MISSION / À PROPOS ===== */}
      <section id="a-propos" style={{ padding: '120px 60px', background: '#ffffff', scrollMarginTop: '72px' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeIn direction="left">
            <div>
              <div style={{ width: '48px', height: '3px', background: BLUE, marginBottom: '20px' }} />
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
                {fr ? 'Notre mission' : 'Our mission'}
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(40px, 5vw, 72px)', color: '#0a0a0a', lineHeight: 0.95, marginBottom: '28px', letterSpacing: '0.01em' }}>
                {fr ? <>LE HOCKEY<br />MÉRITE MIEUX.</> : <>HOCKEY<br />DESERVES MORE.</>}
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(10,10,10,0.6)', lineHeight: 1.9, fontFamily: "'DM Sans'", fontWeight: 300 }}>
                {fr
                  ? "Dans plusieurs sports professionnels, l'image personnelle est devenue aussi importante que la performance elle-même. Au hockey, cette réalité reste encore trop souvent ignorée — on continue de miser uniquement sur les statistiques, en oubliant que les marques et les partisans s'attachent d'abord à une histoire, une personnalité, une communauté. Les joueurs qui prennent le contrôle de leur récit — qui documentent leur parcours, partagent qui ils sont vraiment et bâtissent une audience fidèle — se positionnent différemment : plus visibles, plus attractifs pour les commanditaires, et mieux préparés pour l'après-carrière. On croit que chaque joueur mérite cette opportunité, peu importe son niveau."
                  : "In many professional sports, personal image has become just as important as performance itself. In hockey, that reality is still too often ignored — success is measured only in stats, forgetting that brands and fans connect first with a story, a personality, a community. Players who take control of their narrative — documenting their journey, sharing who they truly are, and building a loyal audience — position themselves differently: more visible, more attractive to sponsors, and better prepared for life after their playing career. We believe every player deserves that opportunity, no matter their level."}
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

      {/* ===== STATS ===== */}
      <section ref={statsRef} style={{ padding: '90px 60px', background: '#000000' }}>
        <div className="stats-row" style={{ display: 'flex', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <StatCount value={5} suffix="M+" label={fr ? 'Vues générées' : 'Views generated'} inView={statsInView} />
          <div className="stats-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.15)', margin: '4px 0' }} />
          <StatCount value={3} suffix="" label={fr ? 'Clients actifs' : 'Active clients'} inView={statsInView} />
          <div className="stats-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.15)', margin: '4px 0' }} />
          <StatCount value={100} suffix="K+" label={fr ? 'Engagements' : 'Engagements'} inView={statsInView} />
        </div>
      </section>

      {/* ===== POURQUOI ===== */}
      <section style={{ padding: '120px 60px', background: '#0a0a0a' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#ffffff', letterSpacing: '0.02em', marginBottom: '16px' }}>
              {fr ? 'POURQUOI AUCHUMEDIA ?' : 'WHY AUCHUMEDIA?'}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto', fontFamily: "'DM Sans'", fontWeight: 300 }}>
              {fr ? "On combine le storytelling et la stratégie de marque pour livrer des résultats tangibles." : "We combine storytelling and brand strategy to deliver tangible results."}
            </p>
          </div>
        </FadeIn>
        <div className="pourquoi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '1040px', margin: '0 auto' }}>
          {pourquoiCards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="pourquoi-card"
                style={{ background: '#111111', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '28px', height: '100%', transition: 'all 0.3s ease', gridColumn: i >= 3 ? 'span 1' : 'auto' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: '30px', marginBottom: '16px' }}>{card.icon}</div>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: "'DM Sans'" }}>{card.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{card.desc}</p>
              </div>
            </FadeIn>
          ))}
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
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
                {fr ? 'Fondateur' : 'Founder'}
              </span>
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
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: BLUE, fontStyle: 'italic', letterSpacing: '0.03em' }}>
                — {fr ? 'Raphaël Auchu, Fondateur' : 'Raphaël Auchu, Founder'}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" style={{ padding: '120px 60px', background: '#000000', scrollMarginTop: '72px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>
              {fr ? 'Nos services' : 'Our services'}
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#ffffff', letterSpacing: '0.02em' }}>
              {fr ? 'CE QU’ON FAIT.' : 'WHAT WE DO.'}
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

      {/* ===== CLIENTS ===== */}
      <section id="clients" style={{ padding: '120px 60px', background: '#ffffff', scrollMarginTop: '72px' }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#0a0a0a', letterSpacing: '0.02em', textAlign: 'center', marginBottom: '64px' }}>
            {fr ? 'ILS NOUS FONT CONFIANCE.' : 'THEY TRUST US.'}
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
                  <span style={{ position: 'absolute', fontFamily: "'Bebas Neue'", fontSize: '120px', color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}>0{i + 1}</span>
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
            {fr ? 'Notre équipe te reviendra dans les 48h.' : "Our team will get back to you within 48h."}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ContactForm fr={fr} />
          </div>
        </FadeIn>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#000000', borderTop: '0.5px solid rgba(255,255,255,0.08)', padding: '48px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', letterSpacing: '0.2em', color: '#ffffff' }}>AUCHUMEDIA</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
          {fr ? 'Building Athletes Brands' : 'Building Athletes Brands'}
        </div>
        <div style={{ display: 'flex', gap: '18px', margin: '8px 0' }}>
          <a href="https://instagram.com/auchumedia" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.65'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke={BLUE} strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke={BLUE} strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill={BLUE}/></svg>
          </a>
          <a href="https://tiktok.com/@auchumedia" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.65'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          © 2025 Agence AuchuMedia Inc.
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        .hero-label { opacity: 0; animation: fadeInUp 0.8s ease 0.2s forwards; }
        .hero-title { opacity: 0; animation: fadeInUp 0.8s ease 0.2s forwards; }
        .hero-subtitle { opacity: 0; animation: fadeInUp 0.8s ease 0.5s forwards; }
        .hero-cta { opacity: 0; animation: fadeInUp 0.8s ease 0.8s forwards; }
        .hamburger-btn { display: flex !important; }

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
          .pourquoi-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .clients-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 32px !important; }
          .stats-divider { display: none !important; }
          .nav-right button:not(.hamburger-btn) { padding: 9px 14px !important; font-size: 10px !important; }
        }

        @media (max-width: 480px) {
          .nav-right > div:first-child { display: none !important; }
        }
      `}</style>
    </div>
  );
}
