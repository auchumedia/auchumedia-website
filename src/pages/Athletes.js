import React, { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';

const BLUE = '#003DA5';
const BATAILLON_COLOR = '#3d4a2a';
const SEB_COLOR = '#0a1628';

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

function TikTokCarousel({ videos, bgColor }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' }); };
  return (
    <div style={{ position: 'relative' }}>
      {['left','right'].map((dir, i) => (
        <button key={dir} onClick={() => scroll(i === 0 ? -1 : 1)} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [dir]: '-20px', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.8)', border: '0.5px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
          {i === 0 ? '←' : '→'}
        </button>
      ))}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to right, ${bgColor}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to left, ${bgColor}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div ref={scrollRef} style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollbarWidth: 'none', padding: '8px 40px', scrollSnapType: 'x mandatory' }}>
        {videos.map((url, i) => {
          const videoId = url.split('/video/')[1]?.split('?')[0];
          return (
            <div key={i} style={{ flexShrink: 0, scrollSnapAlign: 'start', width: '300px', height: '530px', borderRadius: '16px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.1)', background: '#000' }}>
              <iframe src={`https://www.tiktok.com/embed/v2/${videoId}`} style={{ width: '100%', height: '100%', border: 'none' }} allow="autoplay; encrypted-media" allowFullScreen title={`video ${i+1}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const BATAILLON_VIDEOS = [
  'https://www.tiktok.com/@bataillon.lnah/video/7631316992540036360',
  'https://www.tiktok.com/@bataillon.lnah/video/7608346645570260231',
  'https://www.tiktok.com/@bataillon.lnah/video/7588586702139165959',
  'https://www.tiktok.com/@bataillon.lnah/video/7606782312935640327',
  'https://www.tiktok.com/@bataillon.lnah/video/7611987075113487634',
  'https://www.tiktok.com/@bataillon.lnah/video/7590904238792887559',
  'https://www.tiktok.com/@bataillon.lnah/video/7599807332582722834',
];

const SEB_VIDEOS = [
  'https://www.tiktok.com/@seb.sylvestre/video/7579015658093186327',
  'https://www.tiktok.com/@seb.sylvestre/video/7580449261767200022',
  'https://www.tiktok.com/@seb.sylvestre/video/7583910354443406614',
  'https://www.tiktok.com/@seb.sylvestre/video/7593162731688185110',
  'https://www.tiktok.com/@seb.sylvestre/video/7592733547325033750',
  'https://www.tiktok.com/@seb.sylvestre/video/7592419813666950422',
  'https://www.tiktok.com/@seb.sylvestre/video/7606450483724635414',
];

const navLinks = [
  { id: 'pourquoi', labelFr: 'Pourquoi AuchuMedia', labelEn: 'Why AuchuMedia' },
  { id: 'etudes-de-cas', labelFr: 'Études de cas', labelEn: 'Case studies' },
  { id: 'deroulement', labelFr: 'Déroulement', labelEn: 'Process' },
  { id: 'faq', labelFr: 'FAQ', labelEn: 'FAQ' },
];

function MultiStepForm({ fr, scrollTo, BLUE }) {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    prenom: '', nom: '', email: '', instagram: '',
    sport: '', ligue: '', niveau: '',
    reseaux: '', objectif: '',
    besoin: '', budget: '', quand: ''
  });
  const [submitted, setSubmitted] = React.useState(false);

  const total = 4;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans'", marginBottom: '14px' };
  const selectStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer' };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' };

  const steps = fr ? ['Tes informations', 'Ton profil sportif', 'Ta présence actuelle', 'Ton projet'] : ['Your information', 'Your sports profile', 'Your current presence', 'Your project'];

  if (submitted) return (
    <div style={{ background: '#0d0d0d', border: `1px solid rgba(0,61,165,0.3)`, borderRadius: '16px', padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '28px', color: '#fff', marginBottom: '12px' }}>{fr ? 'DEMANDE REÇUE !' : 'REQUEST RECEIVED!'}</div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{fr ? 'Notre équipe te contactera dans les 48h.' : 'Our team will contact you within 48h.'}</p>
    </div>
  );

  return (
    <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px 32px' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: BLUE, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{steps[step - 1]}</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{step}/{total}</span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(step / total) * 100}%`, background: BLUE, borderRadius: '2px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {step === 1 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#fff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'TES INFORMATIONS' : 'YOUR INFORMATION'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
            <div>
              <label style={labelStyle}>{fr ? 'Prénom *' : 'First name *'}</label>
              <input type="text" value={form.prenom} onChange={e => set('prenom', e.target.value)} placeholder="Alex" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{fr ? 'Nom *' : 'Last name *'}</label>
              <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)} placeholder="Tremblay" style={inputStyle} />
            </div>
          </div>
          <label style={labelStyle}>Email *</label>
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="alex@monmail.com" style={inputStyle} />
          <label style={labelStyle}>Instagram *</label>
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>@</span>
            <input type="text" value={form.instagram} onChange={e => set('instagram', e.target.value)} placeholder="tonhandle" style={{ ...inputStyle, paddingLeft: '28px', marginBottom: 0 }} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#fff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'TON PROFIL SPORTIF' : 'YOUR SPORTS PROFILE'}</div>
          <label style={labelStyle}>{fr ? 'Ton sport *' : 'Your sport *'}</label>
          <select value={form.sport} onChange={e => set('sport', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {['Hockey', 'Football', 'Basketball', 'Baseball', fr ? 'Autre' : 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Ligue / Organisation *' : 'League / Organization *'}</label>
          <input type="text" value={form.ligue} onChange={e => set('ligue', e.target.value)} placeholder={fr ? 'ex: LNAH, QMJHL, NCAA...' : 'e.g. LNAH, QMJHL, NCAA...'} style={inputStyle} />
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#fff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'TA PRÉSENCE ACTUELLE' : 'YOUR CURRENT PRESENCE'}</div>
          <label style={labelStyle}>{fr ? 'Qui gère tes réseaux sociaux ? *' : 'Who manages your social media? *'}</label>
          <select value={form.reseaux} onChange={e => set('reseaux', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Moi-même', 'Mon agent'] : ['Myself', 'My agent']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label style={labelStyle}>{fr ? 'Ton objectif principal *' : 'Your main goal *'}</label>
          <select value={form.objectif} onChange={e => set('objectif', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Attirer des commanditaires', 'Développer ma marque personnelle', 'Tout ça à la fois'] : ['Attract sponsors', 'Develop my personal brand', 'All of the above']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {step === 4 && (
        <div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#fff', marginBottom: '24px', letterSpacing: '0.04em' }}>{fr ? 'TON PROJET' : 'YOUR PROJECT'}</div>
          <label style={labelStyle}>{fr ? 'Parle-nous de toi et de ton projet *' : 'Tell us about you and your project *'}</label>
          <textarea value={form.besoin} onChange={e => set('besoin', e.target.value)} placeholder={fr ? 'Ton histoire, tes ambitions, ce que tu cherches...' : 'Your story, your ambitions, what you are looking for...'} style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} />
          <label style={labelStyle}>{fr ? 'Quand souhaites-tu commencer ? *' : 'When do you want to start? *'}</label>
          <select value={form.quand} onChange={e => set('quand', e.target.value)} style={selectStyle}>
            <option value="">{fr ? 'Sélectionner' : 'Select'}</option>
            {(fr ? ['Immédiatement', 'Dans 1 à 3 mois', 'Dans 3 à 6 mois', "Je m'informe seulement"] : ['Immediately', 'In 1 to 3 months', 'In 3 to 6 months', 'Just gathering info']).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', gap: '12px' }}>
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)} style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans'", letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            ← {fr ? 'Précédent' : 'Previous'}
          </button>
        ) : <div />}
        {step < total ? (
          <button onClick={() => setStep(s => s + 1)} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, border: 'none', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans'", letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            {fr ? 'Suivant' : 'Next'} →
          </button>
        ) : (
          <button onClick={() => setSubmitted(true)} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, border: 'none', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans'", letterSpacing: '0.07em', textTransform: 'uppercase' }}>
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

  const faqs = fr ? [
    { q: "Combien de temps avant de voir des résultats ?", a: "La plupart de nos clients voient une augmentation significative de leur engagement dans les 60 premiers jours. Les résultats en termes de partenariats arrivent généralement dans les 3-6 premiers mois." },
    { q: "Est-ce que vous gérez tout le contenu ?", a: "Oui. On s'occupe de la stratégie, de la création de contenu, de la production vidéo et de la gestion des réseaux sociaux. Tu as juste à être toi-même." },
    { q: "Faut-il être professionnel pour travailler avec vous ?", a: "Non — on travaille avec des athlètes de tous les niveaux, du junior au professionnel. Ce qui compte, c'est ton ambition et ta volonté de bâtir quelque chose de durable." },
    { q: "Comment fonctionne la collaboration au quotidien ?", a: "Tu as accès à un gestionnaire de compte dédié. On se rencontre régulièrement pour planifier le contenu, et tu approuves tout avant publication." },
    { q: "Est-ce que vous garantissez des deals de commandite ?", a: "On ne peut pas garantir des deals spécifiques, mais notre approche stratégique maximise tes chances d'attirer les bonnes marques. Plusieurs de nos clients ont obtenu leurs premiers deals dans les 6 mois." },
  ] : [
    { q: "How long before seeing results?", a: "Most of our clients see a significant increase in engagement within the first 60 days. Results in terms of partnerships typically arrive within the first 3-6 months." },
    { q: "Do you manage all the content?", a: "Yes. We handle the strategy, content creation, video production and social media management. You just have to be yourself." },
    { q: "Do you need to be a professional to work with you?", a: "No — we work with athletes of all levels, from junior to professional. What matters is your ambition and willingness to build something lasting." },
    { q: "How does day-to-day collaboration work?", a: "You have access to a dedicated account manager. We meet regularly to plan content, and you approve everything before publication." },
    { q: "Do you guarantee sponsorship deals?", a: "We can't guarantee specific deals, but our strategic approach maximizes your chances of attracting the right brands. Several of our clients have landed their first deals within 6 months." },
  ];

  const steps = fr ? [
    {
      num: '01', days: 'Semaine 1–2', title: 'APPEL DÉCOUVERTE & AUDIT',
      desc: "On apprend à te connaître — ton histoire, tes objectifs, ta personnalité. On analyse ta présence actuelle et on construit une stratégie sur mesure.",
      points: ["Audit de ta présence actuelle", "Définition de ton identité de marque", "Stratégie de contenu personnalisée", "Calendrier éditorial du premier mois"]
    },
    {
      num: '02', days: 'Semaine 2–4', title: 'CRÉATION DE CONTENU',
      desc: "Tournages, production vidéo, direction créative — on crée du contenu qui te ressemble vraiment et qui capte l'attention.",
      points: ["Tournage professionnel", "Montage & adaptation par plateforme", "Direction créative & storytelling", "Approbation avant publication"]
    },
    {
      num: '03', days: 'Mois 1–3', title: 'PUBLICATION & CROISSANCE',
      desc: "On publie de façon cohérente et on optimise en continu pour maximiser ta portée, ton engagement et ta visibilité.",
      points: ["Publication cohérente sur toutes les plateformes", "Gestion de communauté active", "Optimisation basée sur les données", "Rapport mensuel de performance"]
    },
  ] : [
    {
      num: '01', days: 'Week 1–2', title: 'DISCOVERY CALL & AUDIT',
      desc: "We get to know you — your story, your goals, your personality. We analyze your current presence and build a custom strategy.",
      points: ["Audit of your current presence", "Brand identity definition", "Personalized content strategy", "First month editorial calendar"]
    },
    {
      num: '02', days: 'Week 2–4', title: 'CONTENT CREATION',
      desc: "Shoots, video production, creative direction — we create content that truly looks like you and captures attention.",
      points: ["Professional shoot", "Editing & platform adaptation", "Creative direction & storytelling", "Approval before publishing"]
    },
    {
      num: '03', days: 'Month 1–3', title: 'PUBLISHING & GROWTH',
      desc: "We publish consistently and optimize continuously to maximize your reach, engagement and visibility.",
      points: ["Consistent publishing across all platforms", "Active community management", "Data-driven optimization", "Monthly performance report"]
    },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>

      {/* ===== MAIN NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(8,8,8,0.96)' : '#080808',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        transition: 'all 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', height: '64px', gap: '16px'
      }}>
        <a href="/" style={{ flexShrink: 0 }}><img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '22px', width: 'auto' }} /></a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none', flex: 1, justifyContent: 'center' }} className="nav-links">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{
              fontSize: '11px', fontWeight: 600,
              color: activeSection === link.id ? '#fff' : 'rgba(255,255,255,0.45)',
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
          <a href="/entreprises" style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: 'transparent', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {fr ? 'Pour entreprises' : 'For businesses'}
          </a>
          <button onClick={() => scrollTo('contact')} style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: BLUE, padding: '9px 18px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'", whiteSpace: 'nowrap' }}>
            {fr ? 'Prendre RDV' : 'Book a call'}
          </button>
          <div style={{ display: 'flex', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            {['fr','en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ fontSize: '9px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', border: 'none', background: lang === l ? 'rgba(255,255,255,0.1)' : 'transparent', color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans'" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger-btn" style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexShrink: 0 }}>
            <span style={{ width: '22px', height: '1.5px', background: '#fff', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#fff', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'all 0.25s' }} />
            <span style={{ width: '22px', height: '1.5px', background: '#fff', display: 'block', transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0, zIndex: 490, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', padding: '24px 24px', gap: '4px', overflowY: 'auto' }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => { scrollTo(link.id); setMobileOpen(false); }} style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', background: 'transparent', border: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.06)', padding: '16px 0', cursor: 'pointer', textAlign: 'left', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'DM Sans'", width: '100%' }}>
              {fr ? link.labelFr : link.labelEn}
            </button>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexDirection: 'column' }}>
            <a href="/entreprises" style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: 'transparent', padding: '12px 20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'center' }}>
              {fr ? 'Pour entreprises' : 'For businesses'}
            </a>
            <button onClick={() => { scrollTo('contact'); setMobileOpen(false); }} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: '#003DA5', padding: '13px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
              {fr ? 'Prendre RDV' : 'Book a call'}
            </button>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 60px 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(0,61,165,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 7.5vw, 100px)', lineHeight: 0.93, color: '#fff', marginBottom: '28px', letterSpacing: '0.01em' }}>
            {fr ? 'RAYONNE AU-DELÀ\nDE TON SPORT.' : 'RISE ABOVE\nYOUR SPORT.'}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px', fontWeight: 300 }}>
            {fr ? "On bâtit la marque des athlètes qui dominent. Personal branding, partnerships et production vidéo — tout pour que tu deviennes la référence dans ton sport." : "We build the brand of athletes who dominate. Personal branding, partnerships and video production — everything to make you the reference in your sport."}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '72px' }}>
            <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,61,165,0.3)', fontFamily: "'DM Sans'" }}>
              {fr ? 'Prendre RDV →' : 'Book a call →'}
            </button>
            <button onClick={() => scrollTo('etudes-de-cas')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 32px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
              {fr ? 'Voir les résultats' : 'See results'}
            </button>
          </div>
        </div>
      </section>

      {/* ===== POURQUOI ===== */}
      <section id="pourquoi" style={{ padding: '80px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Pourquoi AuchuMedia' : 'Why AuchuMedia'}</span>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff', letterSpacing: '0.02em' }}>
              {fr ? <>UN SERVICE <span style={{ color: BLUE }}>CLÉ EN MAIN.</span></> : <>A <span style={{ color: BLUE }}>TURNKEY SERVICE.</span></>}
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 320px)', gap: '12px', justifyContent: 'center' }}>
          {(fr ? [
            { icon: '🎯', title: 'Personal branding', desc: "On bâtit ton identité numérique de A à Z — image, ton, positionnement. Tu deviens reconnaissable." },
            { icon: '🎬', title: 'Production vidéo', desc: "Tournages, montage, direction créative. Du contenu cinématographique qui te démarque vraiment." },
            { icon: '📱', title: 'Gestion des réseaux', desc: "On publie de façon cohérente sur Instagram, TikTok et YouTube pour maximiser ta visibilité." },
            { icon: '🤝', title: 'Développement de partnerships', desc: "On identifie et approche les marques qui correspondent à ton image pour des deals authentiques." },
            { icon: '📊', title: 'Stratégie éditoriale', desc: "Chaque publication a un but. On planifie ton contenu pour construire une audience engagée." },
            { icon: '📈', title: 'Rapports & suivi', desc: "Rapport mensuel complet et réunion stratégique pour ajuster et optimiser en continu." },
          ] : [
            { icon: '🎯', title: 'Personal branding', desc: "We build your digital identity from A to Z — image, tone, positioning. You become recognizable." },
            { icon: '🎬', title: 'Video production', desc: "Shoots, editing, creative direction. Cinematic content that truly makes you stand out." },
            { icon: '📱', title: 'Social media management', desc: "We publish consistently on Instagram, TikTok and YouTube to maximize your visibility." },
            { icon: '🤝', title: 'Partnership development', desc: "We identify and approach brands that match your image for authentic deals." },
            { icon: '📊', title: 'Editorial strategy', desc: "Every post has a purpose. We plan your content to build an engaged audience." },
            { icon: '📈', title: 'Reports & follow-up', desc: "Complete monthly report and strategic meeting to adjust and optimize continuously." },
          ]).map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '28px 24px', transition: 'border-color 0.2s', height: '100%' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,61,165,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== ÉTUDES DE CAS ===== */}
      <section id="etudes-de-cas" style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px', overflow: 'hidden' }}>

        {/* Bataillon */}
        <div style={{ background: BATAILLON_COLOR, padding: '80px 0 60px' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>{fr ? 'Étude de cas 1/2' : 'Case study 1/2'}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>LE BATAILLON</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>{fr ? 'Hockey · LNAH · St-Hyacinthe · Médias sociaux' : 'Hockey · LNAH · St-Hyacinthe · Social media'}</div>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[{num:'3M',label:fr?'vues':'views'},{num:'100K',label:'engagements'},{num:'38',label:fr?'vidéos':'videos'},{num:'+5K',label:fr?'abonnés':'followers'}].map((m,i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ padding: '0 20px' }}><TikTokCarousel videos={BATAILLON_VIDEOS} bgColor={BATAILLON_COLOR} /></div>
        </div>

        {/* Sébastien Sylvestre */}
        <div style={{ background: SEB_COLOR, padding: '80px 0 60px', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>{fr ? 'Étude de cas 2/2' : 'Case study 2/2'}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>SÉBASTIEN SYLVESTRE</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>{fr ? 'Hockey · LNAH · Personal branding' : 'Hockey · LNAH · Personal branding'}</div>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[{num:'2M',label:fr?'vues':'views'},{num:'26K',label:'engagements'},{num:'7',label:fr?'vidéos':'videos'}].map((m,i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ padding: '0 20px' }}><TikTokCarousel videos={SEB_VIDEOS} bgColor={SEB_COLOR} /></div>
        </div>
      </section>

      {/* ===== DÉROULEMENT ===== */}
      <section id="deroulement" style={{ padding: '100px 0', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ padding: '0 60px', marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Déroulement personnalisé' : 'Our process'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', letterSpacing: '0.02em' }}>
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
              margin: '0 40px',
              borderRadius: '16px',
              background: i % 2 === 0 ? '#0d0d0d' : '#111',
              border: '0.5px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              minHeight: '280px',
            }}>
              <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
                <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '72px', color: 'rgba(0,61,165,0.15)', lineHeight: 1, marginBottom: '16px', letterSpacing: '-0.02em' }}>{step.num}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.25)', borderRadius: '20px', padding: '4px 12px', marginBottom: '16px', width: 'fit-content' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE }}>{step.days}</span>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(24px, 3vw, 36px)', color: '#fff', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 1.1 }}>{step.title}</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontWeight: 300, marginBottom: '20px' }}>{step.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {step.points.map((pt, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{
                  background: i % 2 === 0 ? 'linear-gradient(135deg, #080f1c, #0d1428)' : 'linear-gradient(135deg, #0d0d0d, #161616)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', fontFamily: "'Bebas Neue'", fontSize: '200px', color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>{String(i+1)}</div>
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: '48px', color: BLUE, letterSpacing: '0.05em' }}>{step.days}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{fr ? 'jalons' : 'milestone'}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: '40px' }} />
        </div>

        {/* Mobile */}
        <div className="mobile-timeline" style={{ flexDirection: 'column', gap: '16px', padding: '0 16px', display: 'none' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ borderRadius: '20px', background: i % 2 === 0 ? '#0d0d0d' : '#111', border: '0.5px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ padding: '28px 24px' }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '48px', color: 'rgba(0,61,165,0.15)', lineHeight: 1, marginBottom: '8px' }}>{step.num}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.25)', borderRadius: '20px', padding: '4px 12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE }}>{step.days}</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '26px', color: '#fff', marginBottom: '10px', letterSpacing: '0.02em', lineHeight: 1.1 }}>{step.title}</div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300, marginBottom: '18px' }}>{step.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {step.points.map((pt, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: BLUE, border: '2px solid rgba(0,61,165,0.3)', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ===== FAQ ===== */}
      <section id="faq" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>FAQ</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
            {fr ? <>QUESTIONS <span style={{ color: BLUE }}>FRÉQUENTES.</span></> : <>FREQUENTLY ASKED <span style={{ color: BLUE }}>QUESTIONS.</span></>}
          </h2>
        </FadeIn>
        <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ background: openFaq === i ? '#111' : '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '8px', overflow: 'hidden', transition: 'background 0.2s', marginBottom: '4px' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{ width: '24px', height: '32px', borderRadius: '50%', border: '0.5px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '16px', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', background: openFaq === i ? BLUE : 'transparent' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="1" x2="5" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="5" x2="9" y2="5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </button>
                <div style={{ maxHeight: openFaq === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                  <div style={{ padding: '0 24px 20px', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontWeight: 300 }}>{faq.a}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <FadeIn direction="left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Prendre contact' : 'Get in touch'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 60px)', color: '#fff', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 0.95 }}>
              {fr ? <>PARLONS DE<br />TON <span style={{ color: BLUE }}>PROJET.</span></> : <>LET'S TALK<br />ABOUT YOUR <span style={{ color: BLUE }}>PROJECT.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300 }}>
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
        #etudes-de-cas > div { width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }
        .hamburger-btn { display: flex !important; }
        @media (max-width: 768px) {
          nav { padding: 0 20px !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:last-child > *:not(.hamburger-btn) { display: none !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
