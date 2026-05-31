import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLUE = '#003DA5';

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
  const fr = lang === 'fr';

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

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '0.5px solid rgba(255,255,255,0.12)', paddingTop: '68px' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,61,165,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ padding: '80px 60px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '26px', height: '1px', background: BLUE }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE }}>
              {fr ? 'Agence de référence · Sport · Marketing' : 'Reference agency · Sport · Marketing'}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(52px, 7vw, 92px)', lineHeight: 0.9, color: '#fff', marginBottom: '16px' }}>
            {fr ? <>NOUS PROPULSONS<br />ATHLÈTES & MARQUES</> : <>WE ELEVATE<br />ATHLETES & BRANDS</>}
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(20px, 2.8vw, 36px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em' }}>
            {fr ? 'au sommet de leur image.' : 'to the top of their image.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '56px', borderTop: '0.5px solid rgba(255,255,255,0.12)' }}>
            <div style={{ padding: '36px 40px 44px 0' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.9, fontWeight: 300, marginBottom: '16px' }}>
                {fr ? "AuchuMedia est l'agence de référence pour les athlètes de haut niveau qui veulent bâtir une image forte, attirer des partenariats et rayonner au-delà de leur carrière sportive." : "AuchuMedia is the reference agency for elite athletes who want to build a strong image, attract partnerships and shine beyond their sports career."}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.9, fontWeight: 300 }}>
                {fr ? "Fondée par Raphaël Auchu, ancien gardien repêché dans la LHJMQ, l'agence comprend le monde du sport de l'intérieur — avec plus de 6 ans d'expérience et 50 millions de vues générées." : "Founded by Raphaël Auchu, a former QMJHL drafted goaltender, the agency understands the world of sport from the inside — with over 6 years of experience and 50 million views generated."}
              </p>
            </div>
            <div style={{ position: 'relative', minHeight: '320px', overflow: 'hidden' }}>
              <img
                src="https://images.squarespace-cdn.com/content/664d3763786881229ae36f6c/d2f0e30d-1577-4c56-9a8a-5cd8111a4777/bdfd0b36-20a9-496e-aa89-b5951701ed46+2.JPG?content-type=image%2Fjpeg"
                alt="Raphaël Auchu en tournage"
                style={{ width: 'calc(100% - 28px)', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', borderRadius: '16px', margin: '24px 0 40px 28px', maxHeight: '420px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ position: 'relative', overflow: 'hidden', borderTop: '0.5px solid rgba(255,255,255,0.12)', borderBottom: '0.5px solid rgba(255,255,255,0.12)', padding: '20px 0', background: '#080808' }}>
        <div style={{ position: 'absolute', inset: '0', left: 0, width: '80px', background: 'linear-gradient(to right, #080808, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: '0', right: 0, left: 'auto', width: '80px', background: 'linear-gradient(to left, #080808, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt} style={{ height: '36px', width: 'auto', maxWidth: '120px', objectFit: 'contain', margin: '0 40px', opacity: 0.45, filter: 'brightness(0) invert(1)' }} />
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* WHY */}
      <section style={{ padding: '64px 60px', background: '#0d0d0d', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
          {fr ? "Ce qu'on bâtit pour nos athlètes" : "What we build for our athletes"}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '0.03em', lineHeight: 1.05, marginBottom: '20px', color: '#fff' }}>
              {fr ? <>Le personal branding,<br />c'est ta <span style={{ color: BLUE }}>DEUXIÈME CARRIÈRE.</span></> : <>Personal branding<br />is your <span style={{ color: BLUE }}>SECOND CAREER.</span></>}
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, marginBottom: '20px', fontWeight: 300 }}>
              {fr ? "Dans le monde du hockey, cette pratique est encore trop peu exploitée. Pourtant, bâtir une image forte peut avoir un impact énorme sur la valeur perçue d'un athlète — et sur ses opportunités commerciales, avant et après le sport." : "In the world of hockey, this practice is still far too underutilized. Yet building a strong image can have an enormous impact on an athlete's perceived value — and on their commercial opportunities, before and after sports."}
            </p>
            <blockquote style={{ fontFamily: "'Cormorant Garamond'", fontSize: '15px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.8)', borderLeft: `2px solid ${BLUE}`, paddingLeft: '18px', lineHeight: 1.75 }}>
              {fr ? "Les athlètes qui marquent vraiment l'histoire sont ceux qui bâtissent une image solide et stratégique — sur et en dehors du sport." : "The athletes who truly make history are those who build a solid and strategic image — on and off the field."}
            </blockquote>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cards.map((card, i) => (
              <div key={i} style={{ background: '#161616', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px 18px', display: 'flex', gap: '14px' }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '22px', color: 'rgba(0,61,165,0.35)', lineHeight: 1, minWidth: '26px' }}>{String(i+1).padStart(2,'0')}</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px', color: '#fff' }}>{card.title}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, fontWeight: 300 }}>{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        {[
          { num: '50M', acc: '+', label: fr ? 'Vues générées' : 'Views generated' },
          { num: '6', acc: fr ? 'ANS' : 'YRS', label: fr ? "D'expérience" : 'Of experience', numColor: '#fff', accColor: BLUE },
          { num: '20', acc: '+', label: fr ? 'Clients & athlètes' : 'Clients & athletes' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '28px 0', textAlign: 'center', borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.12)' : 'none' }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: '36px', color: '#fff', lineHeight: 1 }}>
              <span style={{ color: s.numColor || '#fff' }}>{s.num}</span>
              <span style={{ fontSize: '26px', color: s.accColor || BLUE }}>{s.acc}</span>
            </div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* NOS ATHLÈTES */}
      <section style={{ padding: '64px 60px', background: '#080808' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
          {fr ? 'Nos athlètes' : 'Our athletes'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            { cat: 'Hockey · Always-On', name: 'Le Bataillon LNAH', meta: fr ? 'Médias sociaux · Stratégie' : 'Social media · Strategy', stat: '+1M', statColor: '#fff' },
            { cat: fr ? 'Production · Web série' : 'Production · Web series', name: 'NorCan — Au cœur du confort', meta: fr ? 'Série premium · YouTube' : 'Premium series · YouTube', stat: fr ? 'SÉRIE LANCÉE' : 'LAUNCHED', statColor: BLUE },
            { cat: 'Always-On · Contenu', name: 'SexxxPlus', meta: fr ? 'Stratégie · Médias sociaux' : 'Strategy · Social media', stat: '+20M', statColor: BLUE },
          ].map((p, i) => (
            <Link key={i} to="/projets" style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden', display: 'block', transition: 'border-color 0.2s' }}>
              <div style={{ height: '160px', background: i % 2 === 0 ? '#080f1c' : '#0d0d0d', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: '80px', color: 'rgba(255,255,255,0.03)', position: 'absolute' }}>0{i+1}</span>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(0,61,165,0.1)', border: '0.5px solid rgba(0,61,165,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: BLUE, marginBottom: '6px' }}>{p.cat}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{p.name}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>{p.meta}</div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: '20px', color: p.statColor }}>{p.stat}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FONDATEUR */}
      <section style={{ padding: '64px 60px', background: '#0d0d0d', borderTop: '0.5px solid rgba(255,255,255,0.12)', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
          {fr ? 'Fondateur' : 'Founder'}
        </div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
          <div style={{ width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '0.5px solid rgba(255,255,255,0.12)' }}>
            <img src="https://images.squarespace-cdn.com/content/664d3763786881229ae36f6c/4823b37b-5f7b-4096-893f-901fd8e735d3/A7506428+2.JPG?content-type=image%2Fjpeg" alt="Raphaël Auchu" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: '34px', letterSpacing: '0.06em', color: '#fff', marginBottom: '5px' }}>RAPHAËL AUCHU</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em', marginBottom: '20px' }}>
              {fr ? 'Brand Builder · Ancien gardien repêché LHJMQ' : 'Brand Builder · Former QMJHL drafted goaltender'}
            </div>
            <blockquote style={{ fontFamily: "'Cormorant Garamond'", fontSize: '15px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.8)', borderLeft: `2px solid ${BLUE}`, paddingLeft: '18px', lineHeight: 1.8 }}>
              {fr ? "J'ai grandi dans le hockey de haut niveau. J'ai vu de l'intérieur ce que ça coûte de ne pas investir dans son image. Aujourd'hui, j'aide les athlètes à bâtir ce que j'aurais voulu avoir — une marque forte, influente, qui dure bien au-delà de la carrière." : "I grew up in high-level hockey. I saw firsthand what it costs not to invest in your image. Today, I help athletes build what I would have wanted — a strong, influential brand that lasts well beyond the career."}
            </blockquote>
          </div>
        </div>
      </section>

      {/* B2C */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', padding: '20px 60px', borderBottom: '0.5px solid rgba(255,255,255,0.12)', background: '#080808' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
          <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{fr ? 'Vous êtes une entreprise ?' : 'Are you a business?'}</strong>{' '}
          {fr ? 'On offre aussi des services de médias sociaux, Meta Ads et CRM pour les marques B2C ambitieuses.' : 'We also offer social media, Meta Ads and CRM services for ambitious B2C brands.'}
        </p>
        <Link to="/entreprises" style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(0,61,165,0.7)', border: '0.5px solid rgba(0,61,165,0.28)', padding: '7px 16px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
          {fr ? 'Services entreprises →' : 'Business services →'}
        </Link>
      </div>

      {/* CTA */}
      <section style={{ padding: '88px 60px', textAlign: 'center', background: '#0d0d0d', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '0.04em', lineHeight: 0.95, marginBottom: '36px', color: '#fff' }}>
          {fr ? <>PRÊT À BÂTIR<br />TA MARQUE ?</> : <>READY TO BUILD<br />YOUR BRAND?</>}
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/athletes#form" style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: BLUE, padding: '14px 32px', borderRadius: '5px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {fr ? 'Prendre RDV' : 'Book a call'}
          </Link>
          <Link to="/projets" style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', border: '0.5px solid rgba(255,255,255,0.2)', padding: '14px 32px', borderRadius: '5px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {fr ? 'Voir nos projets' : 'See our projects'}
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section[style*="padding: 64px 60px"], section[style*="padding: 88px 60px"] { padding: 40px 20px !important; }
          div[style*="padding: 80px 60px"] { padding: 40px 20px 0 !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(3, 280px) !important; overflow-x: auto; }
          div[style*="padding: 20px 60px"] { padding: 18px 20px !important; flex-direction: column !important; align-items: flex-start !important; }
          footer { padding: 20px !important; flex-direction: column !important; gap: 8px !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
