import React, { useEffect, useRef, useState } from 'react';
import { stats } from '../data/showcase';

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function StatColumn({ stat, active }) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const duration = 1800;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(stat.value * easeOutExpo(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [active, stat.value]);

  return (
    <div className="stats-col">
      <div className="stats-value">{value.toLocaleString('fr-CA')}{stat.suffix}</div>
      <div className="stats-label">{stat.label}</div>
      <div className="stats-client"><span className="stats-dash" />{stat.client.toUpperCase()}</div>
    </div>
  );
}

export default function StatsBlock() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="stats-wrap">
      <div ref={ref} className="stats-block">
        {stats.map(s => <StatColumn key={s.client} stat={s} active={active} />)}
      </div>
      <p className="stats-disclaimer">
        Résultats de nos clients sur leurs comptes. Les performances varient selon l'offre, le marché et la constance de publication.
      </p>

      <style>{`
        .stats-wrap {
          position: relative;
          z-index: 2;
          margin-top: -40px;
          padding: 0 20px;
        }
        .stats-block {
          max-width: 1000px;
          margin: 0 auto;
          background: #0a0a0a;
          border-radius: 20px;
          display: flex;
          padding: 48px 40px;
        }
        .stats-col {
          flex: 1;
          padding: 0 32px;
          border-left: 1px solid rgba(255,255,255,0.12);
          text-align: center;
        }
        .stats-col:first-child { border-left: none; }
        .stats-value {
          font-family: 'Bebas Neue';
          font-size: clamp(44px, 6vw, 76px);
          line-height: 1;
          background: linear-gradient(100deg, #bcd4ff, #ffffff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stats-label {
          font-family: 'DM Sans';
          font-size: 14px;
          color: #fff;
          margin-top: 12px;
          line-height: 1.5;
        }
        .stats-client {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
          font-family: 'DM Sans';
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
        }
        .stats-dash {
          width: 14px;
          height: 1px;
          background: #4d8bff;
          display: inline-block;
        }
        .stats-disclaimer {
          max-width: 560px;
          margin: 24px auto 0;
          text-align: center;
          font-family: 'DM Sans';
          font-size: 12px;
          color: rgba(10,10,10,0.45);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .stats-block { flex-direction: column; padding: 36px 28px; gap: 28px; }
          .stats-col { border-left: none; border-top: 1px solid rgba(255,255,255,0.12); padding: 24px 0 0; }
          .stats-col:first-child { border-top: none; padding-top: 0; }
        }
      `}</style>
    </div>
  );
}
