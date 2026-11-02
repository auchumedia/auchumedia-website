import React, { useEffect, useRef, useState } from 'react';
import { fan } from '../data/showcase';

const OFFSET = [-2, -1, 0, 1, 2];
const ROTATE_OPEN = [-14, -7, 0, 7, 14];
const Y_OPEN = [60, 18, 0, 18, 60];
const PULL = 70;
const DRIFT_BASE = 40;

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function FanShowcase() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const isMobileRef = useRef(false);
  const reducedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const applyCard = (i, p) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const factor = isMobileRef.current ? 0.5 : 1;
    const offset = OFFSET[i];
    const abs = Math.abs(offset);
    const rotateOpen = ROTATE_OPEN[i] * factor;
    const yOpen = Y_OPEN[i] * factor;
    const pull = -offset * PULL * factor;
    const drift = DRIFT_BASE * (1 + abs * 0.6) * factor;

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
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => { isMobileRef.current = mq.matches; setIsMobile(mq.matches); };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedRef.current = rmq.matches;
      if (rmq.matches) applyAll(0.5);
    };
    update();
    rmq.addEventListener('change', update);
    return () => rmq.removeEventListener('change', update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reducedRef.current) {
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
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="fan-section" aria-label="Résultats clients">
      <div className="fan-row">
        {fan.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`fan-card-wrap ${i === 0 || i === fan.length - 1 ? 'fan-card-edge' : ''}`}
            style={{ zIndex: 10 - Math.abs(OFFSET[i]) }}
          >
            <div className="fan-card-hover">
              <div
                className="fan-card"
                style={{
                  background: item.img
                    ? `url(${item.img}) center / cover no-repeat`
                    : 'linear-gradient(145deg, #14161d, #050506)',
                }}
              >
                {!item.img && <span className="fan-card-placeholder-name">{item.name}</span>}
                <div className="fan-card-overlay" />
                <div className="fan-card-text">
                  <div className="fan-card-name">{item.name}</div>
                  <div className="fan-card-tag">{item.tag}</div>
                  <div className="fan-card-sub">{item.sub}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .fan-section {
          position: relative;
          background: #ffffff;
          padding: 40px 20px 0;
          overflow: clip;
        }
        .fan-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          max-width: 1180px;
          margin: 0 auto;
        }
        .fan-card-wrap {
          position: relative;
          width: 230px;
          margin-left: -46px;
          will-change: transform, opacity;
        }
        .fan-card-wrap:first-child { margin-left: 0; }
        .fan-card-hover {
          transition: transform 0.25s ease;
        }
        .fan-card {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 44px rgba(0,0,0,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fan-card-placeholder-name {
          position: relative;
          z-index: 1;
          font-family: 'Bebas Neue';
          font-size: 24px;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          text-align: center;
          padding: 0 16px;
        }
        .fan-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 40%);
        }
        .fan-card-text {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          z-index: 2;
        }
        .fan-card-name {
          font-family: 'DM Sans';
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          margin-bottom: 8px;
        }
        .fan-card-tag {
          font-family: 'Bebas Neue';
          font-size: 24px;
          line-height: 1;
          color: #bcd4ff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .fan-card-sub {
          font-family: 'DM Sans';
          font-size: 11px;
          color: rgba(255,255,255,0.75);
          margin-top: 4px;
        }
        @media (hover: hover) and (pointer: fine) {
          .fan-card-wrap:hover { z-index: 100 !important; }
          .fan-card-wrap:hover .fan-card-hover { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .fan-section { padding: 24px 20px 0; }
          .fan-card-wrap { width: 118px; margin-left: -26px; }
          .fan-card-wrap:nth-child(2) { margin-left: 0 !important; }
          .fan-card-edge { display: none; }
          .fan-card-name { font-size: 10px; margin-bottom: 5px; }
          .fan-card-tag { font-size: 17px; }
          .fan-card-sub { font-size: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fan-card-hover { transition: none; }
        }
      `}</style>
    </section>
  );
}
