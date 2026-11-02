import React, { useEffect, useRef, useState } from 'react';

function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [active, target, duration]);

  return value;
}

export default function RhythmBand() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(4, active);

  return (
    <div ref={ref} className="rhythm-band">
      <div className="rhythm-item">
        <div className="rhythm-number">{count}</div>
        <div className="rhythm-label">Vidéos / mois</div>
      </div>
      <div className="rhythm-sep" />
      <div className="rhythm-item">
        <div className="rhythm-number">1</div>
        <div className="rhythm-label">Par semaine</div>
      </div>
      <div className="rhythm-sep" />
      <div className="rhythm-item">
        <div className="rhythm-number rhythm-number-text">Séries</div>
        <div className="rhythm-label">D'épisodes</div>
      </div>

      <style>{`
        .rhythm-band {
          max-width: 820px;
          margin: 56px auto 0;
          background: #0a0a0a;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 10px;
        }
        .rhythm-item { flex: 1; text-align: center; padding: 0 16px; }
        .rhythm-sep { width: 1px; height: 40px; background: rgba(255,255,255,0.15); flex-shrink: 0; }
        .rhythm-number {
          font-family: 'Bebas Neue';
          font-size: clamp(28px, 3vw, 38px);
          line-height: 1;
          color: #fff;
          text-transform: uppercase;
        }
        .rhythm-number-text { color: #bcd4ff; }
        .rhythm-label {
          font-family: 'DM Sans';
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-top: 8px;
        }
        @media (max-width: 768px) {
          .rhythm-band { border-radius: 24px; padding: 20px 6px; margin-top: 40px; }
          .rhythm-item { padding: 0 4px; }
          .rhythm-number { font-size: clamp(20px, 6.5vw, 28px); }
          .rhythm-sep { height: 32px; }
          .rhythm-label { font-size: 9px; }
        }
      `}</style>
    </div>
  );
}
