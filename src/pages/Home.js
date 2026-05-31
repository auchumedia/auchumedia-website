import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLUE = '#003DA5';

// Hook for scroll animations
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

// Animated counter
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// Fade-in wrapper
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const transforms = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)', none: 'none' };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const LOGOS = [
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/0ebd1382-7429-42e1-b0cb-84b3c511ec6d/logo+bataillon.jpeg', alt: 'Le Bataillon' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/bd1f77e7-6c58-4732-a965-fb95a7dc782f/Salvatore+Logo.png', alt: 'Pizza Salvatoré' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/cbc0ce7d-e1cd-491f-8898-f4496d54e254/Fruitz+Logo+%281%29.png', alt: 'Fruitz' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/b2937259-9a96-4131-997f-a8ef527e6403/SexxxPlus+Logo+%281%29.png', alt: 'SexxxPlus' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/fc21f0a0-8010-4445-abfe-f97ae6ca1c4f/National+Logo.png', alt: 'National' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/cf6e8e1b-77b6-4378-81a1-95004704e70c/Nor-Can+Logo.png', alt: 'Nor-Can' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/702ed450-2dcb-4e94-aa58-5a71a2337586/Recao+logo.png', alt: 'Recao' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/6516ce2d-543f-43ff-9dbf-3e518282e4d5/Goconsigne+Logo.png', alt: 'GoConsigne' },
  { src: 'https://images.squarespace-cdn.com/content/v1/664d3763786881229ae36f6c/c763cd71-966b-4d3d-8b60-fe6d42f32032/R.lefevbre+Logo.png', alt: 'R. Lefebvre' },
];

export default function Home() {
  const [lang, setLang] = useState('fr');
  const [heroVisible, setHeroVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const fr = lang === 'fr';

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const cards = fr ? [
    { title: 'Attirer des partenariats premium', desc: "Les marques veulent une image forte — pas juste un nom sur un chandail." },
    { title: 'Bâtir une communauté fidèle', desc: "Une audience engagée vous suit dans les hauts, les bas, et au-delà du sport." },
    { title: 'Diversifier vos revenus', desc: "Collaborations, contenu monétisé — la glace n'est plus votre seule scène." },
    { title: "Préparer l'après-carrière", desc: "Restez visible et pertinent longtemps après avoir raccroché les patins." },
  ] : [
    { title: 'Attract premium partnerships', desc: "Brands want a strong image — not just a name on a jersey." },
    { title: 'Build a loyal community', desc: "An engaged audience follows you through the highs, lows, and beyond sports." },
    { title: 'Diversify your income', desc: "Collaborations, monetized content — the ice is no longer your only stage." },
    { title: 'Prepare for post-career', desc: "Stay visible and relevant long after hanging up your skates." },
  ];

  const projects = [
    { cat: 'Hockey · Always-On', name: 'Le Bataillon LNAH', meta: fr ? 'Médias sociaux · Stratégie' : 'Social media · Strategy', stat: '+1M', statColor: '#fff' },
    { cat: fr ? 'Production · Web série' : 'Production · Web series', name: 'NorCan — Au cœur du confort', meta: fr ? 'Série premium · YouTube' : 'Premium series · YouTube', stat: fr ? 'SÉRIE LANCÉE' : 'LAUNCHED', statColor: BLUE },
    { cat: 'Always-On · Contenu', name: 'SexxxPlus', meta: fr ? 'Stratégie · Médias sociaux' : 'Strategy · Social media', stat: '+20M', statColor: BLUE },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        {/* BG image full bleed */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(https://images.squarespace-cdn.com/content/664d3763786881229ae36f6c/d2f0e30d-1577-4c56-9a8a-5cd8111a4777/bdfd0b36-20a9-496e-aa89-b5951701ed46+2.JPG?content-type=image%2Fjpeg)`,
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          filter: 'brightness(0.35)',
          transform: 'scale(1.05)',
          transition: 'transform 8s ease'
        }} />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.1) 100%)' }} />
        {/* Blue accent glow */}
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 60px 80px' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
          }}>
            <div style={{ width: '26px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>
              {fr ? 'Agence de référence · Sport · Marketing' : 'Reference agency · Sport · Marketing'}
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Bebas Neue'", fontSize: 'clamp(64px, 9vw, 120px)', lineHeight: 0.88,
            color: '#fff', marginBottom: '24px', letterSpacing: '0.01em',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(40px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
          }}>
            {fr ? <>NOUS PROPULSONS<br /><span style={{ color: 'rgba(255,255,255,0.9)' }}>ATHLÈTES & MARQUES</span></> : <>WE ELEVATE<br /><span style={{ color: 'rgba(255,255,255,0.9)' }}>ATHLETES & BRANDS</span></>}
          </h1>

          {/* H2 */}
          <p style={{
            fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(22px, 3vw, 40px)',
            fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.05em', marginBottom: '40px',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s'
          }}>
            {fr ? 'au sommet de leur image.' : 'to the top of their image.'}
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '12px', flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s'
          }}>
            <Link to="/athletes#form" style={{
              fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE,
              padding: '15px 36px', borderRadius: '4px', letterSpacing: '0.1em',
              textTransform: 'uppercase', display: 'inline-block',
              boxShadow: `0 0 30px rgba(0,61,165,0.4)`
            }}>
              {fr ? 'Prendre RDV →' : 'Book a call →'}
            </Link>
            <Link to="/projets" style={{
              fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.7)',
              border: '0.5px solid rgba(255,255,255,0.3)', padding: '15px 36px',
              borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em',
              display: 'inline-block', backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.05)'
            }}>
              {fr ? 'Voir nos projets' : 'See our projects'}
            </Link>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', right: '60px', bottom: '80px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            opacity: heroVisible ? 0.4 : 0, transition: 'opacity 1s ease 1.2s'
          }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', writingMode: 'vertical-rl' }}>SCROLL</span>
            <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #fff, transparent)', animation: 'scrollLine 2s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Bottom info bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          borderTop: '0.5px solid rgba(255,255,255,0.1)',
          display: 'flex', zIndex: 2,
          opacity: heroVisible ? 1 : 0, transition: 'opacity 1s ease 1s'
        }}>
          {[
            { num: '50M+', label: fr ? 'Vues générées' : 'Views generated' },
            { num: '6 ANS', label: fr ? "D'expérience" : 'Of experience' },
            { num: '20+', label: fr ? 'Clients & athlètes' : 'Clients & athletes' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '16px 24px', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.1)' : 'none', backdropFilter: 'blur(10px)', background: 'rgba(8,8,8,0.6)' }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', color: '#fff', letterSpacing: '0.05em' }}>{s.num}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TICKER ===== */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '0.5px solid rgba(255,255,255,0.08)', padding: '18px 0', background: '#080808' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #080808, transparent)', zIndex: 1 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #080808, transparent)', zIndex: 1 }} />
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 30s linear infinite' }}>
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt} style={{ height: '32px', width: 'auto', maxWidth: '110px', objectFit: 'contain', margin: '0 44px', opacity: 0.35, filter: 'brightness(0) invert(1)', transition: 'opacity 0.3s' }} onMouseEnter={e => e.target.style.opacity = 0.7} onMouseLeave={e => e.target.style.opacity = 0.35} />
          ))}
        </div>
      </div>

      {/* ===== WHY / CE QU'ON BÂTIT ===== */}
      <section style={{ padding: '100px 60px', background: '#080808', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <FadeIn>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            {fr ? "Ce qu'on bâtit pour nos athlètes" : "What we build for our athletes"}
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <FadeIn direction="left">
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '24px', color: '#fff' }}>
              {fr ? <>LE PERSONAL BRANDING,<br />C'EST TA <span style={{ color: BLUE }}>DEUXIÈME CARRIÈRE.</span></> : <>PERSONAL BRANDING<br />IS YOUR <span style={{ color: BLUE }}>SECOND CAREER.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: '24px', fontWeight: 300 }}>
              {fr ? "Dans le monde du hockey, cette pratique est encore trop peu exploitée. Pourtant, bâtir une image forte peut avoir un impact énorme sur la valeur perçue d'un athlète — avant et après le sport." : "In the world of hockey, this practice is still far too underutilized. Yet building a strong image can have an enormous impact on an athlete's perceived value — before and after sports."}
            </p>
            <blockquote style={{ fontFamily: "'Cormorant Garamond'", fontSize: '17px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.8)', borderLeft: `2px solid ${BLUE}`, paddingLeft: '20px', lineHeight: 1.75 }}>
              {fr ? "Les athlètes qui marquent vraiment l'histoire sont ceux qui bâtissent une image solide et stratégique — sur et en dehors du sport." : "The athletes who truly make history are those who build a solid and strategic image — on and off the field."}
            </blockquote>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cards.map((card, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="right">
                <div style={{
                  background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px', padding: '20px 22px', display: 'flex', gap: '16px',
                  cursor: 'default', transition: 'border-color 0.3s, background 0.3s',
                  borderColor: hoveredCard === i ? `rgba(0,61,165,0.4)` : 'rgba(255,255,255,0.07)',
                  background: hoveredCard === i ? '#121212' : '#0d0d0d'
                }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: `rgba(0,61,165,${hoveredCard === i ? '0.6' : '0.3'})`, lineHeight: 1, minWidth: '30px', transition: 'color 0.3s' }}>{String(i+1).padStart(2,'0')}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '5px', color: '#fff' }}>{card.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontWeight: 300 }}>{card.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '0.5px solid rgba(255,255,255,0.08)', background: '#0a0a0a' }}>
        {[
          { end: 50, suffix: 'M+', label: fr ? 'Vues générées' : 'Views generated', color: '#fff' },
          { end: 6, suffix: fr ? ' ANS' : ' YRS', label: fr ? "D'expérience" : 'Of experience', color: BLUE },
          { end: 20, suffix: '+', label: fr ? 'Clients & athlètes' : 'Clients & athletes', color: '#fff' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '48px 0', textAlign: 'center', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: '52px', lineHeight: 1, marginBottom: '8px' }}>
              <span style={{ color: s.color }}>
                <Counter end={s.end} suffix={s.suffix} />
              </span>
            </div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ===== NOS ATHLÈTES / PROJETS ===== */}
      <section style={{ padding: '100px 60px', background: '#080808' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '1px', background: BLUE }} />
                {fr ? 'Nos projets' : 'Our projects'}
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff', letterSpacing: '0.02em' }}>
                {fr ? <>ILS NOUS ONT <span style={{ color: BLUE }}>FAIT CONFIANCE.</span></> : <>THEY <span style={{ color: BLUE }}>TRUSTED US.</span></>}
              </h2>
            </div>
            <Link to="/projets" style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', border: '0.5px solid rgba(255,255,255,0.15)', padding: '10px 20px', borderRadius: '4px', transition: 'all 0.2s' }}>
              {fr ? 'Voir tout →' : 'See all →'}
            </Link>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <Link to="/projets" style={{ display: 'block', position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', transition: 'transform 0.3s, border-color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `rgba(0,61,165,0.4)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <div style={{ height: '200px', background: i % 2 === 0 ? 'linear-gradient(135deg, #080f1c, #0d1428)' : 'linear-gradient(135deg, #0d0d0d, #151515)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: '100px', color: 'rgba(255,255,255,0.04)', position: 'absolute', userSelect: 'none' }}>0{i+1}</span>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,61,165,0.12)', border: `1px solid rgba(0,61,165,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, backdropFilter: 'blur(10px)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  {/* Glow effect */}
                  <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,61,165,0.2)', filter: 'blur(20px)' }} />
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: BLUE, marginBottom: '8px' }}>{p.cat}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '14px' }}>{p.meta}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: p.statColor, letterSpacing: '0.05em' }}>{p.stat}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== FONDATEUR ===== */}
      <section style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.08)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', alignItems: 'center', maxWidth: '1000px' }}>
          <FadeIn direction="left">
            <div style={{ position: 'relative' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', border: `2px solid rgba(0,61,165,0.3)`, boxShadow: `0 0 40px rgba(0,61,165,0.15)` }}>
                <img src="https://images.squarespace-cdn.com/content/664d3763786881229ae36f6c/4823b37b-5f7b-4096-893f-901fd8e735d3/A7506428+2.JPG?content-type=image%2Fjpeg" alt="Raphaël Auchu" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
              </div>
              {/* Blue dot accent */}
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '20px', height: '20px', borderRadius: '50%', background: BLUE, border: '3px solid #0a0a0a' }} />
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '1px', background: BLUE }} />
                {fr ? 'Fondateur' : 'Founder'}
              </div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '40px', letterSpacing: '0.06em', color: '#fff', marginBottom: '6px' }}>RAPHAËL AUCHU</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginBottom: '24px', textTransform: 'uppercase' }}>
                {fr ? 'Brand Builder · Ancien gardien repêché LHJMQ' : 'Brand Builder · Former QMJHL drafted goaltender'}
              </div>
              <blockquote style={{ fontFamily: "'Cormorant Garamond'", fontSize: '17px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.8)', borderLeft: `2px solid ${BLUE}`, paddingLeft: '20px', lineHeight: 1.85 }}>
                {fr ? "J'ai grandi dans le hockey de haut niveau. J'ai vu de l'intérieur ce que ça coûte de ne pas investir dans son image. Aujourd'hui, j'aide les athlètes à bâtir ce que j'aurais voulu avoir — une marque forte, influente, qui dure bien au-delà de la carrière." : "I grew up in high-level hockey. I saw firsthand what it costs not to invest in your image. Today, I help athletes build what I would have wanted — a strong, influential brand that lasts well beyond the career."}
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== B2C ===== */}
      <div style={{ padding: '24px 60px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
          <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{fr ? 'Vous êtes une entreprise ?' : 'Are you a business?'}</strong>{' '}
          {fr ? 'On offre aussi des services de médias sociaux, Meta Ads et CRM pour les marques B2C ambitieuses.' : 'We also offer social media, Meta Ads and CRM services for ambitious B2C brands.'}
        </p>
        <Link to="/entreprises" style={{ fontSize: '10px', fontWeight: 700, color: BLUE, border: `0.5px solid rgba(0,61,165,0.35)`, padding: '9px 20px', borderRadius: '4px', whiteSpace: 'nowrap', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {fr ? 'Services entreprises →' : 'Business services →'}
        </Link>
      </div>

      {/* ===== CTA ===== */}
      <section style={{ padding: '120px 60px', textAlign: 'center', background: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, rgba(0,61,165,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 7vw, 88px)', letterSpacing: '0.03em', lineHeight: 0.93, marginBottom: '40px', color: '#fff', position: 'relative' }}>
            {fr ? <>PRÊT À BÂTIR<br />TA MARQUE ?</> : <>READY TO BUILD<br />YOUR BRAND?</>}
          </h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/athletes#form" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '16px 40px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: `0 0 40px rgba(0,61,165,0.35)` }}>
              {fr ? 'Prendre RDV' : 'Book a call'}
            </Link>
            <Link to="/projets" style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', border: '0.5px solid rgba(255,255,255,0.2)', padding: '16px 40px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {fr ? 'Voir nos projets' : 'See our projects'}
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scrollLine { 0%, 100% { opacity: 1; transform: scaleY(1); transform-origin: top; } 50% { opacity: 0.3; } }
        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          div[style*="grid-template-columns: 1fr 1fr"], div[style*="grid-template-columns: 1fr 2fr"], div[style*="gridTemplateColumns: '1fr 1fr'"], div[style*="gridTemplateColumns: '1fr 2fr'"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(3, 260px) !important; overflow-x: auto !important; gap: 10px !important; }
          h1[style*="clamp(64px"] { font-size: clamp(52px, 12vw, 80px) !important; }
          div[style*="padding: 24px 60px"] { padding: 18px 20px !important; flex-direction: column !important; align-items: flex-start !important; }
          footer { padding: 20px !important; flex-direction: column !important; gap: 8px !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
