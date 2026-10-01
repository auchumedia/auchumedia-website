import React, { useState } from 'react';
import { Nav } from './Home';

const BLUE = '#003DA5';
const BLACK = '#0a0a0a';
const GRAY_BG = '#f8f8f8';
const TOTAL_STEPS = 5;

const OBJECTIFS = [
  { value: 'visibilite', titre: 'Augmenter ma visibilité en ligne', desc: 'Bâtir une présence forte sur les réseaux' },
  { value: 'leads', titre: 'Générer plus de leads qualifiés', desc: 'Attirer des clients potentiels via le contenu' },
  { value: 'demarquer', titre: 'Me démarquer de la compétition', desc: 'Devenir LA référence dans mon industrie' },
  { value: 'exploration', titre: 'Je ne sais pas encore', desc: "J'explore mes options" },
];

const GESTION_OPTIONS = ['Personne', 'Moi-même', 'Un employé interne', 'Une autre agence', 'Un freelance'];
const CONTENU_OPTIONS = ['Aucun contenu', 'Photos seulement', 'Vidéos courtes (Reels/TikTok)', 'Un mélange de tout', 'Du contenu promotionnel seulement'];
const REVENUS_OPTIONS = ['Moins de 500K$', '500K$ à 1M$', '1M$ à 5M$', '5M$ et plus'];
const QUAND_OPTIONS = ['Dès que possible', 'Dans 1-3 mois', 'Dans 3-6 mois', "J'explore seulement"];

const inputStyle = {
  width: '100%', background: '#ffffff', border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: '8px', padding: '13px 16px', color: BLACK, fontSize: '14px',
  outline: 'none', fontFamily: "'DM Sans'", marginBottom: '16px',
};

const labelStyle = {
  display: 'block', fontFamily: "'DM Sans'", fontSize: '13px', fontWeight: 700,
  color: 'rgba(10,10,10,0.65)', marginBottom: '8px',
};

function ProgressBar({ step }) {
  return (
    <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${(step / TOTAL_STEPS) * 100}%`, background: BLUE,
        borderRadius: '2px', transition: 'width 0.4s ease',
      }} />
    </div>
  );
}

function StepWrapper({ stepKey, children }) {
  return (
    <div key={stepKey} className="step-anim">
      {children}
    </div>
  );
}

export default function PlanifierAppel() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    objectif: '',
    gestionReseaux: '', typeContenu: '',
    entreprise: '', siteWeb: '', industrie: '', revenus: '',
    projetDescription: '', quandCommencer: '',
    prenom: '', nom: '', email: '', telephone: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 1) return !!form.objectif;
    if (step === 3) return !!form.entreprise && !!form.industrie;
    return true;
  };

  const next = () => { if (canNext()) setStep(s => Math.min(TOTAL_STEPS, s + 1)); };
  const prev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('https://formspree.io/f/xjgdjoer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Nouvelle demande — ${form.prenom} ${form.nom} (${form.entreprise})`,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'clip' }}>
      <Nav />

      <div className="planifier-grid" style={{
        display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', minHeight: '100vh', paddingTop: '76px',
      }}>
        {/* Colonne gauche */}
        <div className="planifier-left" style={{ background: GRAY_BG, padding: '72px 56px' }}>
          <div className="planifier-sticky" style={{ position: 'sticky', top: '116px' }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '20px' }}>
              Appel découverte
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1, margin: '0 0 24px', textTransform: 'uppercase' }}>
              Planifier un appel
            </h1>
            <p style={{ fontFamily: "'DM Sans'", fontSize: '15px', color: 'rgba(10,10,10,0.6)', lineHeight: 1.75, marginBottom: '40px' }}>
              Parle-nous de ton entreprise et de tes objectifs. On prendra le temps de voir si AuchuMedia est le bon partenaire pour toi. Sans obligation.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${BLUE}, #001a4d)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: "'Bebas Neue'", color: '#fff', fontSize: '20px' }}>RA</span>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: '13px', fontWeight: 700, color: BLACK }}>
                  Tu échangeras avec Raphaël · Fondateur & Président
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', color: 'rgba(10,10,10,0.5)' }}>
                  Répond généralement en 1 à 3 jours ouvrables
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
              <span style={{ color: '#f5b400', fontSize: '14px', letterSpacing: '1px' }}>★★★★★</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: '12px', color: 'rgba(10,10,10,0.5)' }}>
                4.9 · Avis Google
              </span>
            </div>

            <ProgressBar step={step} />
          </div>
        </div>

        {/* Colonne droite */}
        <div className="planifier-right" style={{ padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto' }}>
            {submitted ? (
              <div className="step-anim" style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎯</div>
                <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: '32px', margin: '0 0 12px', textTransform: 'uppercase' }}>
                  Demande reçue !
                </h2>
                <p style={{ fontFamily: "'DM Sans'", fontSize: '15px', color: 'rgba(10,10,10,0.6)' }}>
                  On te revient dans les 24h. 🎯
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.45)' }}>
                    Étape {step}/{TOTAL_STEPS}
                  </span>
                </div>
                <div style={{ marginBottom: '36px' }}>
                  <ProgressBar step={step} />
                </div>

                {step === 1 && (
                  <StepWrapper stepKey="1">
                    <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: '32px', margin: '0 0 28px', textTransform: 'uppercase' }}>
                      Ton objectif ?
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {OBJECTIFS.map(o => (
                        <div key={o.value} onClick={() => set('objectif', o.value)} style={{
                          border: `1px solid ${form.objectif === o.value ? BLUE : 'rgba(0,0,0,0.1)'}`,
                          background: form.objectif === o.value ? 'rgba(0,61,165,0.05)' : '#fff',
                          borderRadius: '10px', padding: '18px 20px', cursor: 'pointer', transition: 'all 0.2s ease',
                        }}
                          onMouseEnter={e => { if (form.objectif !== o.value) e.currentTarget.style.borderColor = BLUE; }}
                          onMouseLeave={e => { if (form.objectif !== o.value) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                        >
                          <div style={{ fontFamily: "'DM Sans'", fontSize: '14px', fontWeight: 700, color: BLACK, marginBottom: '4px' }}>
                            {o.titre}
                          </div>
                          <div style={{ fontFamily: "'DM Sans'", fontSize: '13px', color: 'rgba(10,10,10,0.5)' }}>
                            {o.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </StepWrapper>
                )}

                {step === 2 && (
                  <StepWrapper stepKey="2">
                    <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: '32px', margin: '0 0 28px', textTransform: 'uppercase' }}>
                      Ta présence actuelle ?
                    </h2>
                    <label style={labelStyle}>Qui gère tes réseaux sociaux actuellement ?</label>
                    <select value={form.gestionReseaux} onChange={e => set('gestionReseaux', e.target.value)} style={inputStyle}>
                      <option value="">Sélectionner</option>
                      {GESTION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <label style={labelStyle}>Quel type de contenu publies-tu ?</label>
                    <select value={form.typeContenu} onChange={e => set('typeContenu', e.target.value)} style={inputStyle}>
                      <option value="">Sélectionner</option>
                      {CONTENU_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </StepWrapper>
                )}

                {step === 3 && (
                  <StepWrapper stepKey="3">
                    <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: '32px', margin: '0 0 28px', textTransform: 'uppercase' }}>
                      Ton entreprise
                    </h2>
                    <label style={labelStyle}>Nom de l'entreprise *</label>
                    <input required type="text" value={form.entreprise} onChange={e => set('entreprise', e.target.value)} style={inputStyle} />
                    <label style={labelStyle}>Site web</label>
                    <input type="text" value={form.siteWeb} onChange={e => set('siteWeb', e.target.value)} style={inputStyle} />
                    <label style={labelStyle}>Industrie / Secteur *</label>
                    <input required type="text" value={form.industrie} onChange={e => set('industrie', e.target.value)} style={inputStyle} />
                    <label style={labelStyle}>Revenus annuels approximatifs</label>
                    <select value={form.revenus} onChange={e => set('revenus', e.target.value)} style={inputStyle}>
                      <option value="">Sélectionner</option>
                      {REVENUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </StepWrapper>
                )}

                {step === 4 && (
                  <StepWrapper stepKey="4">
                    <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: '32px', margin: '0 0 28px', textTransform: 'uppercase' }}>
                      Ton projet
                    </h2>
                    <label style={labelStyle}>Qu'est-ce qui t'a amené à chercher de l'aide en contenu vidéo ?</label>
                    <textarea
                      value={form.projetDescription}
                      onChange={e => set('projetDescription', e.target.value)}
                      placeholder="Parle-nous de ta situation, tes défis, tes objectifs..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    />
                    <label style={labelStyle}>Quand voudrais-tu idéalement commencer ?</label>
                    <select value={form.quandCommencer} onChange={e => set('quandCommencer', e.target.value)} style={inputStyle}>
                      <option value="">Sélectionner</option>
                      {QUAND_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </StepWrapper>
                )}

                {step === 5 && (
                  <StepWrapper stepKey="5">
                    <h2 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: '32px', margin: '0 0 28px', textTransform: 'uppercase' }}>
                      Tes coordonnées
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
                      <input type="text" placeholder="Prénom" value={form.prenom} onChange={e => set('prenom', e.target.value)} style={inputStyle} />
                      <input type="text" placeholder="Nom" value={form.nom} onChange={e => set('nom', e.target.value)} style={inputStyle} />
                    </div>
                    <label style={labelStyle}>Email professionnel *</label>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                    <label style={labelStyle}>Numéro de téléphone *</label>
                    <input required type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)} style={inputStyle} />
                  </StepWrapper>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '12px' }}>
                  {step > 1 ? (
                    <button type="button" onClick={prev} style={{
                      fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: BLACK, background: 'transparent', border: `1px solid ${BLACK}`, padding: '15px 26px',
                      borderRadius: '6px', cursor: 'pointer',
                    }}>
                      ← Précédent
                    </button>
                  ) : <div />}

                  {step < TOTAL_STEPS ? (
                    <button type="button" onClick={next} disabled={!canNext()} style={{
                      fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: '#fff', background: BLUE, border: 'none', padding: '15px 26px', borderRadius: '6px',
                      cursor: canNext() ? 'pointer' : 'default', opacity: canNext() ? 1 : 0.5, transition: 'opacity 0.2s',
                    }}>
                      Suivant →
                    </button>
                  ) : (
                    <button type="submit" disabled={sending} style={{
                      fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: '#fff', background: BLUE, border: 'none', padding: '15px 26px', borderRadius: '6px',
                      cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.6 : 1, transition: 'opacity 0.2s',
                    }}>
                      {sending ? 'Envoi...' : 'Envoyer →'}
                    </button>
                  )}
                </div>

                {error && (
                  <p style={{ color: '#d1343c', fontSize: '13px', marginTop: '18px', textAlign: 'center', fontFamily: "'DM Sans'" }}>
                    Une erreur est survenue. Réessaie ou écris-nous directement à raphael@auchumedia.com
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .step-anim { animation: stepFadeIn 0.4s ease; }

        @media (max-width: 900px) {
          .planifier-grid { grid-template-columns: 1fr !important; }
          .planifier-left, .planifier-right { padding: 40px 20px !important; }
          .planifier-sticky { position: static !important; }
        }
      `}</style>
    </div>
  );
}
