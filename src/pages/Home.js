import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import { projets } from '../data/projets';

const BLUE = '#003DA5';

function useInView(threshold = 0.15) {
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
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : t[direction], transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>;
}

const navLinks = [
  { id: 'pourquoi', labelFr: 'Pourquoi AuchuMedia', labelEn: 'Why AuchuMedia' },
  { id: 'etudes-de-cas-home', labelFr: 'Études de cas', labelEn: 'Case studies' },
  { id: 'temoignages', labelFr: 'Témoignages', labelEn: 'Testimonials' },
  { id: 'tarification', labelFr: 'Tarification', labelEn: 'Pricing' },
  { id: 'faq', labelFr: 'FAQ', labelEn: 'FAQ' },
];

function MultiStepForm({ fr, scrollTo, BLUE }) {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    prenom: '', nom: '', email: '', telephone: '',
    entreprise: '', site: '', ca: '',
    marketing: '', equipe: '', role: '',
    besoin: '', budget: '', quand: ''
  });
  const [submitted, setSubmitted] = React.useState(false);

  const total = 4;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: '100%', background: '#0a0a0a', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '12px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans'", marginBottom: '14px' };
  const selectStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer' };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' };

  const steps = fr ? [
    'Vos informations', 'Votre entreprise', 'Votre structure marketing', 'Votre besoin'
  ] : [
    'Your information', 'Your business', 'Your marketing structure', 'Your needs'
  ];

  if (submitted) return (
    <div style={{ background: '#111', border: `1px solid rgba(0,61,165,0.3)`, borderRadius: '16px', padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '28px', color: '#ffffff', marginBottom: '12px' }}>{fr ? 'DEMANDE REÇUE !' : 'REQUEST RECEIVED!'}</div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{fr ? 'Notre équipe vous contactera dans les 48h.' : 'Our team will contact you within 48h.'}</p>
    </div>
  );

  return (
    <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px 32px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: BLUE, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{steps[step - 1]}</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{step}/{total}</span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(step / total) * 100}%`, background: BLUE, borderRadius: '2px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {step === 1 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'VOS INFORMATIONS' : 'YOUR INFORMATION'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
            <div>
              <label style={labelStyle}>{fr ? 'Prénom *' : 'First name *'}</label>
              <input type="text" value={form.prenom} onChange={e => set('prenom', e.target.value)} placeholder="Jean" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{fr ? 'Nom *' : 'Last name *'}</label>
              <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)} placeholder="Dupont" style={inputStyle} />
            </div>
          </div>
          <label style={labelStyle}>Email *</label>
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jean@entreprise.com" style={inputStyle} />
          <label style={labelStyle}>{fr ? 'Téléphone *' : 'Phone *'}</label>
          <input type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)} placeholder="+1 (514) 000-0000" style={inputStyle} />
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'VOTRE ENTREPRISE' : 'YOUR BUSINESS'}</div>
          <label style={labelStyle}>{fr ? "Nom de l'entreprise *" : 'Company name *'}</label>
          <input type="text" value={form.entreprise} onChange={e => set('entreprise', e.target.value)} placeholder="Nom inc." style={inputStyle} />
          <label style={labelStyle}>{fr ? 'Site web' : 'Website'}</label>
          <input type="text" value={form.site} onChange={e => set('site', e.target.value)} placeholder="monentreprise.com" style={inputStyle} />
          <label style={labelStyle}>{fr ? "Chiffre d'affaires annuel *" : 'Annual revenue *'}</label>
          <select value={form.ca} onChange={e => set('ca', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Moins de 500K$/an', '500K$ – 1M$/an', '1M$ – 5M$/an', '5M$ et plus'] : ['Less than $500K/yr', '$500K – $1M/yr', '$1M – $5M/yr', '$5M and more']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'VOTRE STRUCTURE MARKETING' : 'YOUR MARKETING STRUCTURE'}</div>
          <label style={labelStyle}>{fr ? 'Qui gère vos réseaux sociaux actuellement ? *' : 'Who currently manages your social media? *'}</label>
          <select value={form.marketing} onChange={e => set('marketing', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ["Personne pour l'instant", 'Moi-même', 'Un employé interne', 'Une autre agence', 'Un freelance'] : ['Nobody for now', 'Myself', 'An internal employee', 'Another agency', 'A freelancer']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Êtes-vous le décideur final ? *' : 'Are you the final decision maker? *'}</label>
          <select value={form.role} onChange={e => set('role', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ["Oui, c'est moi", 'Je consulte un associé', 'Je dois faire approuver'] : ["Yes, that's me", 'I consult a partner', 'I need approval']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Taille de votre équipe marketing *' : 'Marketing team size *'}</label>
          <select value={form.equipe} onChange={e => set('equipe', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Aucune équipe', '1 personne', '2-3 personnes', '4+ personnes'] : ['No team', '1 person', '2-3 people', '4+ people']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {step === 4 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'VOTRE BESOIN' : 'YOUR NEEDS'}</div>
          <label style={labelStyle}>{fr ? 'Pourquoi envisagez-vous de travailler avec AuchuMedia ? *' : 'Why are you considering working with AuchuMedia? *'}</label>
          <textarea value={form.besoin} onChange={e => set('besoin', e.target.value)} placeholder={fr ? 'Partagez le plus de contexte possible...' : 'Share as much context as possible...'} style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} />
          <label style={labelStyle}>{fr ? 'Budget mensuel prévu *' : 'Monthly budget *'}</label>
          <select value={form.budget} onChange={e => set('budget', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {['0$ – 5 000$/mois', '5 000$ – 10 000$/mois', '10 000$+/mois'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Quand souhaitez-vous commencer ? *' : 'When do you want to start? *'}</label>
          <select value={form.quand} onChange={e => set('quand', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Immédiatement', 'Dans 1 à 3 mois', 'Dans 3 à 6 mois', 'Je explore seulement'] : ['Immediately', 'In 1 to 3 months', 'In 3 to 6 months', 'Just exploring']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', gap: '12px' }}>
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)} style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.25)', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans'", letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            ← {fr ? 'Précédent' : 'Previous'}
          </button>
        ) : <div />}
        {step < total ? (
          <button onClick={() => setStep(s => s + 1)} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, border: 'none', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans'", letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {fr ? 'Suivant' : 'Next'} →
          </button>
        ) : (
          <button onClick={async () => {
            try {
              const res = await fetch('https://formspree.io/f/xjgdjoer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                  prenom: form.prenom, nom: form.nom, email: form.email, telephone: form.telephone,
                  entreprise: form.entreprise, site: form.site, ca: form.ca,
                  marketing: form.marketing, role: form.role, equipe: form.equipe,
                  besoin: form.besoin, budget: form.budget, quand: form.quand,
                  _subject: `Nouvelle demande — ${form.prenom} ${form.nom} (${form.entreprise})`
                })
              });
              if (res.ok) setSubmitted(true);
            } catch (e) { setSubmitted(true); }
          }} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, border: 'none', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans'", letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {fr ? 'Soumettre' : 'Submit'} →
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredProjet, setHoveredProjet] = useState(null);
  const fr = lang === 'fr';

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      const scrollY = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) { setActiveSection(sections[i].id); break; }
      }
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

  const faqs = fr ? [
    {
      q: "À quel type d'entreprise notre service de médias sociaux s'adresse-t-il ?",
      a: "On se spécialise avec des entreprises B2C high ticket dont le service coûte 2 000$ et plus — climatisation & chauffage, portes & fenêtres, aménagement paysager, rénovation, toiture, piscines, cuisine & salle de bain, et tout autre service résidentiel premium."
    },
    {
      q: "Qu'est-ce qu'un contenu centré sur l'audience ?",
      a: <span>Un contenu centré sur l'audience, c'est un contenu créé en fonction de ce que l'audience a réellement envie de regarder, et non de ce que la marque souhaite simplement dire.<br/><br/>L'objectif est de capter l'attention bien avant que votre audience soit prête à acheter, afin que le moment venu, votre marque leur soit déjà familière, crédible et bien ancrée dans leur esprit.</span>
    },
    {
      q: "Quel type d'équipement est utilisé pour filmer mon contenu ?",
      a: "On utilise la Sony A7 IV comme caméra principale — c'est ce qui donne ce look cinématique qu'on aime. On adapte les lentilles, l'éclairage et le son selon chaque tournage. En gros, t'as pas à t'inquiéter de ça — on arrive avec tout ce qu'il faut."
    },
    {
      q: "Quels indicateurs utilisez-vous pour mesurer le succès ?",
      a: <span>On suit les indicateurs qui permettent de savoir si le contenu capte réellement l'attention et génère les bons signaux auprès de l'audience.<br/><br/>Cela inclut les vues, le temps de visionnement, la rétention, les mentions J'aime, les commentaires, les partages, les enregistrements, le gain d'abonnés, les visites de profil et le taux d'engagement.<br/><br/>Ces données nous aident à comprendre ce qui résonne, ce qui fonctionne moins bien et si le contenu génère les signaux que les plateformes récompensent par davantage de portée.</span>
    },
  ] : [
    {
      q: "What type of business does your social media service cater to?",
      a: "We specialize with B2C high ticket businesses whose service costs $2,000 and up — heating & cooling, doors & windows, landscaping, renovation, roofing, pools, kitchen & bathroom, and any other premium residential service."
    },
    {
      q: "What is audience-centric content?",
      a: <span>Audience-centric content is content created based on what the audience actually wants to watch, not just what the brand wants to say.<br/><br/>The goal is to capture attention long before your audience is ready to buy, so that when the moment comes, your brand is already familiar, credible and top of mind.</span>
    },
    {
      q: "What type of equipment is used to film my content?",
      a: "We shoot with the Sony A7 IV as our main camera — that's what gives us that cinematic look we love. We adapt the lenses, lighting and audio to each shoot. Bottom line: you don't have to worry about any of that — we show up with everything we need."
    },
    {
      q: "What metrics do you use to measure success?",
      a: <span>We track the indicators that tell us whether content is actually capturing attention and generating the right signals.<br/><br/>This includes views, watch time, retention, likes, comments, shares, saves, follower growth, profile visits and engagement rate.<br/><br/>These help us understand what resonates, what underperforms, and whether content is generating the signals platforms reward with more reach.</span>
    },
  ];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Helmet>
        <title>{fr ? 'Pour Entreprises | AuchuMedia — Agence Contenu Vidéo Montréal' : 'For Businesses | AuchuMedia — Montreal Video Content Agency'}</title>
        <meta name="description" content={fr ? "Devenez la référence dans votre domaine grâce à une stratégie de contenu vidéo sur mesure. AuchuMedia vous accompagne de la stratégie à la publication." : "Become the reference in your field with a custom video content strategy. AuchuMedia supports you from strategy to publishing."} />
        <meta name="keywords" content="agence contenu vidéo Montréal, création contenu réseaux sociaux, stratégie de marque, storytelling, agence marketing vidéo Québec, personal branding athlète" />
        <link rel="canonical" href="https://auchumedia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auchumedia.com/" />
        <meta property="og:title" content={fr ? 'Pour Entreprises | AuchuMedia — Agence Contenu Vidéo Montréal' : 'For Businesses | AuchuMedia — Montreal Video Content Agency'} />
        <meta property="og:description" content={fr ? "Devenez la référence dans votre domaine grâce à une stratégie de contenu vidéo sur mesure. AuchuMedia vous accompagne de la stratégie à la publication." : "Become the reference in your field with a custom video content strategy. AuchuMedia supports you from strategy to publishing."} />
        <meta property="og:image" content="https://auchumedia.com/Copie%20de%20AUCHU.png.png" />
      </Helmet>

      {/* ===== MAIN NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        transition: 'all 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '64px', gap: '16px'
      }}>
        <Link to="/" style={{ flexShrink: 0 }}><img src="/Copie de AUCHU.png.png" alt="AuchuMedia — agence de contenu vidéo Montréal" style={{ height: '22px', width: 'auto', filter: 'invert(1)' }} /></Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', flex: 1, justifyContent: 'center' }} className="nav-links">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{
              fontSize: '11px', fontWeight: 600,
              color: activeSection === link.id ? '#0a0a0a' : 'rgba(10,10,10,0.5)',
              background: 'transparent', border: 'none',
              borderBottom: activeSection === link.id ? `2px solid ${BLUE}` : '2px solid transparent',
              padding: '22px 14px', cursor: 'pointer',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              fontFamily: "'DM Sans'", whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}>
              {fr ? link.labelFr : link.labelEn}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, position: 'absolute', right: '60px' }}>
          <div style={{ display: 'flex', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            {['fr','en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ fontSize: '9px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', border: 'none', background: lang === l ? 'rgba(0,0,0,0.08)' : 'transparent', color: lang === l ? '#0a0a0a' : 'rgba(10,10,10,0.35)', fontFamily: "'DM Sans'" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger-btn" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexShrink: 0 }}>
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.25s' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#0a0a0a', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0, zIndex: 490, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', padding: '24px 24px', gap: '4px', overflowY: 'auto' }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => { scrollTo(link.id); setMobileOpen(false); }} style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(10,10,10,0.65)', background: 'transparent', border: 'none', borderBottom: '0.5px solid rgba(0,0,0,0.07)', padding: '16px 0', cursor: 'pointer', textAlign: 'left', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'DM Sans'", width: '100%' }}>
              {fr ? link.labelFr : link.labelEn}
            </button>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexDirection: 'column' }}>
            <Link to="/athletes" style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0a', background: 'transparent', padding: '12px 20px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.22)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'center' }}>
              {fr ? 'Pour athlètes' : 'For athletes'}
            </Link>
            <button onClick={() => { scrollTo('contact'); setMobileOpen(false); }} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: BLUE, padding: '13px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
              {fr ? 'Planifier un appel' : 'Book a call'}
            </button>
            <a href="https://app.auchumedia.com" onClick={() => setMobileOpen(false)} style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.65)', padding: '12px 0', textAlign: 'center' }}>
              {fr ? 'Connexion' : 'Login'}
            </a>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 60px 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <video autoPlay muted loop playsInline crossOrigin="anonymous" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="https://res.cloudinary.com/dr0kwuqqa/video/upload/v1780793836/Expedia_ip7xmb.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(0,61,165,0.1) 0%, transparent 65%)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 7.5vw, 100px)', lineHeight: 0.93, color: '#fff', marginBottom: '28px', letterSpacing: '0.01em' }}>
            {fr ? <>DEVENEZ LA RÉFÉRENCE<br />DANS VOTRE DOMAINE</> : <>BECOME THE REFERENCE<br />IN YOUR INDUSTRY</>}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto 40px', fontWeight: 300, textAlign: 'center' }}>
            {fr ? "On aide les entreprises de services B2C à devenir la référence dans leur marché grâce au storytelling vidéo qui capte l'attention, bâtit l'autorité et génère de la croissance." : "We help B2C service businesses become the reference in their market through video storytelling that captures attention, builds authority and drives growth."}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/athletes" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '14px 32px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'", textDecoration: 'none', display: 'inline-block' }}>
              {fr ? 'Pour athlètes →' : 'For athletes →'}
            </Link>
            <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,61,165,0.3)', fontFamily: "'DM Sans'" }}>
              {fr ? 'Planifier un appel →' : 'Book a call →'}
            </button>
          </div>
        </div>
      </section>

      {/* ===== POURQUOI ===== */}
      <section id="pourquoi" style={{ padding: '80px 60px', background: '#ffffff', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Pourquoi AuchuMedia' : 'Why AuchuMedia'}</span>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#0a0a0a', letterSpacing: '0.02em' }}>
              {fr ? <>UN SERVICE <span style={{ color: BLUE }}>CLÉ EN MAIN.</span></> : <>A <span style={{ color: BLUE }}>TURNKEY SERVICE.</span></>}
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {(fr ? [
            { icon: '🏗️', title: 'Stratégie de contenu', desc: "Nous définissons votre stratégie de contenu centrée sur le storytelling et l'audience, en créant un univers narratif unique pour vous démarquer dans votre domaine." },
            { icon: '🎬', title: 'Création de contenu', desc: "Nous prenons en charge l'idéation, la préproduction, la production et la postproduction." },
            { icon: '📱', title: 'Publication de contenu', desc: "Nous gérons votre calendrier de contenu et publions sur l'ensemble des plateformes." },
            { icon: '📈', title: 'Rapports', desc: "Nous livrons un rapport mensuel avec des constats, puis nous appliquons tout ce que nous avons appris à la prochaine série de contenus." },
            { icon: '🏆', title: 'Devenir la référence', desc: "Nous vous accompagnons jusqu'à ce que vous soyez reconnu comme LA référence dans votre domaine." },
          ] : [
            { icon: '🏗️', title: 'Content strategy', desc: "We define your content strategy centered on storytelling and audience, creating a unique narrative universe to set you apart in your field based on your business objectives." },
            { icon: '🎬', title: 'Content creation', desc: "We handle ideation, pre-production, production and post-production." },
            { icon: '📱', title: 'Content publishing', desc: "We manage your content calendar and publish across all platforms." },
            { icon: '📈', title: 'Reports', desc: "We deliver a monthly report with insights, then apply everything learned to the next content series." },
            { icon: '🏆', title: 'Become the reference', desc: "We support you until you're recognized as THE reference in your field." },
          ]).map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ background: '#f5f5f5', border: '0.5px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '28px 24px', transition: 'border-color 0.2s', height: '100%', width: '320px', maxWidth: '100%' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,61,165,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.title}</h3>
                <div style={{ fontSize: '13px', color: 'rgba(10,10,10,0.55)', lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== ÉTUDES DE CAS ===== */}
      <section id="etudes-de-cas-home" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', width: '100%', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Études de cas' : 'Case studies'}</span>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#ffffff', letterSpacing: '0.02em', textAlign: 'center' }}>
              {fr ? <>DES RÉSULTATS <span style={{ color: BLUE }}>CONCRETS.</span></> : <>REAL <span style={{ color: BLUE }}>RESULTS.</span></>}
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '990px', margin: '0 auto', width: '100%' }}>
          {projets.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.06}>
              <div
                onMouseEnter={() => setHoveredProjet(p.slug)}
                onMouseLeave={() => setHoveredProjet(null)}
                style={{
                  position: 'relative', display: 'block', overflow: 'hidden', borderRadius: '14px',
                  border: '0.5px solid rgba(255,255,255,0.08)', height: '260px', textDecoration: 'none',
                  background: p.image ? '#0a0a0a' : 'linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)',
                }}
              >
                {p.image && (
                  <img src={p.image} alt={fr ? `${p.client} — étude de cas contenu vidéo ${p.domaine.fr} par AuchuMedia` : `${p.client} — ${p.domaine.en} video content case study by AuchuMedia`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                {p.image && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,61,165,0.28)', opacity: hoveredProjet === p.slug ? 1 : 0, transition: 'opacity 0.3s ease' }} />

                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '24px' }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '26px', color: '#fff', marginBottom: '8px', lineHeight: 1 }}>
                    {p.client}
                  </div>
                  <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'rgba(0,61,165,0.35)', border: '0.5px solid rgba(255,255,255,0.3)', padding: '4px 10px', borderRadius: '20px', marginBottom: '12px' }}>
                    {p.domaine[lang]}
                  </span>
                  <div className="etudes-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 16px' }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '16px', color: '#fff', lineHeight: 1 }}>{p.stats.vues}</div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{fr ? 'Vues' : 'Views'}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '16px', color: '#fff', lineHeight: 1 }}>{p.stats.engagements}</div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{fr ? 'Engagements' : 'Engagements'}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '16px', color: '#fff', lineHeight: 1 }}>{p.stats.videos}</div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{fr ? 'Vidéos' : 'Videos'}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '16px', color: '#fff', lineHeight: 1 }}>{p.stats.abonnes}</div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{fr ? 'Abonnés' : 'Followers'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== TÉMOIGNAGES ===== */}
      <section id="temoignages" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Témoignages' : 'Testimonials'}</span>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#ffffff', marginBottom: '12px', letterSpacing: '0.02em' }}>
              {fr ? <>CE QU'ILS DISENT <span style={{ color: BLUE }}>DE NOUS.</span></> : <>WHAT THEY <span style={{ color: BLUE }}>SAY ABOUT US.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
              {fr ? "Des résultats concrets, des clients satisfaits." : "Real results, satisfied clients."}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ border: '0.5px dashed rgba(255,255,255,0.2)', borderRadius: '16px', padding: '64px 48px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>💬</div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300 }}>
              {fr ? "Les témoignages arrivent bientôt." : "Testimonials coming soon."}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ===== TARIFICATION ===== */}
      <section id="tarification" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Tarification' : 'Pricing'}</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#ffffff', marginBottom: '12px', letterSpacing: '0.02em' }}>
            {fr ? <>UNE OFFRE <span style={{ color: BLUE }}>TRANSPARENTE.</span></> : <>TRANSPARENT <span style={{ color: BLUE }}>PRICING.</span></>}
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '48px', maxWidth: '560px', fontWeight: 300 }}>
            {fr ? "Pas de forfaits compliqués. Deux offres tout inclus, pour propulser ta croissance." : "No complicated tiers. Two all-inclusive offers to drive your growth."}
          </p>
        </FadeIn>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', maxWidth: '860px', margin: '0 auto' }}>

          {(fr ? [
            { title: 'Forfait Essentiel (4 vidéos/mois)', price: '2 000$', description: "Une présence cohérente et accessible. 1 vidéo par semaine pour bâtir ton audience et ta crédibilité en ligne.", videos: '1 vidéo / semaine sur toutes les plateformes' },
            { title: 'Forfait Croissance (8 vidéos/mois)', price: '3 500$', description: "Une croissance constante. 2 vidéos par semaine pour multiplier ta présence et accélérer ton audience en ligne.", videos: '2 vidéos / semaine sur toutes les plateformes' },
          ] : [
            { title: 'Essential Plan (4 videos/month)', price: '$2,000', description: "A consistent, accessible presence. 1 video per week to build your audience and credibility online.", videos: '1 video / week across all platforms' },
            { title: 'Growth Plan (8 videos/month)', price: '$3,500', description: "Steady momentum. 2 videos per week to multiply your reach and accelerate your audience online.", videos: '2 videos / week across all platforms' },
          ]).map((plan, i) => (
            <FadeIn key={i} delay={0.05 + i * 0.05}>
              <div style={{ background: '#111', border: `2px solid ${BLUE}`, borderRadius: '16px', padding: '36px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '380px', maxWidth: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(0,61,165,0.12)', filter: 'blur(30px)' }} />
                <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.3)', borderRadius: '20px', padding: '4px 10px', marginBottom: '16px', width: 'fit-content' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Mandat mensuel' : 'Monthly retainer'}</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', color: '#ffffff', letterSpacing: '0.02em', marginBottom: '8px' }}>
                  {plan.title}
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '40px', color: '#ffffff', lineHeight: 1, marginBottom: '4px' }}>
                  {plan.price}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{fr ? '/ mois' : '/ month'}</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '24px', fontWeight: 300 }}>
                  {plan.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px', flex: 1 }}>
                  {(fr ? [
                    'Stratégie, idéation et direction créative',
                    'Préproduction, tournage et montage',
                    plan.videos,
                    'Gestion de communauté incluse',
                    'Rapports mensuels & optimisation continue',
                  ] : [
                    'Strategy, ideation and creative direction',
                    'Pre-production, filming and editing',
                    plan.videos,
                    'Community management included',
                    'Monthly reports & continuous optimization',
                  ]).map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: BLUE, flexShrink: 0, marginTop: '5px' }} />
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo('contact')} style={{ width: '100%', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans'", boxShadow: '0 0 20px rgba(0,61,165,0.25)' }}>
                  {fr ? 'Planifier un appel →' : 'Book a call →'}
                </button>
              </div>
            </FadeIn>
          ))}

        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" style={{ padding: '100px 60px', background: '#ffffff', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>FAQ</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#0a0a0a', marginBottom: '48px', letterSpacing: '0.02em', textAlign: 'center' }}>
            {fr ? <>QUESTIONS <span style={{ color: BLUE }}>FRÉQUENTES.</span></> : <>FREQUENTLY ASKED <span style={{ color: BLUE }}>QUESTIONS.</span></>}
          </h2>
        </FadeIn>
        <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '4px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ background: openFaq === i ? '#f5f5f5' : '#ffffff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', overflow: 'hidden', transition: 'background 0.2s', marginBottom: '4px' }}>
                <h3 style={{ margin: 0 }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: "'DM Sans'" }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>{faq.q}</span>
                    <div style={{ width: '24px', height: '32px', borderRadius: '50%', border: '0.5px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '16px', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', background: openFaq === i ? BLUE : 'transparent' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="1" x2="5" y2="9" stroke={openFaq === i ? 'white' : '#0a0a0a'} strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="5" x2="9" y2="5" stroke={openFaq === i ? 'white' : '#0a0a0a'} strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                  </button>
                </h3>
                <div style={{ maxHeight: openFaq === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                  <div style={{ padding: '0 24px 20px', fontSize: '13px', color: 'rgba(10,10,10,0.6)', lineHeight: 1.75, fontWeight: 300 }}>{faq.a}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <FadeIn direction="left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Planifier un appel' : 'Book a call'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 60px)', color: '#ffffff', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 0.95 }}>
              {fr ? <>PARLONS DE<br />VOTRE <span style={{ color: BLUE }}>CROISSANCE.</span></> : <>LET'S TALK<br />ABOUT YOUR <span style={{ color: BLUE }}>GROWTH.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300 }}>
              {fr ? "Notre équipe vous reviendra dans les 48h." : "Our team will get back to you within 48h."}
            </p>
          </FadeIn>
          <FadeIn direction="right">
            <MultiStepForm fr={fr} scrollTo={scrollTo} BLUE={BLUE} />
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style>{`
        .hamburger-btn { display: flex !important; }
        @media (max-width: 768px) {
          nav div[style*="padding: 0 60px"] { padding: 0 20px !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:last-child > *:not(.hamburger-btn) { display: none !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          div.etudes-stats-grid { display: flex !important; flex-direction: row !important; grid-template-columns: none !important; justify-content: space-between !important; gap: 8px !important; }
        }
      `}</style>
    </div>
  );
}
