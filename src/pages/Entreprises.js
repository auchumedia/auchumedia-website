import React, { useState, useRef, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
 
const BLUE = '#003DA5';
const NORCAN_GREEN = '#1a3a2a';
const SEXXXPLUS_COLOR = '#1a0a0a';
const MAHER_COLOR = '#003580';
 
const MAHER_VIDEOS = [
  'https://www.tiktok.com/@famillemaher/video/7600921134854360327',
  'https://www.tiktok.com/@famillemaher/video/7602054271172906248',
  'https://www.tiktok.com/@famillemaher/video/7605014622764141831',
  'https://www.tiktok.com/@famillemaher/video/7618350590027975956',
  'https://www.tiktok.com/@famillemaher/video/7620967888328969493',
  'https://www.tiktok.com/@famillemaher/video/7626147213588122898',
  'https://www.tiktok.com/@famillemaher/video/7633221318900518151',
  'https://www.tiktok.com/@famillemaher/video/7640230731494460680',
  'https://www.tiktok.com/@famillemaher/video/7645079778852261138',
  'https://www.tiktok.com/@famillemaher/video/7623544372428147976',
];
 
const SEXXXPLUS_VIDEOS = [
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7463247824583412997',
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7538563446787362066',
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7537822973126872326',
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7530033837246582022',
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7520008462882098437',
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7482901136060517637',
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7454332830550674694',
  'https://www.tiktok.com/@boutiqueerotiquesp/video/7550438938322717973',
];
 
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
 
const SectionLabel = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
    <div style={{ width: '20px', height: '1px', background: BLUE }} />
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{children}</span>
  </div>
);
 
// TikTok embed carousel
function TikTokCarousel({ videos, bgColor = NORCAN_GREEN }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };
  return (
    <div style={{ position: 'relative' }}>
      {/* Arrows */}
      {['left', 'right'].map((dir, i) => (
        <button key={dir} onClick={() => scroll(i === 0 ? -1 : 1)} style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          [dir]: '-20px', zIndex: 10,
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.8)', border: '0.5px solid rgba(255,255,255,0.2)',
          color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px'
        }}>
          {i === 0 ? '←' : '→'}
        </button>
      ))}
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to right, ${bgColor}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to left, ${bgColor}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      {/* Scroll container */}
      <div ref={scrollRef} style={{
        display: 'flex', gap: '16px', overflowX: 'auto', scrollbarWidth: 'none',
        padding: '8px 40px', scrollSnapType: 'x mandatory'
      }}>
        {videos.map((url, i) => {
          const videoId = url.split('/video/')[1]?.split('?')[0];
          return (
            <div key={i} style={{
              flexShrink: 0, scrollSnapAlign: 'start',
              width: '300px', height: '530px',
              borderRadius: '16px', overflow: 'hidden',
              border: '0.5px solid rgba(255,255,255,0.1)',
              background: '#000'
            }}>
              <iframe
                src={`https://www.tiktok.com/embed/v2/${videoId}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`NorCan video ${i + 1}`}
              />
            </div>
          );
        })}
      </div>
      <style>{`.tiktok-carousel::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
 
const NORCAN_VIDEOS = [
  'https://www.tiktok.com/@norcan.57/video/7556376175652670721',
  'https://www.tiktok.com/@norcan.57/video/7574205401663655188',
  'https://www.tiktok.com/@norcan.57/video/7576799967818403092',
  'https://www.tiktok.com/@norcan.57/video/7584593295960034567',
  'https://www.tiktok.com/@norcan.57/video/7599808484774776082',
  'https://www.tiktok.com/@norcan.57/video/7623541839110360328',
  'https://www.tiktok.com/@norcan.57/video/7628721678876413191',
  'https://www.tiktok.com/@norcan.57/video/7640229332241222920',
  'https://www.tiktok.com/@norcan.57/video/7636529264438906130',
];
 
export default function Entreprises() {
  const [lang, setLang] = useState('fr');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('etudes-de-cas');
  const fr = lang === 'fr';
 
  const navLinks = [
    { id: 'etudes-de-cas', label: fr ? 'Études de cas' : 'Case studies' },
    { id: 'pourquoi', label: fr ? 'Pourquoi AuchuMedia' : 'Why AuchuMedia' },
    { id: 'deroulement', label: fr ? 'Déroulement' : 'Process' },
    { id: 'faq', label: 'FAQ' },
    { id: 'tarification', label: fr ? 'Tarification' : 'Pricing' },
    { id: 'contact', label: fr ? 'Planifier un appel' : 'Book a call', cta: true },
  ];
 
  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      const scrollY = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fr]);
 
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
 
  const faqs = fr ? [
    { q: "Combien de temps avant de voir des résultats ?", a: "La plupart de nos clients voient une augmentation mesurable de leur engagement dans les 30 premiers jours. Les leads qualifiés arrivent généralement dans les 60-90 premiers jours." },
    { q: "Est-ce que vous gérez tout le contenu ?", a: "Oui. On prend en charge la stratégie, la création de contenu, la production vidéo et la gestion des réseaux sociaux. Votre seul travail est d'approuver." },
    { q: "Comment fonctionne la tarification ?", a: "Notre forfait de base commence à 3 500$/mois. Il inclut 8 vidéos courts formats, la gestion des médias sociaux, la stratégie éditoriale et les rapports mensuels." },
    { q: "Est-ce que vous travaillez avec toutes les industries ?", a: "On se spécialise dans les entreprises B2C high ticket — services premium, immobilier, construction et autres services de valeur élevée." },
    { q: "Qu'est-ce qui est inclus dans le forfait de base ?", a: "8 vidéos courts formats par mois, gestion des réseaux sociaux (Instagram, TikTok, LinkedIn), stratégie éditoriale mensuelle, rapport de performance et réunion mensuelle." },
    { q: "Est-ce que les campagnes Meta Ads sont incluses ?", a: "Non — la gestion des Meta Ads est un service distinct. On peut créer un forfait combiné médias sociaux + publicités pour maximiser vos résultats." },
  ] : [
    { q: "How long before seeing results?", a: "Most of our clients see a measurable increase in engagement within the first 30 days. Qualified leads typically arrive within the first 60-90 days." },
    { q: "Do you manage all the content?", a: "Yes. We handle the strategy, content creation, video production and social media management. Your only job is to approve." },
    { q: "How does pricing work?", a: "Our base plan starts at $3,500/month. It includes 8 short-form videos, social media management, editorial strategy and monthly reports." },
    { q: "Do you work with all industries?", a: "We specialize in B2C high ticket businesses — premium services, real estate, construction and other high-value services." },
    { q: "What's included in the base plan?", a: "8 short-form videos per month, social media management (Instagram, TikTok, LinkedIn), monthly editorial strategy, performance report and monthly meeting." },
    { q: "Are Meta Ads campaigns included?", a: "No — Meta Ads management is a separate service. We can create a combined social media + ads plan to maximize your results." },
  ];
 
  const steps = fr ? [
    { num: '01', title: 'Appel découverte', desc: "On analyse votre business, vos objectifs et votre marché cible. Gratuit et sans engagement." },
    { num: '02', title: 'Stratégie & onboarding', desc: "On construit votre stratégie éditoriale et on configure tous les outils en 2 semaines." },
    { num: '03', title: 'Production de contenu', desc: "Notre équipe produit 8 vidéos courts formats par mois adaptés à votre marque et votre audience." },
    { num: '04', title: 'Publication & optimisation', desc: "Publication cohérente sur tous vos réseaux avec analyse des performances en temps réel." },
    { num: '05', title: 'Rapport & scaling', desc: "Rapport mensuel complet et réunion stratégique pour ajuster et scaler ce qui fonctionne." },
  ] : [
    { num: '01', title: 'Discovery call', desc: "We analyze your business, your goals and your target market. Free and no commitment." },
    { num: '02', title: 'Strategy & onboarding', desc: "We build your editorial strategy and configure all tools in 2 weeks." },
    { num: '03', title: 'Content production', desc: "Our team produces 8 short-form videos per month tailored to your brand and audience." },
    { num: '04', title: 'Publishing & optimization', desc: "Consistent publishing on all your channels with real-time performance analysis." },
    { num: '05', title: 'Report & scaling', desc: "Complete monthly report and strategic meeting to adjust and scale what works." },
  ];
 
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {/* Mini top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(10px)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '52px'
      }}>
        <a href="/" style={{ fontFamily: "'Bebas Neue'", fontSize: '18px', letterSpacing: '0.2em', color: '#fff', textDecoration: 'none' }}>AUCHUMEDIA</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            {['fr', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ fontSize: '9px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', border: 'none', background: lang === l ? 'rgba(255,255,255,0.1)' : 'transparent', color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans'" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo('contact')} style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: '#003DA5', padding: '7px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'DM Sans'", whiteSpace: 'nowrap' }}>
            {fr ? 'Prendre RDV' : 'Book a call'}
          </button>
        </div>
      </div>
 
      {/* ===== STICKY SECTION NAV ===== */}
      <div style={{
        position: 'sticky', top: '52px', zIndex: 400,
        background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(10px)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: '2px', height: '48px',
        overflowX: 'auto', scrollbarWidth: 'none',
        justifyContent: 'center',
      }}>
        {navLinks.map(link => (
          <button key={link.id} onClick={() => scrollTo(link.id)} style={{
            fontSize: '11px', fontWeight: link.cta ? 700 : 600,
            color: link.cta ? '#fff' : activeSection === link.id ? '#fff' : 'rgba(255,255,255,0.4)',
            background: link.cta ? BLUE : 'transparent',
            border: link.cta ? 'none' : 'none',
            padding: link.cta ? '8px 18px' : '8px 14px',
            borderRadius: link.cta ? '4px' : '4px',
            cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: "'DM Sans'",
            borderBottom: !link.cta && activeSection === link.id ? `2px solid ${BLUE}` : '2px solid transparent',
            transition: 'all 0.2s'
          }}>
            {link.label}
          </button>
        ))}
      </div>
 
      {/* ===== HERO ===== */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 80px', position: 'relative', overflow: 'hidden', paddingTop: '104px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 60%, rgba(0,61,165,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <SectionLabel>{fr ? 'Pour les entreprises' : 'For businesses'}</SectionLabel>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(64px, 9vw, 120px)', lineHeight: 0.88, color: '#fff', marginBottom: '24px' }}>
          {fr ? <>PROPULSONS<br />VOTRE<br />CROISSANCE.</> : <>LET'S SCALE<br />YOUR<br />BUSINESS.</>}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(20px, 2.5vw, 30px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: '36px', maxWidth: '600px' }}>
          {fr ? "Du contenu qui convertit. Des leads qui closent." : "Content that converts. Leads that close."}
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,61,165,0.3)', fontFamily: "'DM Sans'" }}>
            {fr ? 'Planifier un appel →' : 'Book a call →'}
          </button>
          <button onClick={() => scrollTo('tarification')} style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', border: '0.5px solid rgba(255,255,255,0.2)', padding: '14px 32px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
            {fr ? 'Voir les tarifs' : 'See pricing'}
          </button>
        </div>
      </section>
 
      {/* ===== ÉTUDES DE CAS ===== */}
      <section id="etudes-de-cas" style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '120px', overflow: 'hidden' }}>
 
        {/* NorCan case study */}
        <div style={{ background: NORCAN_GREEN, padding: '80px 0 60px', margin: '0 -1px', width: 'calc(100% + 2px)' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                    {fr ? 'Étude de cas 1/3' : 'Case study 1/3'}
                  </div>
                  {/* NorCan logo text */}
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>NOR-CAN</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                    {fr ? 'Chauffage & climatisation · Médias sociaux' : 'Heating & cooling · Social media'}
                  </div>
                </div>
                {/* Metrics */}
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[
                    { num: '6M', label: fr ? 'vues' : 'views' },
                    { num: '50K', label: fr ? 'engagements' : 'engagements' },
                    { num: '172', label: fr ? 'vidéos' : 'videos' },
                    { num: '+9K', label: fr ? 'abonnés' : 'followers' },
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
 
          {/* TikTok carousel */}
          <div style={{ padding: '0 20px' }}>
            <TikTokCarousel videos={NORCAN_VIDEOS} />
          </div>
        </div>
 
        {/* SexxxPlus case study */}
        <div style={{ background: SEXXXPLUS_COLOR, padding: '80px 0 60px', borderTop: '0.5px solid rgba(255,255,255,0.07)', margin: '0 -1px', width: 'calc(100% + 2px)' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                    {fr ? 'Étude de cas 2/3' : 'Case study 2/3'}
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>SEXXXPLUS</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                    {fr ? 'Boutique érotique · Médias sociaux' : 'Erotic boutique · Social media'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[
                    { num: '22M', label: fr ? 'vues' : 'views' },
                    { num: '1M', label: fr ? 'engagements' : 'engagements' },
                    { num: '120', label: fr ? 'vidéos' : 'videos' },
                    { num: '+35K', label: fr ? 'abonnés' : 'followers' },
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ padding: '0 20px' }}>
            <TikTokCarousel videos={SEXXXPLUS_VIDEOS} bgColor={SEXXXPLUS_COLOR} />
          </div>
        </div>
 
        {/* Maher case study */}
        <div style={{ background: MAHER_COLOR, padding: '80px 0 60px', borderTop: '0.5px solid rgba(255,255,255,0.07)', margin: '0 -1px', width: 'calc(100% + 2px)' }}>
          <div style={{ padding: '0 60px', marginBottom: '48px' }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                    {fr ? 'Étude de cas 3/3' : 'Case study 3/3'}
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>RAF & STEVE MAHER</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                    {fr ? 'Immobilier · RE/MAX · Médias sociaux' : 'Real estate · RE/MAX · Social media'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[
                    { num: '640K', label: fr ? 'vues' : 'views' },
                    { num: '14K', label: fr ? 'engagements' : 'engagements' },
                    { num: '24', label: fr ? 'vidéos' : 'videos' },
                    { num: '+2K', label: fr ? 'abonnés' : 'followers' },
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '44px', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{m.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ padding: '0 20px' }}>
            <TikTokCarousel videos={MAHER_VIDEOS} bgColor={MAHER_COLOR} />
          </div>
        </div>
      </section>
 
      {/* ===== POURQUOI ===== */}
      <section id="pourquoi" style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '120px' }}>
        <FadeIn>
          <SectionLabel>{fr ? 'Pourquoi AuchuMedia' : 'Why AuchuMedia'}</SectionLabel>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
            {fr ? <>CE QUI NOUS <span style={{ color: BLUE }}>DISTINGUE.</span></> : <>WHAT SETS US <span style={{ color: BLUE }}>APART.</span></>}
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {(fr ? [
            { icon: '🎬', title: "Contenu comme un créateur", desc: "On crée du contenu authentique et engageant — pas de la pub déguisée que personne ne regarde." },
            { icon: '📊', title: "Basé sur la performance", desc: "Chaque décision est basée sur les données. On scale ce qui fonctionne, on arrête ce qui ne fonctionne pas." },
            { icon: '⚡', title: "Résultats rapides", desc: "Onboarding en 2 semaines. Premier contenu publié dans les 14 premiers jours. Résultats visibles en 30 jours." },
            { icon: '🎯', title: "Spécialisés B2C high ticket", desc: "On ne travaille pas avec tout le monde. On se spécialise pour vous donner les meilleurs résultats." },
            { icon: '👥', title: "Équipe dédiée", desc: "Un gestionnaire de compte, un spécialiste contenu, un vidéaste et un expert pub — tout pour vous." },
            { icon: '📈', title: "Croissance organique durable", desc: "On bâtit une audience qui vous appartient — pas juste des chiffres éphémères liés à un budget pub." },
          ] : [
            { icon: '🎬', title: "Content like a creator", desc: "We create authentic and engaging content — not disguised advertising that nobody watches." },
            { icon: '📊', title: "Performance-based", desc: "Every decision is data-driven. We scale what works, we stop what doesn't." },
            { icon: '⚡', title: "Fast results", desc: "Onboarding in 2 weeks. First content published within 14 days. Visible results in 30 days." },
            { icon: '🎯', title: "B2C high ticket specialists", desc: "We don't work with everyone. We specialize to give you the best results." },
            { icon: '👥', title: "Dedicated team", desc: "An account manager, a content specialist, a videographer and an ads expert — all for you." },
            { icon: '📈', title: "Sustainable organic growth", desc: "We build an audience that belongs to you — not just ephemeral numbers tied to an ad budget." },
          ]).map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '28px 24px' }}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
 
      {/* ===== DÉROULEMENT ===== */}
      <section id="deroulement" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '120px' }}>
        <FadeIn>
          <SectionLabel>{fr ? 'Déroulement personnalisé' : 'Our process'}</SectionLabel>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '56px', letterSpacing: '0.02em' }}>
            {fr ? <>COMMENT ON <span style={{ color: BLUE }}>TRAVAILLE.</span></> : <>HOW WE <span style={{ color: BLUE }}>WORK.</span></>}
          </h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', position: 'relative' }}>
                {i < steps.length - 1 && <div style={{ position: 'absolute', left: '27px', top: '44px', bottom: 0, width: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
                <div style={{ paddingTop: '4px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(0,61,165,0.08)', border: '0.5px solid rgba(0,61,165,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: BLUE }}>{step.num}</div>
                </div>
                <div style={{ paddingBottom: '40px', paddingLeft: '20px' }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: '#fff', marginBottom: '6px', letterSpacing: '0.04em' }}>{step.title}</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
 
      {/* ===== TARIFICATION ===== */}
      <section id="tarification" style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '120px' }}>
        <FadeIn>
          <SectionLabel>{fr ? 'Tarification' : 'Pricing'}</SectionLabel>
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
                {(fr ? ['8 vidéos courts formats / mois', 'Gestion Instagram, TikTok & LinkedIn', 'Stratégie éditoriale mensuelle', 'Rapport de performance', 'Réunion mensuelle dédiée', 'Gestionnaire de compte attitré'] : ['8 short-form videos / month', 'Instagram, TikTok & LinkedIn management', 'Monthly editorial strategy', 'Performance report', 'Monthly dedicated meeting', 'Dedicated account manager']).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} style={{ width: '100%', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
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
                {(fr ? ['Tout le forfait de base', 'Gestion Meta Ads & Google Ads', 'Intégration CRM complète', 'Production vidéo longue durée', 'Stratégie multi-plateforme'] : ['Everything in base plan', 'Meta Ads & Google Ads management', 'Full CRM integration', 'Long-form video production', 'Multi-platform strategy']).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} style={{ width: '100%', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.2)', padding: '14px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
                {fr ? 'Nous contacter →' : 'Contact us →'}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
 
      {/* ===== FAQ ===== */}
      <section id="faq" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '120px' }}>
        <FadeIn>
          <SectionLabel>FAQ</SectionLabel>
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
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '0.5px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '16px', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', background: openFaq === i ? BLUE : 'transparent' }}>
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
      <section id="contact" style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <FadeIn direction="left">
            <SectionLabel>{fr ? 'Planifier un appel' : 'Book a call'}</SectionLabel>
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
                  {(fr ? ['Moins de 100K$/an', '100K$ – 500K$/an', '500K$ – 1M$/an', '1M$ et plus'] : ['Less than $100K/yr', '$100K – $500K/yr', '$500K – $1M/yr', '$1M and more']).map(o => <option key={o}>{o}</option>)}
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
        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          div[style*="scrollbarWidth: 'none'"]::-webkit-scrollbar { display: none; }
        }
        div[ref] { scrollbar-width: none; }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
