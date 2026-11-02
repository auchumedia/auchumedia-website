import React, { useEffect, useMemo, useRef, useState } from 'react';
import { stats } from '../data/showcase';

const SEP = ' ';

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function toGroupedTokens(n) {
  const digits = String(n).split('');
  const tokens = [];
  let count = 0;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    tokens.unshift(digits[i]);
    count += 1;
    if (count % 3 === 0 && i !== 0) tokens.unshift(SEP);
  }
  return tokens;
}

function OdometerDigit({ digit, active, delayMs }) {
  const trackRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const track = trackRef.current;
    if (!track) return undefined;
    const rowHeight = track.parentElement.clientHeight;
    const duration = 2000;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - startTime - delayMs;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(t);
      track.style.transform = `translate3d(0, ${(-digit * rowHeight * eased).toFixed(2)}px, 0)`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [active, digit, delayMs]);

  return (
    <span className="odo-digit" aria-hidden="true">
      <span className="odo-track" ref={trackRef}>
        {'0123456789'.split('').map((d) => <span key={d} className="odo-row">{d}</span>)}
      </span>
    </span>
  );
}

function StatValue({ stat, active, reduced }) {
  const tokens = useMemo(() => toGroupedTokens(stat.value), [stat.value]);

  if (reduced) {
    return (
      <div className="stats-value">
        {stat.prefix}{stat.value.toLocaleString('fr-CA')}{stat.suffix}
      </div>
    );
  }

  let digitIndex = -1;
  return (
    <div className="stats-value" aria-label={`${stat.prefix}${stat.value.toLocaleString('fr-CA')}${stat.suffix}`}>
      {stat.prefix && <span className="stats-fixed">{stat.prefix}</span>}
      {tokens.map((tok, idx) => {
        if (tok === SEP) return <span key={idx} className="odo-sep">{SEP}</span>;
        digitIndex += 1;
        return <OdometerDigit key={idx} digit={Number(tok)} active={active} delayMs={digitIndex * 120} />;
      })}
      {stat.suffix && <span className="stats-fixed">{stat.suffix}</span>}
    </div>
  );
}

export default function StatsBlock() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

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
        {stats.map((s) => (
          <div className="stats-col" key={s.client || s.label}>
            <StatValue stat={s} active={active} reduced={reduced} />
            <div className="stats-label">{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-wrap {
          position: relative;
          z-index: 2;
          margin-top: -40px;
          padding: 0 20px;
        }
        .stats-block {
          position: relative;
          z-index: 5;
          max-width: 820px;
          margin: 0 auto;
          margin-bottom: -93px;
          background: #0a0a0a;
          border-radius: 20px;
          display: flex;
          padding: 40px 32px;
        }
        .stats-col {
          flex: 1;
          padding: 0 24px;
          border-left: 1px solid rgba(255,255,255,0.12);
          text-align: center;
        }
        .stats-col:first-child { border-left: none; }

        .stats-value {
          display: flex;
          align-items: baseline;
          justify-content: center;
          font-family: 'Bebas Neue';
          font-size: clamp(44px, 6vw, 72px);
          line-height: 1;
          color: #cfe0ff;
        }
        .stats-fixed { display: inline-block; }
        .odo-digit {
          display: inline-block;
          overflow: hidden;
          height: 1em;
          line-height: 1;
          vertical-align: top;
        }
        .odo-track { display: block; will-change: transform; }
        .odo-row { display: block; height: 1em; line-height: 1; }
        .odo-sep { display: inline-block; width: 0.28em; }

        .stats-label {
          font-family: 'DM Sans';
          font-size: 14px;
          color: #fff;
          margin-top: 12px;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .stats-wrap { padding: 0 12px; }
          .stats-block { padding: 28px 10px; margin-bottom: -58px; }
          .stats-col { padding: 0 8px; }
          .stats-value { font-size: clamp(28px, 8vw, 40px); }
          .stats-label { font-size: 11px; margin-top: 8px; }
        }
      `}</style>
    </div>
  );
}
