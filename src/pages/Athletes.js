
import React, { useState, useRef, useEffect } from 'react';
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
 
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const t = { up: 'translateY(30px)', left: 'translateX(-30px)', right: 'translateX(30px)', none: 'none' };
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : t[direction], transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>;
}
 
const navLinks = [
  { id: 'etudes-de-cas', labelFr: 'Études de cas', labelEn: 'Case studies' },
  { id: 'pourquoi', labelFr: 'Pourquoi AuchuMedia', labelEn: 'Why AuchuMedia' },
  { id: 'deroulement', labelFr: 'Déroulement', labelEn: 'Process' },
  { id: 'faq', labelFr: 'FAQ', labelEn: 'FAQ' },
  { id: 'tarification', labelFr: 'Tarification', labelEn: 'Pricing' },
];
 
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
    { num: '01', title: 'Appel découverte', desc: "On apprend à te connaître — ton histoire, tes objectifs, ta personnalité. Gratuit et sans engagement." },
    { num: '02', title: 'Audit & stratégie', desc: "On analyse ta présence actuelle et on construit une stratégie sur mesure alignée avec tes objectifs." },
    { num: '03', title: 'Création de contenu', desc: "Tournages, production vidéo, stratégie éditoriale — on crée du contenu qui te ressemble vraiment." },
    { num: '04', title: 'Publication & croissance', desc: "On publie de façon cohérente et on optimise en continu pour maximiser ta portée et ton engagement." },
    { num: '05', title: 'Partnerships', desc: "Une fois ton image solide, on identifie et approche les marques qui correspondent à ton identité." },
  ] : [
    { num: '01', title: 'Discovery call', desc: "We get to know you — your story, your goals, your personality. Free and no commitment." },
    { num: '02', title: 'Audit & strategy', desc: "We analyze your current presence and build a custom strategy aligned with your goals." },
    { num: '03', title: 'Content creation', desc: "Shoots, video production, editorial strategy — we create content that truly looks like you." },
    { num: '04', title: 'Publishing & growth', desc: "We publish consistently and optimize continuously to maximize your reach and engagement." },
    { num: '05', title: 'Partnerships', desc: "Once your image is solid, we identify and approach brands that match your identity." },
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
        <a href="/" style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', letterSpacing: '0.2em', color: '#fff', textDecoration: 'none', flexShrink: 0 }}>AUCHUMEDIA</a>
 
        {/* Section links center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none' }}>
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
 
        {/* Right — entreprises + CTA + lang */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
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
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 60px 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(0,61,165,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
 
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 7.5vw, 100px)', lineHeight: 0.93, color: '#fff', marginBottom: '28px', letterSpacing: '0.01em' }}>
            {fr ? 'RAYONNE AU-DELÀ\nDE TON SPORT.' : 'RISE ABOVE\nYOUR SPORT.'}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px', fontWeight: 300 }}>
            {fr ? "On bâtit la marque des athlètes qui dominent. Personal branding, partnerships et production vidéo — tout pour que tu deviennes la référence dans ton sport." : "We build the brand of athletes who dominate. Personal branding, partnerships and video production — everything to make you the reference in your sport."}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('contact')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,61,165,0.3)', fontFamily: "'DM Sans'" }}>
              {fr ? 'Prendre RDV →' : 'Book a call →'}
            </button>
            <button onClick={() => scrollTo('etudes-de-cas')} style={{ fontSize: '11px', fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 32px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
              {fr ? 'Voir les résultats' : 'See results'}
            </button>
          </div>
        </div>
      </section>
 
 
      {/* ===== SERVICES CLÉ EN MAIN ===== */}
      <section style={{ padding: '80px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Notre offre' : 'Our offer'}</span>
              <div style={{ width: '20px', height: '1px', background: BLUE }} />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff', letterSpacing: '0.02em' }}>
              {fr ? <>UN SERVICE <span style={{ color: BLUE }}>CLÉ EN MAIN.</span></> : <>A <span style={{ color: BLUE }}>TURNKEY SERVICE.</span></>}
            </h2>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
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
              <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '28px 24px', transition: 'border-color 0.2s' }}
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
      <section id="etudes-de-cas" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Études de cas · Résultats' : 'Case studies · Results'}</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
            {fr ? <>ILS NOUS ONT <span style={{ color: BLUE }}>FAIT CONFIANCE.</span></> : <>THEY <span style={{ color: BLUE }}>TRUSTED US.</span></>}
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { name: 'Le Bataillon LNAH', cat: 'Hockey · LNAH · Always-On', result: '+1M', label: fr ? 'vues générées' : 'views generated', desc: fr ? "Stratégie de contenu complète et gestion des médias sociaux pour l'équipe de hockey du Bataillon." : "Complete content strategy and social media management for the Bataillon hockey team." },
            { name: 'NorCan — Web série', cat: fr ? 'Production · Web série' : 'Production · Web series', result: fr ? 'LANCÉE' : 'LAUNCHED', label: fr ? 'série YouTube' : 'YouTube series', desc: fr ? "Production d'une web série premium mettant en valeur l'expertise et la culture de NorCan." : "Production of a premium web series showcasing NorCan's expertise and culture." },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ height: '200px', background: i === 0 ? 'linear-gradient(135deg, #080f1c, #0d1428)' : 'linear-gradient(135deg, #1a3a2a, #0d2018)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: '100px', color: 'rgba(255,255,255,0.04)', position: 'absolute' }}>0{i+1}</span>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '9px', color: BLUE, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>{c.cat}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{c.name}</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: '16px', fontWeight: 300 }}>{c.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontFamily: "'Bebas Neue'", fontSize: '32px', color: BLUE, letterSpacing: '0.05em' }}>{c.result}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{c.label}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
 
      {/* ===== POURQUOI ===== */}
      <section id="pourquoi" style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Pourquoi AuchuMedia' : 'Why AuchuMedia'}</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
            {fr ? <>CE QUI NOUS <span style={{ color: BLUE }}>DISTINGUE.</span></> : <>WHAT SETS US <span style={{ color: BLUE }}>APART.</span></>}
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {(fr ? [
            { icon: '🏒', title: "Fondé par un athlète", desc: "Raphaël a joué au hockey de haut niveau. On comprend le sport de l'intérieur — pas juste en théorie." },
            { icon: '🎯', title: "Stratégie sur mesure", desc: "Pas de template générique. Chaque stratégie est construite autour de ton identité et tes objectifs." },
            { icon: '🎬', title: "Production premium", desc: "On produit du contenu cinématographique qui se démarque — pas des vidéos iPhone avec un filtre." },
            { icon: '📈', title: "Résultats mesurables", desc: "50M+ vues générées. On ne travaille pas pour les likes — on travaille pour ta croissance réelle." },
            { icon: '🤝', title: "Accès aux marques", desc: "Notre réseau de marques et partenaires te donne accès à des deals que tu n'aurais pas seul." },
            { icon: '⚡', title: "Équipe dédiée", desc: "Un gestionnaire attitré, une équipe de production, un spécialiste des partenariats — tout pour toi." },
          ] : [
            { icon: '🏒', title: "Founded by an athlete", desc: "Raphaël played high-level hockey. We understand sports from the inside — not just in theory." },
            { icon: '🎯', title: "Custom strategy", desc: "No generic templates. Every strategy is built around your identity and your goals." },
            { icon: '🎬', title: "Premium production", desc: "We produce cinematic content that stands out — not iPhone videos with a filter." },
            { icon: '📈', title: "Measurable results", desc: "50M+ views generated. We don't work for likes — we work for your real growth." },
            { icon: '🤝', title: "Brand access", desc: "Our network of brands and partners gives you access to deals you wouldn't get alone." },
            { icon: '⚡', title: "Dedicated team", desc: "A dedicated manager, a production team, a partnership specialist — everything for you." },
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
      <section id="deroulement" style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Déroulement personnalisé' : 'Our process'}</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '56px', letterSpacing: '0.02em' }}>
            {fr ? <>COMMENT ON <span style={{ color: BLUE }}>TRAVAILLE.</span></> : <>HOW WE <span style={{ color: BLUE }}>WORK.</span></>}
          </h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '700px' }}>
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
      <section id="tarification" style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', scrollMarginTop: '64px' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Tarification' : 'Pricing'}</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
            {fr ? <>UNE OFFRE <span style={{ color: BLUE }}>SUR MESURE.</span></> : <>A CUSTOM <span style={{ color: BLUE }}>OFFER.</span></>}
          </h2>
        </FadeIn>
        <FadeIn>
          <div style={{ maxWidth: '520px', background: '#0d0d0d', border: `1px solid rgba(0,61,165,0.25)`, borderRadius: '16px', padding: '48px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(0,61,165,0.06)', filter: 'blur(40px)' }} />
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '20px' }}>{fr ? 'Athlètes · Toutes ligues' : 'Athletes · All leagues'}</div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: '56px', color: '#fff', letterSpacing: '0.02em', marginBottom: '8px' }}>{fr ? 'SUR DEMANDE' : 'ON REQUEST'}</div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '32px', fontWeight: 300 }}>
              {fr ? "Chaque athlète est unique — ton offre l'est aussi. On construit une solution adaptée à ton niveau, tes objectifs et tes ressources." : "Every athlete is unique — your offer is too. We build a solution tailored to your level, your goals and your resources."}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              {(fr ? ['Personal branding & stratégie de contenu', 'Production vidéo (courts & longs formats)', 'Gestion des réseaux sociaux', 'Développement de partnerships', 'Rapport mensuel & suivi'] : ['Personal branding & content strategy', 'Video production (short & long format)', 'Social media management', 'Partnership development', 'Monthly report & follow-up']).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo('contact')} style={{ display: 'inline-flex', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans'" }}>
              {fr ? 'Obtenir mon offre →' : 'Get my offer →'}
            </button>
          </div>
        </FadeIn>
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
            <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '36px 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                {[fr ? 'Prénom' : 'First name', fr ? 'Nom' : 'Last name'].map(l => (
                  <div key={l}>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{l}</label>
                    <input type="text" style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
                  </div>
                ))}
              </div>
              {[{ label: 'Email', type: 'email' }].map(f => (
                <div key={f.label} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{f.label}</label>
                  <input type={f.type} style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
                </div>
              ))}
              <div style={{ marginBottom: '14px', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>Instagram</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>@</span>
                  <input type="text" style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px 11px 28px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{fr ? 'Ton sport' : 'Your sport'}</label>
                <select style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", appearance: 'none', cursor: 'pointer' }}>
                  <option value="">{fr ? 'Sélectionne ton sport' : 'Select your sport'}</option>
                  {['Hockey', 'Football', 'Basketball', 'Baseball', fr ? 'Autres' : 'Others'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '7px' }}>{fr ? 'Ton projet (optionnel)' : 'Your project (optional)'}</label>
                <textarea placeholder={fr ? 'Dis-nous en plus...' : 'Tell us more...'} style={{ width: '100%', background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", resize: 'vertical', minHeight: '90px' }} />
              </div>
              <button style={{ width: '100%', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontFamily: "'DM Sans'" }}>
                {fr ? 'Envoyer ma demande →' : 'Send my request →'}
              </button>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '10px' }}>{fr ? 'Réponse dans les 48h.' : 'Response within 48h.'}</p>
            </div>
          </FadeIn>
        </div>
      </section>
 
      <Footer />
 
      <style>{`
        .hamburger-btn { display: flex !important; }
        @media (max-width: 768px) {
          nav { padding: 0 20px !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:last-child > *:not(.hamburger-btn) { display: none !important; }
          nav > div:last-child { gap: 8px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
