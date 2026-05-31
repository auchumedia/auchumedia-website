import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLUE = '#003DA5';

export default function Entreprises() {
  const [lang, setLang] = useState('fr');
  const fr = lang === 'fr';

  const services = fr ? [
    { num: '01', title: 'MÉDIAS SOCIAUX / ALWAYS-ON', desc: "Les marques qui performent créent du contenu comme des créateurs. On gère votre présence en continu en publiant une histoire à suivre — épisode après épisode, on raconte votre réalité et votre expertise de façon humaine et divertissante.", tags: ['Instagram', 'TikTok', 'LinkedIn', 'Stratégie éditoriale'] },
    { num: '02', title: 'META ADS · ACQUISITION CLIENT', desc: "On conçoit, lance et optimise des campagnes Meta Ads axées sur la performance. Chaque campagne est testée, analysée et ajustée en continu. L'objectif : attirer des leads qualifiés, réduire votre coût par lead et scaler ce qui fonctionne.", tags: ['Facebook Ads', 'Instagram Ads', 'A/B Testing', 'Performance'] },
    { num: '03', title: 'CRM & PIPELINE', desc: "On intègre et configure un CRM complet, parfaitement adapté à vos opérations, afin de centraliser vos leads, structurer votre pipeline et automatiser vos suivis. Résultat : moins de pertes, plus de conversions.", tags: ['Automatisation', 'Pipeline', 'Conversion'] },
  ] : [
    { num: '01', title: 'SOCIAL MEDIA / ALWAYS-ON', desc: "Brands that perform create content like creators. We manage your presence continuously by publishing a story to follow — episode by episode, we tell your reality and expertise in a human and entertaining way.", tags: ['Instagram', 'TikTok', 'LinkedIn', 'Editorial strategy'] },
    { num: '02', title: 'META ADS · CLIENT ACQUISITION', desc: "We design, launch and optimize Meta Ads campaigns focused on performance. Each campaign is continuously tested, analyzed and adjusted. The goal: attract qualified leads, reduce your cost per lead and scale what works.", tags: ['Facebook Ads', 'Instagram Ads', 'A/B Testing', 'Performance'] },
    { num: '03', title: 'CRM & PIPELINE', desc: "We integrate and configure a comprehensive CRM, perfectly adapted to your operations, to centralize your leads, structure your pipeline and automate your follow-ups. Result: fewer losses, more conversions.", tags: ['Automation', 'Pipeline', 'Conversion'] },
  ];

  const steps = fr ? [
    { num: '01', title: 'OFFRE & POSITIONNEMENT', desc: "Avant d'investir en publicité, on s'assure que votre offre résonne avec votre marché cible.", tags: ['Stratégie', 'Audit'] },
    { num: '02', title: 'CONTENU ORGANIQUE', desc: "Publication hebdomadaire cohérente — on raconte votre expertise comme une série qui bâtit la confiance.", tags: ['Always-On', 'Autorité'] },
    { num: '03', title: 'CAMPAGNES META ADS', desc: "On lance des campagnes ciblées, testées et optimisées en continu. Chaque dollar investi travaille pour vous.", tags: ['Meta Ads', 'Acquisition'] },
    { num: '04', title: 'CRM & SUIVI DES LEADS', desc: "Chaque lead est capturé, qualifié et assigné à un pipeline structuré avec des suivis automatisés.", tags: ['CRM', 'Automatisation'] },
    { num: '05', title: 'OPTIMISATION & SCALING', desc: "Rapports mensuels, analyse des données, scaling des campagnes performantes — une machine de croissance durable.", tags: ['Scale', 'ROI', 'Croissance'] },
  ] : [
    { num: '01', title: 'OFFER & POSITIONING', desc: "Before investing in advertising, we ensure your offer resonates with your target market.", tags: ['Strategy', 'Audit'] },
    { num: '02', title: 'ORGANIC CONTENT', desc: "Consistent weekly publishing — we tell your expertise like a series that builds trust.", tags: ['Always-On', 'Authority'] },
    { num: '03', title: 'META ADS CAMPAIGNS', desc: "We launch targeted campaigns, continuously tested and optimized. Every dollar invested works for you.", tags: ['Meta Ads', 'Acquisition'] },
    { num: '04', title: 'CRM & LEAD TRACKING', desc: "Every lead is captured, qualified and assigned to a structured pipeline with automated follow-ups.", tags: ['CRM', 'Automation'] },
    { num: '05', title: 'OPTIMIZATION & SCALING', desc: "Monthly reports, data analysis, scaling of performing campaigns — a sustainable growth machine.", tags: ['Scale', 'ROI', 'Growth'] },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '148px 60px 72px', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ position: 'absolute', top: '-96px', right: '-96px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{ width: '26px', height: '1px', background: BLUE }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>{fr ? 'Pour les entreprises' : 'For businesses'}</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(60px, 8vw, 104px)', lineHeight: 0.9, color: '#fff', marginBottom: '18px' }}>
          {fr ? <>PROPULSONS<br />VOTRE<br />CROISSANCE.</> : <>LET'S SCALE<br />YOUR<br />BUSINESS.</>}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(20px, 2.8vw, 32px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em', marginBottom: '36px' }}>
          {fr ? "Du contenu qui convertit. Des leads qui closent." : "Content that converts. Leads that close."}
        </p>
        <Link to="#form" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {fr ? 'Obtenir ma soumission →' : 'Get my quote →'}
        </Link>
      </section>

      {/* QUI */}
      <div style={{ padding: '48px 60px', borderBottom: '0.5px solid rgba(255,255,255,0.12)', background: '#0d0d0d' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>{fr ? 'On travaille avec' : 'We work with'}</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[fr ? 'Entreprises B2C high ticket' : 'B2C high ticket businesses', fr ? 'Immobilier & construction' : 'Real estate & construction', fr ? 'Autres services premium' : 'Other premium services'].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#141414', border: '0.5px solid rgba(255,255,255,0.08)', padding: '10px 18px', borderRadius: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section style={{ padding: '64px 60px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>{fr ? 'Nos services · En détail' : 'Our services · In detail'}</div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '40px', color: '#fff' }}>
          {fr ? <>TROIS SERVICES.<br />UNE SEULE <span style={{ color: BLUE }}>MISSION.</span></> : <>THREE SERVICES.<br />ONE <span style={{ color: BLUE }}>MISSION.</span></>}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.12)' }}>
          {services.map(svc => (
            <div key={svc.num} style={{ background: '#080808', padding: '36px 40px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: '24px' }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: '36px', color: 'rgba(0,61,165,0.3)', lineHeight: 1 }}>{svc.num}</div>
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

      {/* FUNNEL */}
      <section style={{ padding: '64px 60px', background: '#0d0d0d', borderTop: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>{fr ? 'Notre approche · Le funnel complet' : 'Our approach · The complete funnel'}</div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '32px', color: '#fff' }}>
          {fr ? <>CINQ ÉTAPES.<br />UNE SEULE <span style={{ color: BLUE }}>DIRECTION.</span></> : <>FIVE STEPS.<br />ONE <span style={{ color: BLUE }}>DIRECTION.</span></>}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', position: 'relative' }}>
              {i < steps.length - 1 && <div style={{ position: 'absolute', left: '27px', top: '44px', bottom: 0, width: '0.5px', background: 'rgba(255,255,255,0.07)' }} />}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(0,61,165,0.08)', border: '0.5px solid rgba(0,61,165,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: BLUE, flexShrink: 0 }}>{step.num}</div>
              </div>
              <div style={{ paddingBottom: '36px', paddingLeft: '20px' }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: '#fff', marginBottom: '8px', letterSpacing: '0.04em' }}>{step.title}</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: '12px', fontWeight: 300 }}>{step.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {step.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', background: 'rgba(0,61,165,0.08)', color: BLUE, border: '0.5px solid rgba(0,61,165,0.2)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="form" style={{ padding: '64px 60px', background: '#0d0d0d', borderTop: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>{fr ? 'Prendre contact' : 'Get in touch'}</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '16px', color: '#fff' }}>
              {fr ? <>PARLONS DE<br />VOTRE <span style={{ color: BLUE }}>CROISSANCE.</span></> : <>LET'S TALK<br />ABOUT YOUR <span style={{ color: BLUE }}>GROWTH.</span></>}
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, fontWeight: 300 }}>
              {fr ? "Remplissez le formulaire et notre équipe vous reviendra dans les 48h." : "Fill out the form and our team will get back to you within 48h."}
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
            {[
              { label: 'Email', type: 'email' },
              { label: fr ? "Nom de l'entreprise" : 'Company name', type: 'text' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>{f.label}</label>
                <input type={f.type} style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'" }} />
              </div>
            ))}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>{fr ? "Chiffre d'affaires annuel" : 'Annual revenue'}</label>
              <select style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", appearance: 'none', cursor: 'pointer' }}>
                <option value="">{fr ? 'Sélectionne une tranche' : 'Select a range'}</option>
                {(fr ? ['Moins de 100K$/an', '100K$ – 500K$/an', '500K$ – 1M$/an', '1M$ et plus'] : ['Less than $100K/yr', '$100K – $500K/yr', '$500K – $1M/yr', '$1M and more']).map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '7px' }}>{fr ? 'Votre projet' : 'Your project'}</label>
              <textarea required placeholder={fr ? 'Dites-nous en plus sur vos objectifs...' : 'Tell us more about your goals...'} style={{ width: '100%', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'DM Sans'", resize: 'vertical', minHeight: '90px' }} />
            </div>
            <button style={{ width: '100%', fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '15px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontFamily: "'DM Sans'" }}>
              {fr ? 'Envoyer ma demande →' : 'Send my request →'}
            </button>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '12px' }}>
              {fr ? 'Vos informations restent confidentielles.' : 'Your information remains confidential.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
