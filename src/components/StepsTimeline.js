import React, { useEffect, useRef } from 'react';

const STEPS = [
  { num: '01', titre: 'STRATÉGIE & POSITIONNEMENT', texte: "On définit ton angle, ton audience et ce qui te rend différent. Chaque série part d'un objectif clair." },
  { num: '02', titre: 'ÉCRITURE & STORYTELLING', texte: 'On écrit des histoires, pas des scripts génériques : accroche, tension, preuve, appel à l\'action.' },
  { num: '03', titre: 'TOURNAGE & MONTAGE', texte: 'Une vidéo par semaine, tournée et montée avec soin : image, rythme et sous-titres pensés pour retenir l\'attention.' },
  { num: '04', titre: 'DIFFUSION & CROISSANCE', texte: "On publie, on mesure l'attention, l'engagement et les abonnés, puis on amplifie ce qui fonctionne." },
];

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

export default function StepsTimeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      if (lineRef.current) lineRef.current.style.transform = 'scaleY(1)';
      stepRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return undefined;
    }

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = clamp((vh - rect.top) / (vh + rect.height * 0.4), 0, 1);

        if (lineRef.current) lineRef.current.style.transform = `scaleY(${p.toFixed(4)})`;

        const n = STEPS.length;
        const windowSize = 1 / n;
        stepRefs.current.forEach((stepEl, i) => {
          if (!stepEl) return;
          const threshold = i / n;
          const local = clamp((p - threshold) / windowSize, 0, 1);
          const eased = easeOutCubic(local);
          stepEl.style.opacity = eased.toFixed(3);
          stepEl.style.transform = `translateY(${(24 * (1 - eased)).toFixed(2)}px)`;
        });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sectionRef} className="steps-timeline">
      <div className="steps-line-track">
        <div ref={lineRef} className="steps-line-fill" />
      </div>

      <div className="steps-list">
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => { stepRefs.current[i] = el; }}
            className={`steps-item ${i % 2 === 0 ? 'steps-item-left' : 'steps-item-right'}`}
            style={{ opacity: 0, transform: 'translateY(24px)' }}
          >
            <span className="steps-dot" />
            <div className="steps-num">{s.num}</div>
            <div className="steps-titre">{s.titre}</div>
            <p className="steps-texte">{s.texte}</p>
          </div>
        ))}
      </div>

      <style>{`
        .steps-timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding-top: 8px;
        }
        .steps-line-track {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(0,61,165,0.12);
          transform: translateX(-50%);
        }
        .steps-line-fill {
          width: 100%;
          height: 100%;
          background: #003DA5;
          transform-origin: top;
          transform: scaleY(0);
          will-change: transform;
        }
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 64px;
          position: relative;
        }
        .steps-item {
          position: relative;
          width: 46%;
          will-change: transform, opacity;
        }
        .steps-item-left { margin-right: auto; text-align: right; padding-right: 48px; }
        .steps-item-right { margin-left: auto; text-align: left; padding-left: 48px; }
        .steps-dot {
          position: absolute;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #003DA5;
          border: 3px solid #f8f8fa;
          box-shadow: 0 0 0 1px rgba(0,61,165,0.25);
        }
        .steps-item-left .steps-dot { right: -54px; }
        .steps-item-right .steps-dot { left: -54px; }
        .steps-num {
          font-family: 'Bebas Neue';
          font-size: 40px;
          color: #003DA5;
          line-height: 1;
          margin-bottom: 8px;
        }
        .steps-titre {
          font-family: 'DM Sans';
          font-size: 16px;
          font-weight: 700;
          color: #0a0a0a;
          margin-bottom: 10px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .steps-texte {
          font-family: 'DM Sans';
          font-size: 14px;
          color: rgba(10,10,10,0.6);
          line-height: 1.7;
          margin: 0;
        }
        @media (max-width: 768px) {
          .steps-line-track { left: 18px; transform: none; }
          .steps-item,
          .steps-item-left,
          .steps-item-right {
            width: 100%;
            margin: 0;
            text-align: left;
            padding-left: 48px;
            padding-right: 0;
          }
          .steps-item-left .steps-dot,
          .steps-item-right .steps-dot {
            left: -36px;
            right: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .steps-item { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
