import React, { useEffect, useRef, useState } from 'react';
import FanCard from './FanCard';

const ROTATIONS = [-6, 0, 6];
const INTERVAL_MS = 3500;
const SWIPE_THRESHOLD = 36;

export default function FanMobileSlider({ fan }) {
  const pages = [fan.slice(0, 3), fan.slice(3, 6)];
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef(null);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = () => {
    clearTimer();
    if (reducedRef.current) return;
    timerRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    setPage((p) => (dx < 0 ? (p + 1) % pages.length : (p - 1 + pages.length) % pages.length));
    startTimer();
  };

  return (
    <div
      ref={wrapRef}
      className="fan-slider"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)',
      }}
    >
      <div className="fan-slider-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="fan-slider-track" style={{ transform: `translateX(-${page * 50}%)` }}>
          {pages.map((group, gi) => (
            <div className="fan-slider-page" key={gi}>
              {group.map((item, ci) => (
                <div key={item.name} className="fan-slide-card" style={{ transform: `rotate(${ROTATIONS[ci]}deg)` }}>
                  <FanCard item={item} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="fan-slider-dots">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Page ${i + 1}`}
            className={`fan-dot ${i === page ? 'fan-dot-active' : ''}`}
            onClick={() => { setPage(i); startTimer(); }}
          />
        ))}
      </div>

      <style>{`
        .fan-slider { overflow: clip; }
        .fan-slider-viewport { overflow: clip; }
        .fan-slider-track {
          display: flex;
          width: 200%;
          transition: transform 0.7s cubic-bezier(.22,1,.36,1);
          will-change: transform;
        }
        .fan-slider-page {
          display: flex;
          width: 50%;
          justify-content: center;
        }
        .fan-slide-card {
          width: 36vw;
          margin-left: -4vw;
          flex-shrink: 0;
        }
        .fan-slide-card:first-child { margin-left: 0; }
        .fan-slider-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }
        .fan-dot {
          width: 7px;
          height: 7px;
          border-radius: 4px;
          background: rgba(0,61,165,0.25);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: width 0.25s ease, background 0.25s ease;
        }
        .fan-dot-active { background: #003DA5; width: 20px; }
        @media (prefers-reduced-motion: reduce) {
          .fan-slider-track { transition: none; }
        }
      `}</style>
    </div>
  );
}
