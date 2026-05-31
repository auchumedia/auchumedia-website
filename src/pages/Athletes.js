import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLUE = '#003DA5';

export default function Athletes() {
  const [lang, setLang] = useState('fr');
  const fr = lang === 'fr';

  const services = fr ? [
    { num: '01', title: 'PERSONAL BRANDING & PRODUCTION VIDÉO', desc: "On construit ton identité numérique de A à Z et on la met en valeur avec du contenu vidéo cinématographique. Stratégie de contenu, direction créative, web séries, contenu court-format pour Instagram, TikTok et YouTube — tout est cohérent, authentique et stratégique.", tags: ['Instagram', 'TikTok', 'YouTube', 'Web série'] },
    { num: '02', title: 'PARTNERSHIPS & COMMANDITES', desc: "Les marques ne cherchent plus juste un nom sur un chandail. Elles veulent une image forte, une communauté engagée, une histoire à raconter. On te positionne exactement pour ça et on structure des deals qui reflètent ta vraie valeur.", tags: ['Kit média', 'Négociation', 'Commandites', 'Deals'] },
    { num: '03', title: 'TRANSITION POST-CARRIÈRE', desc: "La fin de carrière n'est pas une fin — c'est un pivot. On commence à préparer cette transition bien avant la fin de ta carrière sportive. Réseau, image, positionnement entrepreneurial.", tags: ["Après-carrière", 'Entrepreneuriat', 'Héritage'] },
  ] : [
    { num: '01', title: 'PERSONAL BRANDING & VIDEO PRODUCTION', desc: "We build your digital identity from A to Z and bring it to life with cinematic video content. Content strategy, creative direction, web series, short-form content for Instagram, TikTok and YouTube — everything is consistent, authentic and strategic.", tags: ['Instagram', 'TikTok', 'YouTube', 'Web series'] },
    { num: '02', title: 'PARTNERSHIPS & SPONSORSHIPS', desc: "Brands no longer just look for a name on a jersey. They want a strong image, an engaged community, a story to tell. We position you exactly for that and structure deals that reflect your true value.", tags: ['Media kit', 'Negotiation', 'Sponsorships', 'Deals'] },
    { num: '03', title: 'POST-CAREER TRANSITION', desc: "The end of a career is not an end — it's a pivot. We start preparing this transition well before the end of your sports career. Network, image, entrepreneurial positioning.", tags: ['Post-career', 'Entrepreneurship', 'Legacy'] },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '148px 60px 72px', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ position: 'absolute', top: '-96px', right: '-96px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{ width: '26px', height: '1px', background: BLUE }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Pour les athlètes' : 'For athletes'}</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(60px, 8vw, 104px)', lineHeight: 0.9, color: '#fff', marginBottom: '18px' }}>
          {fr ? <>RAYONNE<br />AU-DELÀ<br />DE TON SPORT.</> : <>RISE ABOVE<br />YOUR<br />SPORT.</>}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(20px, 2.8vw, 32px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em', marginBottom: '36px' }}>
          {fr ? "On bâtit la marque des athlètes qui dominent." : "We build the brand of athletes who dominate."}
        </p>
        <Link to="#form" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {fr ? 'Démarrer maintenant →' : 'Get started →'}
        </Link>
      </section>

      {/* QUI ON AIDE */}
      <div style={{ padding: '48px 60px', borderBottom: '0.5px solid rgba(255,255,255,0.12)', background: '#0d0d0d' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
          {fr ? 'On travaille avec des athlètes de' : 'We work with athletes from'}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Hockey', 'Football', 'Basketball', 'Baseball', 'Tennis', fr ? 'Autres sports' : 'Other sports'].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#141414', border: '0.5px solid rgba(255,255,255,0.08)', padding: '10px 18px', borderRadius: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section style={{ padding: '64px 60px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
          {fr ? 'Nos services · En détail' : 'Our services · In detail'}
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '40px', color: '#fff' }}>
          {fr ? <>TROIS SERVICES.<br />UNE SEULE <span style={{ color: BLUE }}>MISSION.</span></> : <>THREE SERVICES.<br />ONE <span style={{ color: BLUE }}>MISSION.</span></>}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.12)' }}>
          {services.map(svc => (
            <div key={svc.num} style={{ background: '#080808', padding: '36px 40px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: '24px' }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '36px', color: 'rgba(0,61,165,0.3)', lineHeight: 1, paddingTop: '4px' }}>{svc.num}</div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '24px', color: '#fff', marginBottom: '12px', letterSpacing: '0.04em' }}>{svc.title}</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, fontWeight: 300, maxWidth: '560px', marginBottom: '14px' }}>{svc.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', background: 'rgba(0,61,165,0.08)', color: BLUE, border: '0.5px solid rgba(0,61,165,0.2)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETS */}
      <section style={{ padding: '64px 60px', background: '#0d0d0d', borderTop: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
          {fr ? 'Nos projets' : 'Our projects'}
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '32px', color: '#fff' }}>
          {fr ? <>ILS NOUS ONT <span style={{ color: BLUE }}>FAIT CONFIANCE.</span></> : <>THEY <span style={{ color: BLUE }}>TRUSTED US.</span></>}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { cat: 'Hockey · LNAH · Always-On', name: 'Le Bataillon LNAH', meta: fr ? 'Médias sociaux · Stratégie' : 'Social media · Strategy', stat: '+1M', color: '#fff' },
            { cat: fr ? 'Production · Web série' : 'Production · Web series', name: 'NorCan — Au cœur du confort', meta: fr ? 'Série premium · YouTube' : 'Premium series · YouTube', stat: fr ? 'SÉRIE LANCÉE' : 'LAUNCHED', color: BLUE },
          ].map((p, i) => (
            <Link key={i} to="/projets" style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden', display: 'block' }}>
              <div style={{ height: '200px', background: i === 0 ? '#080f1c' : '#0d0d0d', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: '80px', color: 'rgba(255,255,255,0.03)', position: 'absolute' }}>0{i+1}</span>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>
              <div style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: BLUE, marginBottom: '6px' }}>{p.cat}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{p.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>{p.meta}</div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: p.color }}>{p.stat}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="form" style={{ padding: '64px 60px', background: '#0d0d0d', borderTop: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>{fr ? 'Prendre contact' : 'Get in touch'}</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '16px', color: '#fff' }}>
              {fr ? <>PARLONS DE<br />TON <span style={{ color: BLUE }}>PROJET.</span></> : <>LET'S TALK<br />ABOUT YOUR <span style={{ color: BLUE }}>PROJECT.</span></>}
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, fontWeight: 300 }}>
              {fr ? "Remplis le formulaire et notre équipe te reviendra dans les 48h pour discuter de ton projet et explorer comment on peut t'aider à bâtir ta marque." : "Fill out the form and our team will get back to you within 48h to discuss your project and explore how we can help you build your brand."}
            </p>
          </div>
          <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '36px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              {[fr ? 'Prénom' : 'First name', fr ? 'Nom' : 'Last name'].map(label => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>{label}</label>
                  <input type="text" style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
                </div>
              ))}
            </div>
            {[{ label: 'Email', type: 'email' }].map(f => (
              <div key={f.label} style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>{f.label}</label>
                <input type={f.type} style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
              </div>
            ))}
            <div style={{ marginBottom: '14px', position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>Instagram</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>@</span>
                <input type="text" style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px 12px 28px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>{fr ? 'Ton sport' : 'Your sport'}</label>
              <select style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", appearance: 'none', cursor: 'pointer' }}>
                <option value="">{fr ? 'Sélectionne ton sport' : 'Select your sport'}</option>
                {['Hockey', 'Football', 'Basketball', 'Baseball', fr ? 'Autres' : 'Others'].map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>{fr ? 'Ton projet (optionnel)' : 'Your project (optional)'}</label>
              <textarea placeholder={fr ? 'Dis-nous en plus...' : 'Tell us more...'} style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", resize: 'vertical', minHeight: '90px' }} />
            </div>
            <button style={{ width: '100%', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '15px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontFamily: "'DM Sans'", marginTop: '6px' }}>
              {fr ? 'Envoyer ma demande →' : 'Send my request →'}
            </button>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '12px' }}>
              {fr ? 'Tes informations restent confidentielles.' : 'Your information remains confidential.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
