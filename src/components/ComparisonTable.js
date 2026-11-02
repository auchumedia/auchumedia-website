import React, { useEffect, useRef, useState } from 'react';

const BLUE = '#003DA5';
const BLACK = '#0a0a0a';

const ROWS = [
  { critere: 'Volume', classique: '20 à 30 vidéos par mois, produites à la chaîne', auchu: '4 vidéos par mois par client : 1 par semaine, pensée une à une' },
  { critere: 'Contenu', classique: 'Contenu générique, recopié sur les tendances', auchu: 'Storytelling propre à ta marque et à ton histoire' },
  { critere: 'Format', classique: 'Vidéos isolées, sans fil conducteur', auchu: "Séries d'épisodes qui font revenir ton audience" },
  { critere: 'Objectif', classique: 'Publier pour publier', auchu: "Chaque vidéo a un but : capter l'attention, bâtir la confiance, convertir" },
  { critere: 'Équipe', classique: 'Un junior sur ton compte, un interlocuteur qui change', auchu: 'Raphaël et Benjamin directement sur ton mandat' },
];

function Check() {
  return (
    <span className="ct-check">
      <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4.2 8.2L11 1.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Cross() {
  return <span className="ct-cross">✕</span>;
}

export default function ComparisonTable() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayRules = ROWS.map((_, i) => {
    const rowDelay = (i * 0.09).toFixed(2);
    const checkDelay = (i * 0.09 + 0.15).toFixed(2);
    return `
      .ct-table.ct-revealed .ct-row:nth-child(${i + 2}) { transition-delay: ${rowDelay}s; }
      .ct-table.ct-revealed .ct-row:nth-child(${i + 2}) .ct-check { transition-delay: ${checkDelay}s; }
      .ct-mobile.ct-revealed .ct-card:nth-child(${i + 1}) { transition-delay: ${rowDelay}s; }
      .ct-mobile.ct-revealed .ct-card:nth-child(${i + 1}) .ct-check { transition-delay: ${checkDelay}s; }
    `;
  }).join('\n');

  return (
    <div ref={ref} className="ct-wrap">
      <div className={`ct-table ${inView ? 'ct-revealed' : ''}`}>
        <div className="ct-row ct-header">
          <div className="ct-cell ct-cell-label" />
          <div className="ct-cell ct-col-classique">
            <span className="ct-col-title">Agence classique</span>
          </div>
          <div className="ct-cell ct-col-auchu">
            <span className="ct-col-title ct-col-title-auchu">AuchuMedia</span>
          </div>
        </div>
        {ROWS.map((r) => (
          <div className="ct-row" key={r.critere}>
            <div className="ct-cell ct-cell-label">{r.critere}</div>
            <div className="ct-cell ct-col-classique">
              <Cross />
              <span className="ct-text-classique">{r.classique}</span>
            </div>
            <div className="ct-cell ct-col-auchu">
              <Check />
              <span className="ct-text-auchu">{r.auchu}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`ct-mobile ${inView ? 'ct-revealed' : ''}`}>
        {ROWS.map((r) => (
          <div className="ct-card" key={r.critere}>
            <div className="ct-card-title">{r.critere}</div>
            <div className="ct-card-line ct-card-classique">
              <Cross />
              <span>{r.classique}</span>
            </div>
            <div className="ct-card-sep" />
            <div className="ct-card-line ct-card-auchu">
              <Check />
              <span>{r.auchu}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ct-wrap { max-width: 1000px; margin: 0 auto; }
        .ct-table {
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.06);
        }
        .ct-row {
          display: grid;
          grid-template-columns: 160px 1fr 1fr;
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .ct-row:first-child { border-top: none; }
        .ct-row:not(.ct-header) {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ct-table.ct-revealed .ct-row:not(.ct-header) { opacity: 1; transform: translateY(0); }
        .ct-header { background: transparent; }
        .ct-cell { padding: 20px 24px; display: flex; align-items: center; gap: 10px; }
        .ct-cell-label {
          font-family: 'DM Sans'; font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          color: rgba(10,10,10,0.4); text-transform: uppercase;
        }
        .ct-col-classique { background: #f0f0f3; }
        .ct-col-auchu {
          background: #ffffff;
          border-left: 2px solid ${BLUE};
          box-shadow: inset 0 0 36px rgba(0,61,165,0.05);
        }
        .ct-col-title {
          font-family: 'DM Sans'; font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(10,10,10,0.45);
        }
        .ct-col-title-auchu { color: ${BLUE}; }
        .ct-text-classique { font-family: 'DM Sans'; font-size: 14px; color: rgba(10,10,10,0.45); line-height: 1.5; }
        .ct-text-auchu { font-family: 'DM Sans'; font-size: 14px; font-weight: 600; color: ${BLACK}; line-height: 1.5; }
        .ct-cross {
          flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          color: rgba(10,10,10,0.32); font-size: 11px; background: rgba(10,10,10,0.06);
        }
        .ct-check {
          flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: ${BLUE};
          transform: scale(0.6); opacity: 0;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease;
        }
        .ct-table.ct-revealed .ct-check { transform: scale(1); opacity: 1; }

        .ct-mobile { display: none; }

        ${delayRules}

        @media (max-width: 768px) {
          .ct-table { display: none; }
          .ct-mobile { display: flex; flex-direction: column; gap: 12px; }
          .ct-card {
            background: #fff;
            border-radius: 22px;
            padding: 20px;
            border: 1px solid #e6e8f0;
            box-shadow: 0 8px 24px rgba(10,10,20,0.05);
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
          }
          .ct-mobile.ct-revealed .ct-card { opacity: 1; transform: translateY(0); }
          .ct-card-title {
            font-family: 'DM Sans'; font-size: 15px; font-weight: 600;
            color: #5a5f70; margin-bottom: 14px;
          }
          .ct-card-line { display: flex; align-items: flex-start; gap: 12px; }
          .ct-card-sep { height: 1px; background: #eceef4; margin: 14px 0; }
          .ct-card-classique .ct-cross {
            width: 24px; height: 24px; font-size: 12px;
            background: #eef0f5; color: #9aa0b2;
          }
          .ct-card-classique span {
            font-family: 'DM Sans'; font-size: 15px; color: #8b90a0; line-height: 1.4;
            padding-top: 2px;
          }
          .ct-card-auchu .ct-check { width: 24px; height: 24px; }
          .ct-card-auchu span {
            font-family: 'DM Sans'; font-size: 16px; font-weight: 600; color: ${BLACK}; line-height: 1.4;
            padding-top: 2px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-row:not(.ct-header), .ct-check, .ct-card { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
