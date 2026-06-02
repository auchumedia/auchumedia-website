import React, { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';

const BLUE = '#003DA5';
const NORCAN_GREEN = '#1a3a2a';
const SEXXXPLUS_COLOR = '#1a0a0a';
const MAHER_COLOR = '#003580';

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

const NORCAN_VIDEOS = ['https://www.tiktok.com/@norcan.57/video/7556376175652670721','https://www.tiktok.com/@norcan.57/video/7574205401663655188','https://www.tiktok.com/@norcan.57/video/7576799967818403092','https://www.tiktok.com/@norcan.57/video/7584593295960034567','https://www.tiktok.com/@norcan.57/video/7599808484774776082','https://www.tiktok.com/@norcan.57/video/7623541839110360328','https://www.tiktok.com/@norcan.57/video/7628721678876413191','https://www.tiktok.com/@norcan.57/video/7640229332241222920','https://www.tiktok.com/@norcan.57/video/7636529264438906130'];
const SEXXXPLUS_VIDEOS = ['https://www.tiktok.com/@boutiqueerotiquesp/video/7463247824583412997','https://www.tiktok.com/@boutiqueerotiquesp/video/7538563446787362066','https://www.tiktok.com/@boutiqueerotiquesp/video/7537822973126872326','https://www.tiktok.com/@boutiqueerotiquesp/video/7530033837246582022','https://www.tiktok.com/@boutiqueerotiquesp/video/7520008462882098437','https://www.tiktok.com/@boutiqueerotiquesp/video/7482901136060517637','https://www.tiktok.com/@boutiqueerotiquesp/video/7454332830550674694','https://www.tiktok.com/@boutiqueerotiquesp/video/7550438938322717973'];
const MAHER_VIDEOS = ['https://www.tiktok.com/@famillemaher/video/7600921134854360327','https://www.tiktok.com/@famillemaher/video/7602054271172906248','https://www.tiktok.com/@famillemaher/video/7605014622764141831','https://www.tiktok.com/@famillemaher/video/7618350590027975956','https://www.tiktok.com/@famillemaher/video/7620967888328969493','https://www.tiktok.com/@famillemaher/video/7626147213588122898','https://www.tiktok.com/@famillemaher/video/7633221318900518151','https://www.tiktok.com/@famillemaher/video/7640230731494460680','https://www.tiktok.com/@famillemaher/video/7645079778852261138','https://www.tiktok.com/@famillemaher/video/7623544372428147976'];

const LOGOS = [
  { src: '/norcan.png', alt: 'Nor-Can' },
  { src: '/nsexxxplus.png', alt: 'SexxxPlus' },
  { src: '/lefevbre.png', alt: 'R. Lefebvre' },
  { src: '/trabsport.png', alt: 'Transport Tardif' },
  { src: '/cardinal.png', alt: 'Cardinal Asphalte' },
];

const navLinks = [
  { id: 'pourquoi', labelFr: 'Pourquoi AuchuMedia', labelEn: 'Why AuchuMedia' },
  { id: 'etudes-de-cas', labelFr: 'Études de cas', labelEn: 'Case studies' },
  { id: 'deroulement', labelFr: 'Déroulement', labelEn: 'Process' },
  { id: 'faq', labelFr: 'FAQ', labelEn: 'FAQ' },
  { id: 'tarification', labelFr: 'Tarification', labelEn: 'Pricing' },
];

export default function Entreprises() {
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
    { q: "Combien de temps avant de voir des résultats ?", a: "La plupart de nos clients voient une augmentation mesurable de leur engagement dans les 30 premiers jours. Les leads qualifiés arrivent généralement dans les 60-90 premiers jours." },
    { q: "Est-ce que vous gérez tout le contenu ?", a: "Oui. On prend en charge la stratégie, la création de contenu, la production vidéo et la gestion des réseaux sociaux. Votre seul travail est d'approuver." },
    { q: "Comment fonctionne la tarification ?", a: "Notre forfait de base commence à 3 500$/mois. Il inclut 8 vidéos courts formats, la gestion des médias sociaux, la stratégie éditoriale et les rapports mensuels." },
    { q: "Est-ce que vous travaillez avec toutes les industries ?", a: "On se spécialise dans les entreprises B2C high ticket — services premium, immobilier, construction et autres services de valeur élevée." },
    { q: "Qu'est-ce qui est inclus dans le forfait de base ?", a: "8 vidéos courts formats par mois, gestion des réseaux sociaux (Instagram, TikTok, LinkedIn), stratégie éditoriale mensuelle, rapport de performance et réunion mensuelle." },
    { q: "Est-ce que les campagnes Meta Ads sont incluses ?", a: "Non — la gestion des Meta Ads est un service distinct. On peut créer un forfait combiné médias sociaux + publicités pour maximiser vos résultats." },
  ] : [
    { q: "How long before seeing results?", a: "Most of our clients see a measurable increase in engagement within the first 30 days. Qualified leads typically arrive within the first 60-90 days." },
    { q: "Do you manage all the content?", a: "Yes. We handle strategy, content creation, video production and social media management. Your only job is to approve." },
    { q: "How does pricing work?", a: "Our base plan starts at $3,500/month. It includes 8 short-form videos, social media management, editorial strategy and monthly reports." },
    { q: "Do you work with all industries?", a: "We specialize in B2C high ticket businesses — premium services, real estate, construction and other high-value services." },
    { q: "What's included in the base plan?", a: "8 short-form videos per month, social media management (Instagram, TikTok, LinkedIn), monthly editorial strategy, performance report and monthly meeting." },
    { q: "Are Meta Ads campaigns included?", a: "No — Meta Ads management is a separate service. We can create a combined social media + ads plan to maximize your results." },
  ];

  const steps = fr ? [
    {
      num: '01', days: 'Jour 1–30', title: 'STRATÉGIE & ONBOARDING',
      desc: "On plonge dans votre business. Audit complet, définition de votre audience cible, et construction de votre stratégie de contenu sur mesure.",
      points: ["Audit de votre présence actuelle", "Définition de l'identité de marque", "Calendrier éditorial du premier mois", "Configuration des outils & accès"]
    },
    {
      num: '02', days: 'Jour 30–60', title: 'PREMIERS CONTENUS & AJUSTEMENTS',
      desc: "On lance, on teste, on apprend. Les premières vidéos sont publiées et on analyse ce qui résonne avec votre audience.",
      points: ["Publication des 8 premières vidéos", "Analyse des premières performances", "Ajustement du format et du ton", "Début de la croissance organique"]
    },
    {
      num: '03', days: 'Jour 60–90', title: 'OPTIMISATION & TRACTION',
      desc: "On identifie ce qui fonctionne et on double la mise. Les algorithmes commencent à vous favoriser.",
      points: ["Scale des formats performants", "Optimisation des horaires de publication", "Rapport de performance détaillé", "Première réunion stratégique mensuelle"]
    },
    {
      num: '04', days: 'Jour 90–180', title: 'CROISSANCE ACCÉLÉRÉE',
      desc: "Votre audience est engagée, votre marque est reconnue. On active les Meta Ads pour amplifier votre portée et générer des leads.",
      points: ["Lancement des campagnes Meta Ads", "Intégration CRM & pipeline de leads", "Croissance audience significative", "Premiers leads qualifiés"]
    },
    {
      num: '05', days: 'Jour 180–365', title: 'RÉFÉRENCE & SCALING',
      desc: "Vous êtes maintenant LA référence dans votre domaine. On scale ce qui fonctionne et on bâtit sur vos succès.",
      points: ["Position dominante dans votre niche", "Machine à leads bien huilée", "Scaling des campagnes performantes", "Stratégie long terme & partenariats"]
    },
  ] : [
    {
      num: '01', days: 'Day 1–30', title: 'STRATEGY & ONBOARDING',
      desc: "We dive deep into your business. Complete audit, target audience definition, and custom content strategy building.",
      points: ["Audit of your current presence", "Brand identity definition", "First month editorial calendar", "Tools & access configuration"]
    },
    {
      num: '02', days: 'Day 30–60', title: 'FIRST CONTENT & ADJUSTMENTS',
      desc: "We launch, test, and learn. First videos are published and we analyze what resonates with your audience.",
      points: ["Publication of the first 8 videos", "First performance analysis", "Format and tone adjustment", "Start of organic growth"]
    },
    {
      num: '03', days: 'Day 60–90', title: 'OPTIMIZATION & TRACTION',
      desc: "We identify what works and double down. Algorithms start favoring you.",
      points: ["Scale performing formats", "Publishing schedule optimization", "Detailed performance report", "First monthly strategic meeting"]
    },
    {
      num: '04', days: 'Day 90–180', title: 'ACCELERATED GROWTH',
      desc: "Your audience is engaged, your brand is recognized. We activate Meta Ads to amplify your reach and generate leads.",
      points: ["Meta Ads campaign launch", "CRM & lead pipeline integration", "Significant audience growth", "First qualified leads"]
    },
    {
      num: '05', days: 'Day 180–365', title: 'REFERENCE & SCALING',
      desc: "You are now THE reference in your industry. We scale what works and build on your successes.",
      points: ["Dominant position in your niche", "Well-oiled lead machine", "Scaling of performing campaigns", "Long-term strategy & partnerships"]
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
        {/* Logo */}
        <a href="/" style={{ flexShrink: 0 }}><img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '36px', width: 'auto' }} /></a>

        {/* Section links — center */}
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

        {/* Right — athletes + CTA + lang */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <a href="/athletes" style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: 'transparent', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {fr ? 'Pour athlètes' : 'For athletes'}
          </a>
          <button onClick={() => scrollTo('contact')} style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: BLUE, padding: '9px 18px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'", whiteSpace: 'nowrap' }}>
            {fr ? 'Planifier un appel' : 'Book a call'}
          </button>
          <div style={{ display: 'flex', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            {['fr','en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ fontSize: '9px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', border: 'none', background: lang === l ? 'rgba(255,255,255,0.1)' : 'transparent', color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans'" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {/* Hamburger */}
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
            <a href="/athletes" style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: 'transparent', padding: '12px 20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'center' }}>
              {fr ? 'Pour athlètes' : 'For athletes'}
            </a>
            <button onClick={() => { scrollTo('contact'); setMobileOpen(false); }} style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: '#003DA5', padding: '13px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'" }}>
              {fr ? 'Planifier un appel' : 'Book a call'}
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
            {fr ? 'DEVENEZ LA RÉFÉRENCE\nDANS VOTRE DOMAINE' : 'BECOME THE REFERENCE\nIN YOUR INDUSTRY'}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px', fontWeight: 300 }}>
            {fr ? "Notre service de médias sociaux always-on a été conçu pour les entreprises B2C ambitieuses prêtes à traiter les médias sociaux avec autant de sérieux qu'ils le méritent." : "Our always-on social media service was designed for ambitious B2C businesses ready to treat social media as seriously as it deserves."}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '72px' }}>
            <button onClick={() => scrollTo('tarification')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,61,165,0.3)', fontFamily: "'DM Sans'" }}>
              {fr ? 'Tarification' : 'Pricing'}
            </button>
            <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 32px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
              {fr ? 'Planifier un appel' : 'Book a call'}
            </button>
          </div>

          {/* Static logos */}
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '24px' }}>
            {fr ? 'Des marques nous font confiance' : 'Brands that trust us'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            {LOGOS.map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt} style={{ height: '36px', width: 'auto', maxWidth: '100px', objectFit: 'contain', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            ))}
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
            { icon: '🚀', title: 'Stratégie de contenu', desc: "On définit votre stratégie de contenu centrée sur l'audience en fonction de vos objectifs d'affaires." },
            { icon: '🎬', title: 'Création de contenu', desc: "On prend en charge l'idéation, la préproduction, la production et la postproduction." },
            { icon: '📱', title: 'Publication de contenu', desc: "On gère votre calendrier de contenu et publions sur l'ensemble des plateformes." },
            { icon: '🎯', title: 'Meta Ads', desc: "On conçoit, lance et optimise vos campagnes Meta Ads axées sur la performance et l'acquisition." },
            { icon: '🔗', title: 'CRM & Pipeline', desc: "On intègre et configure votre CRM pour centraliser vos leads, structurer votre pipeline et automatiser vos suivis." },
            { icon: '📈', title: 'Rapports', desc: "On livre un rapport mensuel avec des constats, puis on applique tout ce qu'on a appris à la prochaine série de contenus." },
          ] : [
            { icon: '🚀', title: 'Content strategy', desc: "We define your audience-focused content strategy based on your business objectives." },
            { icon: '🎬', title: 'Content creation', desc: "We handle ideation, pre-production, production and post-production." },
            { icon: '📱', title: 'Content publishing', desc: "We manage your content calendar and publish across all platforms." },
            { icon: '🎯', title: 'Meta Ads', desc: "We design, launch and optimize your Meta Ads campaigns focused on performance and acquisition." },
            { icon: '🔗', title: 'CRM & Pipeline', desc: "We integrate and configure your CRM to centralize leads, structure your pipeline and automate follow-ups." },
            { icon: '📈', title: 'Reports', desc: "We deliver a monthly report with insights, then apply everything learned to the next content series." },
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
        {/* NorCan */}
        <div style={{ background: NORCAN_GREEN, padding: '80px 0 60px' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>{fr ? 'Étude de cas 1/3' : 'Case study 1/3'}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>NOR-CAN</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>{fr ? 'Chauffage & climatisation · Médias sociaux' : 'Heating & cooling · Social media'}</div>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[{num:'6M',label:fr?'vues':'views'},{num:'50K',label:'engagements'},{num:'172',label:fr?'vidéos':'videos'},{num:'+9K',label:fr?'abonnés':'followers'}].map((m,i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ padding: '0 20px' }}><TikTokCarousel videos={NORCAN_VIDEOS} bgColor={NORCAN_GREEN} /></div>
        </div>

        {/* SexxxPlus */}
        <div style={{ background: SEXXXPLUS_COLOR, padding: '80px 0 60px', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>{fr ? 'Étude de cas 2/3' : 'Case study 2/3'}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>SEXXXPLUS</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>{fr ? 'Boutique érotique · Médias sociaux' : 'Erotic boutique · Social media'}</div>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[{num:'22M',label:fr?'vues':'views'},{num:'1M',label:'engagements'},{num:'120',label:fr?'vidéos':'videos'},{num:'+35K',label:fr?'abonnés':'followers'}].map((m,i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ padding: '0 20px' }}><TikTokCarousel videos={SEXXXPLUS_VIDEOS} bgColor={SEXXXPLUS_COLOR} /></div>
        </div>

        {/* Maher */}
        <div style={{ background: MAHER_COLOR, padding: '80px 0 60px', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>{fr ? 'Étude de cas 3/3' : 'Case study 3/3'}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>RAF & STEVE MAHER</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>{fr ? 'Immobilier · RE/MAX · Médias sociaux' : 'Real estate · RE/MAX · Social media'}</div>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[{num:'640K',label:fr?'vues':'views'},{num:'14K',label:'engagements'},{num:'24',label:fr?'vidéos':'videos'},{num:'+2K',label:fr?'abonnés':'followers'}].map((m,i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ padding: '0 20px' }}><TikTokCarousel videos={MAHER_VIDEOS} bgColor={MAHER_COLOR} /></div>
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

        {/* Sticky scroll cards */}
        <div style={{ position: 'relative' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              position: 'sticky',
              top: `${64 + i * 12}px`,
              zIndex: i + 1,
              margin: '0 40px 16px',
              borderRadius: '16px',
              background: i % 2 === 0 ? '#0d0d0d' : '#111',
              border: '0.5px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
                {/* Left — text */}
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
                {/* Right — visual */}
                <div style={{ background: i % 2 === 0 ? 'linear-gradient(135deg, #080f1c, #0d1428)' : 'linear-gradient(135deg, #0d0d0d, #161616)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', fontFamily: "'Bebas Neue'", fontSize: '200px', color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>{String(i+1)}</div>
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: '48px', color: BLUE, letterSpacing: '0.05em' }}>{step.days}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{fr ? 'jalons' : 'milestone'}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer so last card unsticks */}
          <div style={{ height: '40px' }} />
        </div>
      </section>

      {/* ===== TARIFICATION ===== */}
      <section id="tarification" style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Tarification' : 'Pricing'}</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
            {fr ? <>UNE OFFRE <span style={{ color: BLUE }}>TRANSPARENTE.</span></> : <>TRANSPARENT <span style={{ color: BLUE }}>PRICING.</span></>}
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '900px' }}>
          <FadeIn delay={0.1}>
            <div style={{ background: '#0d0d0d', border: `1px solid rgba(0,61,165,0.3)`, borderRadius: '16px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(0,61,165,0.06)', filter: 'blur(30px)' }} />
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px' }}>{fr ? 'Forfait de base' : 'Base plan'}</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>3 500$</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>{fr ? '/ mois' : '/ month'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {(fr ? ['8 vidéos courts formats / mois','Gestion Instagram, TikTok & LinkedIn','Stratégie éditoriale mensuelle','Rapport de performance','Réunion mensuelle dédiée','Gestionnaire de compte attitré'] : ['8 short-form videos / month','Instagram, TikTok & LinkedIn management','Monthly editorial strategy','Performance report','Monthly dedicated meeting','Dedicated account manager']).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} style={{ width: '100%', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
                {fr ? 'Démarrer →' : 'Get started →'}
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '40px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>{fr ? 'Forfait sur mesure' : 'Custom plan'}</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>{fr ? 'SUR MESURE' : 'CUSTOM'}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>{fr ? 'Selon vos besoins' : 'Based on your needs'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {(fr ? ['Tout le forfait de base','Gestion Meta Ads & Google Ads','Intégration CRM complète','Production vidéo longue durée','Stratégie multi-plateforme'] : ['Everything in base plan','Meta Ads & Google Ads management','Full CRM integration','Long-form video production','Multi-platform strategy']).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} style={{ width: '100%', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.2)', padding: '14px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
                {fr ? 'Nous contacter →' : 'Contact us →'}
              </button>
            </div>
          </FadeIn>
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
                <div style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
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
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Planifier un appel' : 'Book a call'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 60px)', color: '#fff', marginBottom: '16px', letterSpacing: '0.02em', lineHeight: 0.95 }}>
              {fr ? <>PARLONS DE<br />VOTRE <span style={{ color: BLUE }}>CROISSANCE.</span></> : <>LET'S TALK<br />ABOUT YOUR <span style={{ color: BLUE }}>GROWTH.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300 }}>
              {fr ? "Notre équipe vous reviendra dans les 48h." : "Our team will get back to you within 48h."}
            </p>
          </FadeIn>
          <FadeIn direction="right">
            <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '36px 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                {[fr ? 'Prénom' : 'First name', fr ? 'Nom' : 'Last name'].map(l => (
                  <div key={l}>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{l}</label>
                    <input type="text" style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
                  </div>
                ))}
              </div>
              {[{ label: 'Email', type: 'email' }, { label: fr ? "Nom de l'entreprise" : 'Company name', type: 'text' }].map(f => (
                <div key={f.label} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{f.label}</label>
                  <input type={f.type} style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{fr ? "Chiffre d'affaires annuel" : 'Annual revenue'}</label>
                <select style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", appearance: 'none', cursor: 'pointer' }}>
                  <option value="">{fr ? 'Sélectionne une tranche' : 'Select a range'}</option>
                  {(fr ? ['Moins de 100K$/an','100K$ – 500K$/an','500K$ – 1M$/an','1M$ et plus'] : ['Less than $100K/yr','$100K – $500K/yr','$500K – $1M/yr','$1M and more']).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{fr ? 'Votre projet' : 'Your project'}</label>
                <textarea required placeholder={fr ? 'Dites-nous en plus...' : 'Tell us more...'} style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", resize: 'vertical', minHeight: '90px' }} />
              </div>
              <button style={{ width: '100%', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontFamily: "'DM Sans'" }}>
                {fr ? 'Envoyer ma demande →' : 'Send my request →'}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style>{`
        #etudes-de-cas > div { width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }
        .hamburger-btn { display: flex !important; }
        @media (max-width: 768px) {
          nav div[style*="padding: 0 60px"] { padding: 0 20px !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:last-child > *:not(.hamburger-btn) { display: none !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          div[style*="padding: 28px 60px"] { padding: 20px !important; flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
}
