import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowButton from './ArrowButton';

const BLUE = '#003DA5';
const BLACK = '#0a0a0a';

const ROWS = [
  { critere: 'Le volume', classique: '20 à 30 vidéos par mois, produites à la chaîne', auchu: '4 vidéos/mois par client, pensées une à une' },
  { critere: 'Le contenu', classique: 'Contenu générique, recopié sur les tendances', auchu: 'Storytelling propre à ta marque et à ton histoire' },
  { critere: 'Le format', classique: 'Vidéos isolées, sans fil conducteur', auchu: "Séries d'épisodes qui font revenir ton audience" },
  { critere: "L'objectif", classique: 'Publier pour publier', auchu: "Chaque vidéo a un but : capter l'attention, bâtir la confiance, convertir" },
  { critere: "L'équipe", classique: 'Un junior sur ton compte, un interlocuteur qui change', auchu: 'Raphaël et Benjamin directement sur ton mandat' },
];

function Check({ delay = 0 }) {
  return (
    <span className="ct-check" style={{ transitionDelay: `${delay}s` }}>
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
  const navigate = useNavigate();
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

  const rowDelay = (i) => i * 0.09;

  return (
    <div ref={ref} className="ct-wrap">
      {/* Desktop / iPad: 3 columns, AuchuMedia in a tall overlay card */}
      <div className={`ct2-table ${inView ? 'revealed' : ''}`}>
        <div className="ct2-card-bg" style={{ gridColumn: 3, gridRow: '1 / 8' }} />

        <div style={{ gridColumn: 1, gridRow: 1 }} />
        <div className="ct2-header-classique" style={{ gridColumn: 2, gridRow: 1 }}>Une agence classique</div>
        <div className="ct2-header-auchu" style={{ gridColumn: 3, gridRow: 1 }}>
          <span className="ct2-auchu-name">AuchuMedia</span>
        </div>

        {ROWS.map((r, i) => (
          <React.Fragment key={r.critere}>
            <div
              className={`ct2-label ${i > 0 ? 'ct2-bordered' : ''} ct2-row-cell`}
              style={{ gridColumn: 1, gridRow: i + 2, transitionDelay: `${rowDelay(i)}s` }}
            >
              {r.critere}
            </div>
            <div
              className={`ct2-classique ${i > 0 ? 'ct2-bordered' : ''} ct2-row-cell`}
              style={{ gridColumn: 2, gridRow: i + 2, transitionDelay: `${rowDelay(i)}s` }}
            >
              <Cross />
              <span>{r.classique}</span>
            </div>
            <div
              className={`ct2-auchu ${i > 0 ? 'ct2-bordered' : ''} ct2-row-cell`}
              style={{ gridColumn: 3, gridRow: i + 2, transitionDelay: `${rowDelay(i)}s` }}
            >
              <Check delay={rowDelay(i) + 0.15} />
              <span>{r.auchu}</span>
            </div>
          </React.Fragment>
        ))}

        <div style={{ gridColumn: 1, gridRow: 7 }} />
        <div style={{ gridColumn: 2, gridRow: 7 }} />
        <div className="ct2-footer-cta" style={{ gridColumn: 3, gridRow: 7 }}>
          <ArrowButton lift onClick={() => navigate('/planifier-un-appel')} style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}>
            Planifier un appel
          </ArrowButton>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className={`ct-mobile ${inView ? 'revealed' : ''}`}>
        {ROWS.map((r, i) => (
          <div className="ct-card" key={r.critere} style={{ transitionDelay: `${rowDelay(i)}s` }}>
            <div className="ct-card-title">{r.critere}</div>
            <div className="ct-card-line ct-card-classique">
              <Cross />
              <span>{r.classique}</span>
            </div>
            <div className="ct-card-sep" />
            <div className="ct-card-line ct-card-auchu">
              <Check delay={rowDelay(i) + 0.15} />
              <span>{r.auchu}</span>
            </div>
          </div>
        ))}

        <div className="ct-mobile-cta">
          <ArrowButton lift onClick={() => navigate('/planifier-un-appel')}>
            Planifier un appel
          </ArrowButton>
        </div>
      </div>

      <style>{`
        .ct-wrap { max-width: 1100px; margin: 0 auto; }

        /* ---- shared check / cross ---- */
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
        .ct2-table.revealed .ct-check,
        .ct-mobile.revealed .ct-check { transform: scale(1); opacity: 1; }

        /* ---- desktop / iPad 3-column table ---- */
        .ct2-table {
          position: relative;
          display: grid;
          grid-template-columns: 180px 1fr 1fr;
        }
        .ct2-card-bg {
          position: relative;
          background: #ffffff;
          border: 1.5px solid ${BLUE};
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(0,61,165,0.15);
          margin: -28px 0;
          z-index: 1;
        }
        .ct2-header-classique {
          position: relative; z-index: 2;
          text-align: center;
          align-self: end;
          padding-bottom: 20px;
          font-family: 'DM Sans'; font-size: 13px; font-weight: 600;
          color: #8b90a0;
        }
        .ct2-header-auchu {
          position: relative; z-index: 2;
          text-align: center;
          align-self: end;
          padding: 40px 32px 22px;
        }
        .ct2-auchu-name {
          font-family: 'Bebas Neue'; font-size: 26px; letter-spacing: 0.04em;
          color: ${BLUE}; text-transform: uppercase;
        }

        .ct2-row-cell {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ct2-table.revealed .ct2-row-cell { opacity: 1; transform: translateY(0); }
        .ct2-bordered { border-top: 1px solid #eceef4; }

        .ct2-label {
          position: relative; z-index: 2;
          display: flex; align-items: center;
          padding: 22px 20px 22px 4px;
          font-family: 'DM Sans'; font-size: 14px; font-weight: 600;
          color: #5a5f70;
        }
        .ct2-classique {
          position: relative; z-index: 2;
          display: flex; align-items: flex-start; gap: 12px;
          padding: 22px 24px;
        }
        .ct2-classique span {
          font-family: 'DM Sans'; font-size: 14px; color: #8b90a0; line-height: 1.5; padding-top: 1px;
        }
        .ct2-auchu {
          position: relative; z-index: 2;
          display: flex; align-items: flex-start; gap: 12px;
          padding: 22px 32px;
        }
        .ct2-auchu span {
          font-family: 'DM Sans'; font-size: 16px; font-weight: 600; color: ${BLACK}; line-height: 1.5; padding-top: 1px;
        }
        .ct2-footer-cta {
          position: relative; z-index: 2;
          padding: 20px 32px 36px;
        }

        /* ---- mobile stacked cards ---- */
        .ct-mobile { display: none; }
        @media (max-width: 768px) {
          .ct2-table { display: none; }
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
          .ct-mobile.revealed .ct-card { opacity: 1; transform: translateY(0); }
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
          .ct-mobile-cta { display: flex; justify-content: center; margin-top: 8px; }
        }

        /* ---- iPad: same layout, tighter sizing ---- */
        @media (min-width: 769px) and (max-width: 1024px) {
          .ct2-table { grid-template-columns: 140px 1fr 1fr; }
          .ct2-card-bg { margin: -18px 0; border-radius: 22px; }
          .ct2-label { padding: 18px 14px 18px 0; font-size: 13px; }
          .ct2-classique { padding: 18px 18px; }
          .ct2-classique span { font-size: 13px; }
          .ct2-auchu { padding: 18px 22px; }
          .ct2-auchu span { font-size: 14px; }
          .ct2-header-auchu { padding: 28px 22px 16px; }
          .ct2-auchu-name { font-size: 21px; }
          .ct2-footer-cta { padding: 16px 22px 26px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct2-row-cell, .ct-check, .ct-card { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
