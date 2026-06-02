
import React, { useState, useRef, useEffect } from 'react';
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
 
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const t = { up: 'translateY(30px)', left: 'translateX(-30px)', right: 'translateX(30px)', none: 'none' };
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : t[direction], transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>;
}
 
function AvatarPlaceholder({ initials, size = 120 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'linear-gradient(135deg, #0d0d0d, #141414)', border: `1px solid rgba(0,61,165,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
      <span style={{ fontFamily: "'Bebas Neue'", fontSize: size * 0.3, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{initials}</span>
      <div style={{ position: 'absolute', bottom: size * 0.04, right: size * 0.04, width: size * 0.18, height: size * 0.18, borderRadius: '50%', background: BLUE, border: `${size * 0.025}px solid #080808` }} />
    </div>
  );
}
 
const SectionLabel = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
    <div style={{ width: '20px', height: '1px', background: BLUE }} />
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE }}>{children}</span>
  </div>
);
 
export default function APropos() {
  const [lang, setLang] = useState('fr');
  const fr = lang === 'fr';
 
  const team = [
    {
      initials: 'RA',
      name: 'Raphaël Auchu',
      role: fr ? 'Fondateur & Directeur' : 'Founder & Director',
      desc: fr ? "Ancien gardien repêché dans la LHJMQ. Après avoir vécu le monde du sport de l'intérieur, Raphaël a fondé AuchuMedia pour aider les athlètes et les entreprises à bâtir une présence en ligne qui performe vraiment." : "Former QMJHL drafted goaltender. After experiencing the world of sports from the inside, Raphaël founded AuchuMedia to help athletes and businesses build an online presence that truly performs.",
      photo: 'https://images.squarespace-cdn.com/content/664d3763786881229ae36f6c/4823b37b-5f7b-4096-893f-901fd8e735d3/A7506428+2.JPG?content-type=image%2Fjpeg',
    },
    {
      initials: 'BL',
      name: 'Benjamin',
      role: fr ? 'Spécialiste médias sociaux' : 'Social media specialist',
      desc: fr ? "Expert en stratégie de contenu et gestion des communautés. Benjamin s'assure que chaque publication génère de l'engagement et de la croissance." : "Expert in content strategy and community management. Benjamin ensures every post generates engagement and growth.",
    },
    {
      initials: 'ZK',
      name: 'Zackary',
      role: fr ? 'Spécialiste Facebook Ads' : 'Facebook Ads specialist',
      desc: fr ? "Maître des campagnes Meta Ads axées sur la performance. Zackary optimise chaque dollar investi pour maximiser le ROI de nos clients." : "Master of performance-driven Meta Ads campaigns. Zackary optimizes every dollar invested to maximize client ROI.",
    },
    {
      initials: 'PC',
      name: 'Patrick',
      role: fr ? 'Chef monteur vidéo' : 'Head video editor',
      desc: fr ? "Cinéphile et perfectionniste, Patrick transforme les rushs bruts en contenu cinématographique qui capte l'attention et raconte une histoire." : "Film lover and perfectionist, Patrick transforms raw footage into cinematic content that captures attention and tells a story.",
    },
    {
      initials: 'SM',
      name: 'Sami',
      role: fr ? 'Monteur vidéo junior' : 'Junior video editor',
      desc: fr ? "Créatif et rapide, Sami apporte un regard frais sur le contenu court format. Spécialisé dans les Reels, TikToks et YouTube Shorts." : "Creative and fast, Sami brings a fresh perspective to short-form content. Specialized in Reels, TikToks and YouTube Shorts.",
    },
  ];
 
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav lang={lang} onLangChange={setLang} />
 
      {/* HERO */}
      <section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 80px', position: 'relative', overflow: 'hidden', paddingTop: '68px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%, rgba(0,61,165,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <SectionLabel>{fr ? 'À propos' : 'About us'}</SectionLabel>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(56px, 8vw, 104px)', lineHeight: 0.88, color: '#fff', marginBottom: '24px' }}>
          {fr ? <>L'AGENCE<br />DERRIÈRE<br /><span style={{ color: BLUE }}>L'IMAGE.</span></> : <>THE AGENCY<br />BEHIND<br /><span style={{ color: BLUE }}>THE IMAGE.</span></>}
        </h1>
      </section>
 
      {/* MISSION */}
      <section style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeIn direction="left">
            <SectionLabel>{fr ? 'Notre mission' : 'Our mission'}</SectionLabel>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '24px', letterSpacing: '0.02em', lineHeight: 1 }}>
              {fr ? <>BÂTIR DES MARQUES<br /><span style={{ color: BLUE }}>QUI DURENT.</span></> : <>BUILD BRANDS<br /><span style={{ color: BLUE }}>THAT LAST.</span></>}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '20px', fontWeight: 300 }}>
              {fr ? "AuchuMedia est née d'une conviction simple : les athlètes et les entreprises ambitieuses méritent une agence qui comprend vraiment leur réalité." : "AuchuMedia was born from a simple conviction: athletes and ambitious businesses deserve an agency that truly understands their reality."}
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, fontWeight: 300 }}>
              {fr ? "Fondée par Raphaël Auchu, ancien gardien repêché dans la LHJMQ, notre agence apporte une perspective unique — celle de quelqu'un qui a vécu le monde du sport de l'intérieur et qui comprend les défis spécifiques des athlètes et des entreprises qui gravitent autour du sport." : "Founded by Raphaël Auchu, a former QMJHL drafted goaltender, our agency brings a unique perspective — that of someone who has experienced the world of sports from the inside and understands the specific challenges of athletes and businesses that gravitate around sports."}
            </p>
          </FadeIn>
          <FadeIn direction="right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { num: '50M+', label: fr ? 'Vues générées' : 'Views generated' },
                { num: '6 ANS', label: fr ? "D'expérience" : 'Of experience' },
                { num: '20+', label: fr ? 'Clients' : 'Clients' },
                { num: '5', label: fr ? "Membres d'équipe" : 'Team members' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '36px', color: i === 1 ? BLUE : '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
 
      {/* ÉQUIPE */}
      <section style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <FadeIn>
          <SectionLabel>{fr ? "L'équipe" : 'The team'}</SectionLabel>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '56px', letterSpacing: '0.02em' }}>
            {fr ? <>LES GENS <span style={{ color: BLUE }}>DERRIÈRE.</span></> : <>THE PEOPLE <span style={{ color: BLUE }}>BEHIND.</span></>}
          </h2>
        </FadeIn>
 
        {/* Raphaël — featured */}
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '40px', alignItems: 'center', background: '#0d0d0d', border: `1px solid rgba(0,61,165,0.2)`, borderRadius: '16px', padding: '40px', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(0,61,165,0.05)', filter: 'blur(40px)' }} />
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', border: `2px solid rgba(0,61,165,0.3)`, flexShrink: 0 }}>
              <img src={team[0].photo} alt={team[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
            </div>
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: '10px' }}>{fr ? 'Fondateur' : 'Founder'}</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '32px', color: '#fff', letterSpacing: '0.06em', marginBottom: '4px' }}>{team[0].name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>{team[0].role}</div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontWeight: 300 }}>{team[0].desc}</p>
            </div>
          </div>
        </FadeIn>
 
        {/* Reste de l'équipe */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {team.slice(1).map((member, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <AvatarPlaceholder initials={member.initials} size={72} />
                <div>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', color: '#fff', letterSpacing: '0.05em', marginBottom: '3px' }}>{member.name}</div>
                  <div style={{ fontSize: '10px', color: BLUE, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>{member.role}</div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontWeight: 300 }}>{member.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
 
      {/* VALEURS */}
      <section style={{ padding: '100px 60px', background: '#0a0a0a', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <FadeIn>
          <SectionLabel>{fr ? 'Nos valeurs' : 'Our values'}</SectionLabel>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', marginBottom: '48px', letterSpacing: '0.02em' }}>
            {fr ? <>CE EN QUOI <span style={{ color: BLUE }}>ON CROIT.</span></> : <>WHAT WE <span style={{ color: BLUE }}>BELIEVE IN.</span></>}
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {(fr ? [
            { num: '01', title: 'Authenticité', desc: "On ne crée pas de contenu pour plaire aux algorithmes. On crée du contenu vrai qui connecte réellement avec les gens." },
            { num: '02', title: 'Performance', desc: "Chaque décision est basée sur les données. On mesure tout, on optimise tout, on améliore en continu." },
            { num: '03', title: 'Partenariat', desc: "On est des partenaires de croissance, pas des fournisseurs. Votre succès est notre succès — on est dans le même bateau." },
          ] : [
            { num: '01', title: 'Authenticity', desc: "We don't create content to please algorithms. We create real content that genuinely connects with people." },
            { num: '02', title: 'Performance', desc: "Every decision is data-driven. We measure everything, optimize everything, improve continuously." },
            { num: '03', title: 'Partnership', desc: "We're growth partners, not vendors. Your success is our success — we're in the same boat." },
          ]).map((v, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '32px 28px' }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '48px', color: 'rgba(0,61,165,0.2)', lineHeight: 1, marginBottom: '16px' }}>{v.num}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{v.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
 
      {/* CTA */}
      <section style={{ padding: '100px 60px', background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.07)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <FadeIn>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(44px, 6vw, 76px)', letterSpacing: '0.03em', lineHeight: 0.93, marginBottom: '36px', color: '#fff' }}>
            {fr ? <>PRÊT À TRAVAILLER<br />AVEC NOUS ?</> : <>READY TO WORK<br />WITH US?</>}
          </h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/athletes#contact" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '15px 36px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 0 40px rgba(0,61,165,0.25)' }}>
              {fr ? 'Prendre RDV →' : 'Book a call →'}
            </a>
          </div>
        </FadeIn>
      </section>
 
      <Footer />
 
      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 200px 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
