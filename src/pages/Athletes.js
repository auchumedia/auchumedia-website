import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  { id: 'etudes-de-cas-athletes', labelFr: 'Études de cas', labelEn: 'Case studies' },
  { id: 'deroulement', labelFr: 'Déroulement', labelEn: 'Process' },
  { id: 'faq', labelFr: 'FAQ', labelEn: 'FAQ' },
];

function MultiStepForm({ fr, scrollTo, BLUE }) {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    prenom: '', nom: '', email: '', telephone: '',
    sport: '', niveau: '', equipeOrg: '',
    reseaux: '', instagram: '', abonnes: '',
    besoin: '', quand: ''
  });
  const [submitted, setSubmitted] = React.useState(false);

  const total = 4;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: '100%', background: '#0a0a0a', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '12px 16px', color: '#ffffff', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans'", marginBottom: '14px' };
  const selectStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer' };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' };

  const steps = fr ? [
    'Vos informations', 'Ton profil sportif', 'Ta présence actuelle', 'Ton projet'
  ] : [
    'Your information', 'Your sports profile', 'Your current presence', 'Your project'
  ];

  if (submitted) return (
    <div style={{ background: '#111', border: `1px solid rgba(0,61,165,0.3)`, borderRadius: '16px', padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '28px', color: '#ffffff', marginBottom: '12px' }}>{fr ? 'DEMANDE REÇUE !' : 'REQUEST RECEIVED!'}</div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{fr ? 'Notre équipe te contactera dans les 48h.' : 'Our team will contact you within 48h.'}</p>
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
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jean@courriel.com" style={inputStyle} />
          <label style={labelStyle}>{fr ? 'Téléphone *' : 'Phone *'}</label>
          <input type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)} placeholder="+1 (514) 000-0000" style={inputStyle} />
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'TON PROFIL SPORTIF' : 'YOUR SPORTS PROFILE'}</div>
          <label style={labelStyle}>{fr ? 'Ton sport *' : 'Your sport *'}</label>
          <select value={form.sport} onChange={e => set('sport', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {['Hockey', 'Football', 'Basketball', 'Baseball', 'Tennis', fr ? 'Autre' : 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Niveau de compétition *' : 'Competition level *'}</label>
          <select value={form.niveau} onChange={e => set('niveau', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Junior / Collégial', 'Universitaire', 'Professionnel / Semi-pro', 'Autre'] : ['Junior / College', 'University', 'Professional / Semi-pro', 'Other']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Équipe / organisation actuelle' : 'Current team / organization'}</label>
          <input type="text" value={form.equipeOrg} onChange={e => set('equipeOrg', e.target.value)} placeholder={fr ? 'Optionnel' : 'Optional'} style={inputStyle} />
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'TA PRÉSENCE ACTUELLE' : 'YOUR CURRENT PRESENCE'}</div>
          <label style={labelStyle}>{fr ? 'Qui gère tes réseaux sociaux actuellement ? *' : 'Who currently manages your social media? *'}</label>
          <select value={form.reseaux} onChange={e => set('reseaux', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ["Personne pour l'instant", 'Moi-même', 'Un proche / membre de la famille', 'Une agence', 'Un freelance'] : ['Nobody for now', 'Myself', 'A family member', 'An agency', 'A freelancer']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Compte Instagram principal' : 'Main Instagram account'}</label>
          <input type="text" value={form.instagram} onChange={e => set('instagram', e.target.value)} placeholder="@toncompte" style={inputStyle} />
          <label style={labelStyle}>{fr ? "Nombre d'abonnés approximatif *" : 'Approximate follower count *'}</label>
          <select value={form.abonnes} onChange={e => set('abonnes', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Moins de 1 000', '1 000 – 10 000', '10 000 – 50 000', '50 000+'] : ['Less than 1,000', '1,000 – 10,000', '10,000 – 50,000', '50,000+']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {step === 4 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'TON PROJET' : 'YOUR PROJECT'}</div>
          <label style={labelStyle}>{fr ? 'Pourquoi envisages-tu de travailler avec AuchuMedia ? *' : 'Why are you considering working with AuchuMedia? *'}</label>
          <textarea value={form.besoin} onChange={e => set('besoin', e.target.value)} placeholder={fr ? 'Partage le plus de contexte possible...' : 'Share as much context as possible...'} style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} />
          <label style={labelStyle}>{fr ? 'Quand souhaites-tu commencer ? *' : 'When do you want to start? *'}</label>
          <select value={form.quand} onChange={e => set('quand', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Immédiatement', 'Dans 1 à 3 mois', 'Dans 3 à 6 mois', "J'explore seulement"] : ['Immediately', 'In 1 to 3 months', 'In 3 to 6 months', 'Just exploring']).map(o => <option key={o} value={o}>{o}</option>)}
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
                  sport: form.sport, niveau: form.niveau, equipeOrg: form.equipeOrg,
                  reseaux: form.reseaux, instagram: form.instagram, abonnes: form.abonnes,
                  besoin: form.besoin, quand: form.quand,
                  _subject: `Nouvelle demande athlète — ${form.prenom} ${form.nom} (${form.sport})`
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

export default function Athletes() {
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

  const athleteProjets = projets.filter(p => p.slug === 'bataillon' || p.slug === 'sylvestre');

  const faqs = fr ? [
    {
      q: "Est-ce que je dois déjà avoir une grosse audience pour commencer ?",
      a: "Non. On travaille avec des athlètes à toutes les étapes de leur carrière. L'important, c'est de commencer tôt — bâtir une audience prend du temps, et plus tu commences tôt, plus tu es positionné pour attirer des commandites au bon moment."
    },
    {
      q: "Quel type de contenu allez-vous créer pour moi ?",
      a: "On adapte le contenu à ta personnalité et à ton sport — coulisses d'entraînement, moments de match, quotidien, storytelling personnel. L'objectif est de montrer qui tu es vraiment, pas juste ta performance sur la glace ou le terrain."
    },
    {
      q: "Comment fonctionne la recherche de commandites ?",
      a: "Une fois ton personal branding solide, on prépare ton kit média et on identifie les marques qui correspondent à ton identité. On t'aide ensuite à structurer et négocier des deals qui reflètent ta vraie valeur."
    },
    {
      q: "Est-ce que ça fonctionne pour l'après-carrière aussi ?",
      a: "Absolument. On commence à préparer la transition post-carrière bien avant la fin de ta carrière sportive — réseau, image, positionnement entrepreneurial — pour que tu restes pertinent et visible longtemps après avoir raccroché."
    },
    {
      q: "Quel équipement utilisez-vous pour filmer mon contenu ?",
      a: "On utilise la Sony A7 IV comme caméra principale — c'est ce qui donne ce look cinématique qu'on aime. On adapte les lentilles, l'éclairage et le son selon chaque tournage. Tu n'as pas à t'inquiéter de ça, on arrive avec tout ce qu'il faut."
    },
  ] : [
    {
      q: "Do I need a big audience to get started?",
      a: "No. We work with athletes at every stage of their career. What matters is starting early — building an audience takes time, and the sooner you start, the better positioned you are to attract sponsorships at the right moment."
    },
    {
      q: "What kind of content will you create for me?",
      a: "We tailor content to your personality and your sport — training behind-the-scenes, game moments, day-to-day life, personal storytelling. The goal is to show who you really are, not just your performance on the ice or the field."
    },
    {
      q: "How does sponsorship sourcing work?",
      a: "Once your personal brand is solid, we prepare your media kit and identify brands that match your identity. We then help you structure and negotiate deals that reflect your true value."
    },
    {
      q: "Does this work for post-career too?",
      a: "Absolutely. We start preparing the post-career transition well before the end of your sports career — network, image, entrepreneurial positioning — so you stay relevant and visible long after you hang up your gear."
    },
    {
      q: "What equipment do you use to film my content?",
      a: "We shoot with the Sony A7 IV as our main camera — that's what gives us that cinematic look we love. We adapt the lenses, lighting and audio to each shoot. You don't have to worry about any of that — we show up with everything we need."
    },
  ];

  const steps = fr ? [
    {
      num: '01', days: 'Jour 1–30', title: 'STRATÉGIE & ONBOARDING',
      desc: "On plonge dans votre business. Audit complet, définition de votre audience cible, et construction de votre stratégie de contenu sur mesure.",
      points: ["Audit de votre présence actuelle", "Définition de l'identité de marque", "Calendrier éditorial du premier mois", "Configuration des outils & accès"]
    },
    {
      num: '02', days: 'Jour 30–60', title: 'DÉBUT DE LA PRODUCTION',
      desc: "La production de contenu est en cours et les premières publications commencent à être diffusées sur vos différentes plateformes.",
      points: ["Analyse des premières performances", "Ajustement du format et du ton", "Début de la croissance organique"]
    },
    {
      num: '03', days: 'Jour 60–90', title: 'CROISSANCE ACCÉLÉRÉE',
      desc: "Avec une cadence de publication bien en place, on lance les premières campagnes Meta Ads et on intègre votre CRM pour automatiser le suivi des leads et transformer l'audience en clients.",
      points: ["Lancement des campagnes Meta Ads", "Intégration CRM & pipeline de leads", "Croissance audience significative", "Premiers leads qualifiés"]
    },
  ] : [
    {
      num: '01', days: 'Day 1–30', title: 'STRATEGY & ONBOARDING',
      desc: "We dive deep into your business. Complete audit, target audience definition, and custom content strategy building.",
      points: ["Audit of your current presence", "Brand identity definition", "First month editorial calendar", "Tools & access configuration"]
    },
    {
      num: '02', days: 'Day 30–60', title: 'PRODUCTION BEGINS',
      desc: "Content production is underway and the first publications begin to be distributed on your various platforms.",
      points: ["First performance analysis", "Format and tone adjustment", "Start of organic growth"]
    },
    {
      num: '03', days: 'Day 60–90', title: 'ACCELERATED GROWTH',
      desc: "With a solid publishing cadence in place, we launch the first Meta Ads campaigns and integrate your CRM to automate lead follow-up and turn audience into paying clients.",
      points: ["Meta Ads campaign launch", "CRM & lead pipeline integration", "Significant audience growth", "First qualified leads"]
    },
  ];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>

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
        <Link to="/" style={{ flexShrink: 0 }}><img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '22px', width: 'auto', filter: 'invert(1)' }} /></Link>

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
          <Link to="/" style={{ fontSize: '10px', fontWeight: 700, color: '#0a0a0a', background: 'transparent', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.22)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {fr ? 'Pour entreprises' : 'For businesses'}
          </Link>
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
            <Link to="/" style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0a', background: 'transparent', padding: '12px 20px', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.22)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'center' }}>
              {fr ? 'Pour entreprises' : 'For businesses'}
            </Link>
            <button onClick={() => { scrollTo('contact'); setMobileOpen(false); }} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: BLUE, padding: '13px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
              {fr ? 'Prendre RDV' : 'Book a call'}
            </button>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 60px 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <video autoPlay muted loop playsInline crossOrigin="anonymous" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="https://res.cloudinary.com/dr0kwuqqa/video/upload/v1780793140/Video_hero_li3pom.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(0,61,165,0.1) 0%, transparent 65%)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 7.5vw, 100px)', lineHeight: 0.93, color: '#fff', marginBottom: '28px', letterSpacing: '0.01em' }}>
            {fr ? <>RAYONNE AU-DELÀ<br /><span style={{ color: BLUE }}>DE TON SPORT</span></> : <>RISE ABOVE<br /><span style={{ color: BLUE }}>YOUR SPORT</span></>}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto 40px', fontWeight: 300, textAlign: 'center' }}>
            {fr ? "On aide les athlètes de haut niveau à bâtir leur personal branding grâce au storytelling vidéo qui capte l'attention et attire les commanditaires." : "We help elite athletes build their personal brand through video storytelling that captures attention and attracts sponsors."}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,61,165,0.3)', fontFamily: "'DM Sans'" }}>
              {fr ? 'Prendre RDV →' : 'Book a call →'}
            </button>
            <button onClick={() => scrollTo('etudes-de-cas-athletes')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,0.5)', padding: '14px 32px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
              {fr ? 'Voir les résultats' : 'See the results'}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 320px)', gap: '12px', justifyContent: 'center' }}>
          {(fr ? [
            { icon: '👤', title: 'Personal branding', desc: "On construit ton identité numérique de A à Z pour qu'elle reflète qui tu es vraiment — sur la glace, le terrain ou en dehors." },
            { icon: '🎬', title: 'Production vidéo', desc: "Direction créative, tournage cinématographique et montage professionnel pour du contenu qui capte l'attention." },
            { icon: '📱', title: 'Gestion des réseaux', desc: "On gère ton calendrier de publication et on assure une présence cohérente sur toutes tes plateformes." },
            { icon: '🤝', title: 'Développement de partnerships', desc: "On identifie les marques qui correspondent à ton identité et on structure des deals qui reflètent ta vraie valeur." },
            { icon: '📝', title: 'Stratégie éditoriale', desc: "On raconte ton histoire épisode par épisode, de façon authentique et stratégique, pour bâtir ta crédibilité." },
            { icon: '📈', title: 'Rapports & suivi', desc: "On livre un rapport mensuel avec des constats concrets et on ajuste la stratégie en continu." },
          ] : [
            { icon: '👤', title: 'Personal branding', desc: "We build your digital identity from the ground up so it truly reflects who you are — on the ice, on the field, or off it." },
            { icon: '🎬', title: 'Video production', desc: "Creative direction, cinematic filming and professional editing for content that captures attention." },
            { icon: '📱', title: 'Social media management', desc: "We manage your publishing calendar and ensure a consistent presence across all your platforms." },
            { icon: '🤝', title: 'Partnership development', desc: "We identify brands that match your identity and structure deals that reflect your true value." },
            { icon: '📝', title: 'Editorial strategy', desc: "We tell your story episode by episode, authentically and strategically, to build your credibility." },
            { icon: '📈', title: 'Reports & follow-up', desc: "We deliver a monthly report with concrete insights and continuously adjust the strategy." },
          ]).map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ background: '#f5f5f5', border: '0.5px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '28px 24px', transition: 'border-color 0.2s', height: '100%' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,61,165,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(10,10,10,0.55)', lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== ÉTUDES DE CAS ===== */}
      <section id="etudes-de-cas-athletes" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
          {athleteProjets.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.06}>
              <Link
                to={`/projets/${p.slug}`}
                onMouseEnter={() => setHoveredProjet(p.slug)}
                onMouseLeave={() => setHoveredProjet(null)}
                style={{
                  position: 'relative', display: 'block', overflow: 'hidden', borderRadius: '14px',
                  border: '0.5px solid rgba(255,255,255,0.08)', height: '320px', textDecoration: 'none',
                  background: 'linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,61,165,0.28)', opacity: hoveredProjet === p.slug ? 1 : 0, transition: 'opacity 0.3s ease' }} />
                <span style={{ position: 'absolute', top: '20px', right: '24px', fontFamily: "'Bebas Neue'", fontSize: '90px', color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>
                  0{i + 1}
                </span>

                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '24px' }}>
                  <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: 'rgba(0,61,165,0.35)', border: '0.5px solid rgba(255,255,255,0.3)', padding: '4px 10px', borderRadius: '20px', marginBottom: '12px' }}>
                    {p.categorie[lang]}
                  </span>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '26px', color: '#fff', marginBottom: '8px', lineHeight: 1 }}>
                    {p.client}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '16px', color: '#fff', lineHeight: 1 }}>{p.stats.vues}</div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{fr ? 'Vues' : 'Views'}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '16px', color: '#fff', lineHeight: 1 }}>{p.stats.abonnes}</div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{fr ? 'Abonnés' : 'Followers'}</div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em',
                    display: 'inline-block', opacity: hoveredProjet === p.slug ? 1 : 0,
                    transform: hoveredProjet === p.slug ? 'translateY(0)' : 'translateY(4px)',
                    transition: 'all 0.3s ease',
                  }}>
                    {fr ? 'Voir le projet →' : 'View project →'}
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== DÉROULEMENT ===== */}
      <section id="deroulement" style={{ padding: '100px 0', background: '#ffffff', borderTop: '0.5px solid rgba(0,0,0,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ padding: '0 60px', marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Déroulement personnalisé' : 'Our process'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#0a0a0a', letterSpacing: '0.02em' }}>
              {fr ? <>COMMENT ON <span style={{ color: BLUE }}>TRAVAILLE.</span></> : <>HOW WE <span style={{ color: BLUE }}>WORK.</span></>}
            </h2>
          </div>
        </FadeIn>

        {/* Desktop — sticky cards */}
        <div className="sticky-cards" style={{ position: 'relative', paddingBottom: '200px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              position: 'sticky',
              top: `${64 + i * 12}px`,
              zIndex: i + 1,
              margin: '0 40px 0',
              borderRadius: '16px',
              background: i % 2 === 0 ? '#ffffff' : '#f5f5f5',
              border: '0.5px solid rgba(0,0,0,0.08)',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
              minHeight: '280px',
            }}>
              <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
                {/* Left — text */}
                <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '72px', color: 'rgba(0,61,165,0.15)', lineHeight: 1, marginBottom: '16px', letterSpacing: '-0.02em' }}>{step.num}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,61,165,0.08)', border: '0.5px solid rgba(0,61,165,0.25)', borderRadius: '20px', padding: '4px 12px', marginBottom: '16px', width: 'fit-content' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE }}>{step.days}</span>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(24px, 3vw, 36px)', color: '#0a0a0a', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 1.1 }}>{step.title}</div>
                  <p style={{ fontSize: '14px', color: 'rgba(10,10,10,0.6)', lineHeight: 1.75, fontWeight: 300, marginBottom: '20px' }}>{step.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {step.points.map((pt, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: 'rgba(10,10,10,0.75)' }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — visual */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <img
                      src={i === 0 ? '/deroulement-1.jpg' : i === 1 ? '/deroulement-2.jpg' : '/deroulement-3.jpg'}
                      alt={step.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: i === 1 ? 'center 20%' : 'center' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: '40px' }} />
        </div>

        {/* Mobile — timeline cards */}
        <div className="mobile-timeline" style={{ flexDirection: 'column', gap: '16px', padding: '0 16px', display: 'none' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              borderRadius: '20px',
              background: i % 2 === 0 ? '#ffffff' : '#f5f5f5',
              border: '0.5px solid rgba(0,0,0,0.08)',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{ padding: '28px 24px' }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '48px', color: 'rgba(0,61,165,0.15)', lineHeight: 1, marginBottom: '8px' }}>{step.num}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,61,165,0.08)', border: '0.5px solid rgba(0,61,165,0.25)', borderRadius: '20px', padding: '4px 12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE }}>{step.days}</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '26px', color: '#0a0a0a', marginBottom: '10px', letterSpacing: '0.02em', lineHeight: 1.1 }}>{step.title}</div>
                <p style={{ fontSize: '14px', color: 'rgba(10,10,10,0.65)', lineHeight: 1.75, fontWeight: 300, marginBottom: '18px' }}>{step.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {step.points.map((pt, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: BLUE, border: '2px solid rgba(0,61,165,0.2)', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: 'rgba(10,10,10,0.8)' }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={i === 0 ? '/deroulement-1.jpg' : i === 1 ? '/deroulement-2.jpg' : '/deroulement-3.jpg'}
                  alt={step.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: i === 1 ? 'center 20%' : 'center' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
              </div>
            </div>
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
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{ width: '24px', height: '32px', borderRadius: '50%', border: '0.5px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '16px', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', background: openFaq === i ? BLUE : 'transparent' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="1" x2="5" y2="9" stroke={openFaq === i ? 'white' : '#0a0a0a'} strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="5" x2="9" y2="5" stroke={openFaq === i ? 'white' : '#0a0a0a'} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </button>
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
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Prendre RDV' : 'Book a call'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 60px)', color: '#ffffff', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 0.95 }}>
              {fr ? <>PARLONS DE<br />TON <span style={{ color: BLUE }}>PROJET.</span></> : <>LET'S TALK<br />ABOUT YOUR <span style={{ color: BLUE }}>PROJECT.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300 }}>
              {fr ? "Notre équipe te reviendra dans les 48h." : "Our team will get back to you within 48h."}
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
          .sticky-cards { display: none !important; }
          .mobile-timeline { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
