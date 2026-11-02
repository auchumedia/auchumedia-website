import React, { useEffect, useRef } from 'react';
import FanCard from './FanCard';

const OFFSET = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
const ROTATE_OPEN = [-15, -9, -3, 3, 9, 15];
const Y_OPEN = [50, 20, 0, 0, 20, 50];
const PULL = 60;
const DRIFT_BASE = 40;

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function FanArc({ fan, sectionRef }) {
  const cardRefs = useRef([]);

  const applyCard = (i, p) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const offset = OFFSET[i];
    const abs = Math.abs(offset);
    const rotateOpen = ROTATE_OPEN[i];
    const yOpen = Y_OPEN[i];
    const pull = -offset * PULL;
    const drift = DRIFT_BASE * (1 + abs * 0.5);

    let rotate, x, y, scale, opacity;
    if (p <= 0.5) {
      const t = easeOutCubic(Math.min(1, Math.max(0, p / 0.5)));
      rotate = lerp(0, rotateOpen, t);
      x = lerp(pull, 0, t);
      y = lerp(0, yOpen, t);
      scale = lerp(0.92, 1, t);
      opacity = lerp(0.6, 1, t);
    } else {
      const t = easeOutCubic(Math.min(1, Math.max(0, (p - 0.5) / 0.5)));
      rotate = lerp(rotateOpen, rotateOpen * 0.4, t);
      x = 0;
      y = lerp(yOpen, yOpen - drift, t);
      scale = 1;
      opacity = 1;
    }

    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    el.style.opacity = opacity.toFixed(3);
  };

  const applyAll = (p) => {
    for (let i = 0; i < fan.length; i += 1) applyCard(i, p);
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      applyAll(0.5);
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
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height * 0.3)));
        el.style.setProperty('--p', p.toFixed(4));
        applyAll(p);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fan-row">
      {fan.map((item, i) => (
        <div
          key={item.name}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="fan-card-wrap"
          style={{ zIndex: Math.round(10 - Math.abs(OFFSET[i]) * 2) }}
        >
          <div className="fan-card-hover">
            <FanCard item={item} />
          </div>
        </div>
      ))}

      <style>{`
        .fan-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          max-width: 1180px;
          margin: 0 auto;
        }
        .fan-card-wrap {
          position: relative;
          width: 210px;
          margin-left: -48px;
          will-change: transform, opacity;
        }
        .fan-card-wrap:first-child { margin-left: 0; }
        .fan-card-hover {
          transition: transform 0.25s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .fan-card-wrap:hover { z-index: 100 !important; }
          .fan-card-wrap:hover .fan-card-hover { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fan-card-hover { transition: none; }
        }
      `}</style>
    </div>
  );
}
