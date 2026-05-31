
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
 
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
 
// Elegant image placeholder
function ImgPlaceholder({ label, aspect = '16/9', icon = 'camera' }) {
  const icons = {
    camera: <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>,
    video: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
    person: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
  };
  return (
    <div style={{
      width: '100%', aspectRatio: aspect,
      background: 'linear-gradient(135deg, #0d0d0d 0%, #111 50%, #0a0a0a 100%)',
      border: '0.5px solid rgba(255,255,255,0.07)',
      borderRadius: '12px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '12px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Corner accents */}
      {['tl','tr','bl','br'].map(c => (
        <div key={c} style={{
          position: 'absolute',
          top: c.includes('t') ? '12px' : 'auto', bottom: c.includes('b') ? '12px' : 'auto',
          left: c.includes('l') ? '12px' : 'auto', right: c.includes('r') ? '12px' : 'auto',
          width: '14px', height: '14px',
          borderTop: c.includes('t') ? `1px solid rgba(0,61,165,0.3)` : 'none',
          borderBottom: c.includes('b') ? `1px solid rgba(0,61,165,0.3)` : 'none',
          borderLeft: c.includes('l') ? `1px solid rgba(0,61,165,0.3)` : 'none',
          borderRight: c.includes('r') ? `1px solid rgba(0,61,165,0.3)` : 'none',
        }} />
      ))}
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Glow */}
      <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(0,61,165,0.06)', filter: 'blur(30px)' }} />
      {/* Icon */}
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,61,165,0.08)', border: '0.5px solid rgba(0,61,165,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,61,165,0.7)" strokeWidth="1.5" strokeLinecap="round">{icons[icon]}</svg>
      </div>
      {label && <span style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', position: 'relative' }}>{label}</span>}
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
  const fr = lang === 'fr';
 
  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);
 
  return (
    <div style={{ background: '#080808', minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav lang={lang} onLangChange={setLang} />
 
      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(https://images.squarespace-cdn.com/content/664d3763786881229ae36f6c/d2f0e30d-1577-4c56-9a8a-5cd8111a4777/bdfd0b36-20a9-496e-aa89-b5951701ed46+2.JPG?content-type=image%2Fjpeg)`, backgroundSize: 'cover', backgroundPosition: 'center 30%', filter: 'brightness(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.1) 100%)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
 
        <div style={{ position: 'relative', zIndex: 2, padding: '0 60px 100px' }}>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '26px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>
              {fr ? 'Agence de référence · Sport · Marketing' : 'Reference agency · Sport · Marketing'}
            </span>
          </div>
 
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(64px, 9vw, 116px)', lineHeight: 0.88, color: '#fff', marginBottom: '28px', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(40px)', transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s' }}>
            {fr ? <>NOUS PROPULSONS<br />ATHLÈTES & MARQUES</> : <>WE ELEVATE<br />ATHLETES & BRANDS</>}
          </h1>
 
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s' }}>
            <Link to="/athletes" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 0 30px rgba(0,61,165,0.35)' }}>
              {fr ? 'Pour les athlètes →' : 'For athletes →'}
            </Link>
            <Link to="/entreprises" style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.25)', padding: '14px 32px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
              {fr ? 'Pour les entreprises →' : 'For businesses →'}
            </Link>
          </div>
        </div>
 
      </section>
 
 
      {/* ===== SECTION ATHLÈTES ===== */}
      <section style={{ padding: '120px 60px', background: '#080808', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left — images */}
          <FadeIn direction="left">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <ImgPlaceholder label={fr ? 'Athlète en action' : 'Athlete in action'} aspect="16/9" icon="person" />
              </div>
              <ImgPlaceholder label={fr ? 'Tournage' : 'Shooting'} aspect="1/1" icon="video" />
              <ImgPlaceholder label={fr ? 'Partenariat' : 'Partnership'} aspect="1/1" icon="trophy" />
            </div>
          </FadeIn>
 
          {/* Right — text */}
          <FadeIn direction="right">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Pour les athlètes' : 'For athletes'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 0.95, color: '#fff', marginBottom: '20px', letterSpacing: '0.02em' }}>
              {fr ? <>RAYONNE<br />AU-DELÀ<br /><span style={{ color: BLUE }}>DE TON SPORT.</span></> : <>RISE ABOVE<br /><span style={{ color: BLUE }}>YOUR SPORT.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '32px', fontWeight: 300, maxWidth: '420px' }}>
              {fr ? "Personal branding, partnerships et production vidéo — on bâtit la marque des athlètes qui dominent." : "Personal branding, partnerships and video production — we build the brand of athletes who dominate."}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
              {(fr ? ['Personal branding & Production vidéo', 'Partnerships & Commandites', 'Transition post-carrière'] : ['Personal branding & Video production', 'Partnerships & Sponsorships', 'Post-career transition']).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/athletes" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '13px 28px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {fr ? 'Découvrir →' : 'Discover →'}
            </Link>
          </FadeIn>
        </div>
      </section>
 
      {/* ===== SECTION ENTREPRISES ===== */}
      <section style={{ padding: '120px 60px', background: '#0a0a0a', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left — text */}
          <FadeIn direction="left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Pour les entreprises' : 'For businesses'}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 0.95, color: '#fff', marginBottom: '20px', letterSpacing: '0.02em' }}>
              {fr ? <>PROPULSONS<br />VOTRE<br /><span style={{ color: BLUE }}>CROISSANCE.</span></> : <>LET'S SCALE<br /><span style={{ color: BLUE }}>YOUR BUSINESS.</span></>}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '32px', fontWeight: 300, maxWidth: '420px' }}>
              {fr ? "Médias sociaux, Meta Ads et CRM — on transforme votre présence en ligne en machine à générer des leads qualifiés." : "Social media, Meta Ads and CRM — we transform your online presence into a qualified lead generation machine."}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
              {(fr ? ['Médias sociaux / Always-On', 'Meta Ads · Acquisition client', 'CRM & Pipeline'] : ['Social media / Always-On', 'Meta Ads · Client acquisition', 'CRM & Pipeline']).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/entreprises" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '13px 28px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {fr ? 'Découvrir →' : 'Discover →'}
            </Link>
          </FadeIn>
 
          {/* Right — images */}
          <FadeIn direction="right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <ImgPlaceholder label={fr ? 'Campagne' : 'Campaign'} aspect="1/1" icon="video" />
              <ImgPlaceholder label="Meta Ads" aspect="1/1" icon="trophy" />
              <div style={{ gridColumn: '1 / -1' }}>
                <ImgPlaceholder label={fr ? 'Résultats' : 'Results'} aspect="16/9" icon="camera" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
 
      {/* ===== STATS ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '0.5px solid rgba(255,255,255,0.07)', background: '#080808' }}>
        {[
          { end: 50, suffix: 'M+', label: fr ? 'Vues générées' : 'Views generated' },
          { end: 6, suffix: fr ? ' ANS' : ' YRS', label: fr ? "D'expérience" : 'Of experience', color: BLUE },
          { end: 20, suffix: '+', label: fr ? 'Clients & athlètes' : 'Clients & athletes' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '56px 0', textAlign: 'center', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.07)' : 'none' }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: '56px', lineHeight: 1, marginBottom: '8px', color: s.color || '#fff' }}>
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>
 
      {/* ===== PROJETS ===== */}
      <section style={{ padding: '100px 60px', background: '#080808', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '20px', height: '1px', background: BLUE }} />
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Nos projets' : 'Our projects'}</span>
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
                {fr ? <>ILS NOUS ONT <span style={{ color: BLUE }}>FAIT CONFIANCE.</span></> : <>THEY <span style={{ color: BLUE }}>TRUSTED US.</span></>}
              </h2>
            </div>
            <Link to="/projets" style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', border: '0.5px solid rgba(255,255,255,0.12)', padding: '10px 20px', borderRadius: '4px' }}>
              {fr ? 'Voir tout →' : 'See all →'}
            </Link>
          </div>
        </FadeIn>
 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { cat: 'Hockey · Always-On', name: 'Le Bataillon LNAH', stat: '+1M', color: '#fff' },
            { cat: fr ? 'Production · Web série' : 'Production · Web series', name: 'NorCan', stat: fr ? 'SÉRIE LANCÉE' : 'LAUNCHED', color: BLUE },
            { cat: 'Always-On', name: 'SexxxPlus', stat: '+20M', color: BLUE },
          ].map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Link to="/projets" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', transition: 'transform 0.3s, border-color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(0,61,165,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <ImgPlaceholder label={p.name} aspect="4/3" icon={i === 1 ? 'video' : 'person'} />
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: BLUE, marginBottom: '6px' }}>{p.cat}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{p.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', color: p.color, letterSpacing: '0.05em' }}>{p.stat}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
 
      {/* ===== CTA ===== */}
      <section style={{ padding: '120px 60px', textAlign: 'center', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 7vw, 88px)', letterSpacing: '0.03em', lineHeight: 0.93, marginBottom: '16px', color: '#fff' }}>
            {fr ? <>PRÊT À BÂTIR<br />TA MARQUE ?</> : <>READY TO BUILD<br />YOUR BRAND?</>}
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: '20px', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', marginBottom: '40px' }}>
            {fr ? 'Athlète ou entreprise — on a la solution.' : 'Athlete or business — we have the solution.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/athletes#form" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '15px 36px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 0 40px rgba(0,61,165,0.3)' }}>
              {fr ? 'Prendre RDV' : 'Book a call'}
            </Link>
            <Link to="/projets" style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', border: '0.5px solid rgba(255,255,255,0.15)', padding: '15px 36px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {fr ? 'Voir nos projets' : 'See our projects'}
            </Link>
          </div>
        </FadeIn>
      </section>
 
      <Footer />
 
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(3, 260px) !important; overflow-x: auto !important; }
          h1 { font-size: clamp(52px, 12vw, 80px) !important; }
          footer { padding: 20px !important; flex-direction: column !important; gap: 8px !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
 
