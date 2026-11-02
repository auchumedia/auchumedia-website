import React, { useEffect, useRef, useState } from 'react';
import FanCard from './FanCard';

const STACKED = { x: 0, rotate: 0, y: 80, scale: 0.88, opacity: 0.4 };

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function getConfig(isMobile) {
  if (isMobile) {
    const step = window.innerWidth * 0.34;
    return { step, rotatePer: 4, rotateMax: 14, dragPxPerCard: step };
  }
  return { step: 210, rotatePer: 6, rotateMax: 20, dragPxPerCard: 200 };
}

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
}

function defaultPos(isMobile) {
  return isMobile ? 0 : 2;
}

export default function FanCoverflow({ fan, sectionRef }) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const maxIndex = fan.length - 1;

  const initialMobile = isMobileViewport();
  const posRef = useRef(defaultPos(initialMobile));
  const sRef = useRef(0);
  const reducedRef = useRef(false);
  const isMobileRef = useRef(initialMobile);
  const activeIndexRef = useRef(defaultPos(initialMobile));

  const dragRef = useRef({ active: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, velocity: 0, moved: false });
  const snapRafRef = useRef(null);
  const scrollRafRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(defaultPos(initialMobile));
  const [hintVisible, setHintVisible] = useState(true);

  const applyCard = (i, pos, s) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const cfg = getConfig(isMobileRef.current);
    const offset = i - pos;
    const abs = Math.abs(offset);

    const openX = offset * cfg.step;
    const openRotate = clamp(offset * cfg.rotatePer, -cfg.rotateMax, cfg.rotateMax);
    const openY = Math.pow(abs, 1.6) * 10;
    const openScale = 1 - 0.06 * Math.min(abs, 3);
    const openOpacity = 1 - 0.12 * Math.max(0, abs - 2);

    const x = lerp(STACKED.x, openX, s);
    const rotate = lerp(STACKED.rotate, openRotate, s);
    const y = lerp(STACKED.y, openY, s);
    const scale = lerp(STACKED.scale, openScale, s);
    const opacity = lerp(STACKED.opacity, openOpacity, s);
    const z = Math.round(100 - abs * 10);

    el.style.transform = `translate3d(-50%, 0, 0) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    el.style.opacity = opacity.toFixed(3);
    el.style.zIndex = String(z);
  };

  const render = () => {
    const pos = posRef.current;
    const s = reducedRef.current ? 1 : sRef.current;
    for (let i = 0; i < fan.length; i += 1) applyCard(i, pos, s);

    const nearest = clamp(Math.round(pos), 0, maxIndex);
    if (nearest !== activeIndexRef.current) {
      activeIndexRef.current = nearest;
      setActiveIndex(nearest);
    }
  };

  const cancelSnap = () => {
    if (snapRafRef.current) { cancelAnimationFrame(snapRafRef.current); snapRafRef.current = null; }
  };

  const animateTo = (target) => {
    cancelSnap();
    const clampedTarget = clamp(target, 0, maxIndex);
    const from = posRef.current;
    const diff = clampedTarget - from;
    const duration = 450;
    const startTime = performance.now();
    const tick = (now) => {
      const t = clamp((now - startTime) / duration, 0, 1);
      const eased = easeOutCubic(t);
      posRef.current = from + diff * eased;
      render();
      if (t < 1) {
        snapRafRef.current = requestAnimationFrame(tick);
      } else {
        posRef.current = clampedTarget;
        render();
        snapRafRef.current = null;
      }
    };
    snapRafRef.current = requestAnimationFrame(tick);
  };

  const hideHint = () => setHintVisible(false);

  // --- Scroll-linked opening factor ---
  useEffect(() => {
    const onScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = clamp((vh - rect.top) / (vh + rect.height * 0.3), 0, 1);
        sRef.current = easeOutCubic(clamp(p / 0.5, 0, 1));
        render();
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Mobile breakpoint + reduced motion ---
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = rmq.matches;
    render();

    const onMobileChange = (e) => {
      isMobileRef.current = e.matches;
      animateTo(defaultPos(e.matches));
    };
    const onReducedChange = (e) => {
      reducedRef.current = e.matches;
      render();
    };

    mq.addEventListener('change', onMobileChange);
    rmq.addEventListener('change', onReducedChange);
    return () => {
      mq.removeEventListener('change', onMobileChange);
      rmq.removeEventListener('change', onReducedChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => cancelSnap(), []);

  // --- Pointer drag ---
  const onPointerDown = (e) => {
    cancelSnap();
    hideHint();
    const d = dragRef.current;
    d.active = true;
    d.moved = false;
    d.startX = e.clientX;
    d.startPos = posRef.current;
    d.lastX = e.clientX;
    d.lastT = performance.now();
    d.velocity = 0;
    if (trackRef.current) trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const cfg = getConfig(isMobileRef.current);
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;

    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = now;

    const raw = d.startPos - dx / cfg.dragPxPerCard;
    let next = raw;
    if (raw < 0) next = raw * 0.35;
    else if (raw > maxIndex) next = maxIndex + (raw - maxIndex) * 0.35;
    posRef.current = next;
    render();
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;

    const cfg = getConfig(isMobileRef.current);
    const velCardsPerMs = -d.velocity / cfg.dragPxPerCard;
    const projected = posRef.current + velCardsPerMs * 140;
    animateTo(Math.round(clamp(projected, 0, maxIndex)));
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      hideHint();
      animateTo(Math.round(posRef.current) - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      hideHint();
      animateTo(Math.round(posRef.current) + 1);
    }
  };

  const handleCardClick = (i) => {
    if (dragRef.current.moved) return;
    hideHint();
    animateTo(i);
  };

  return (
    <div className="fan-coverflow">
      <div
        ref={trackRef}
        className="fan-coverflow-track"
        tabIndex={0}
        role="group"
        aria-label="Éventail de clients, glisser pour parcourir"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {fan.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="fan-coverflow-card"
            onClick={() => handleCardClick(i)}
          >
            <FanCard item={item} />
          </div>
        ))}
      </div>

      <div className={`fan-hint ${hintVisible ? '' : 'fan-hint-hidden'}`}>
        <span>Glisse pour découvrir</span>
        <span className="fan-hint-arrow">↔</span>
      </div>

      <div className="fan-dots">
        {fan.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Carte ${i + 1}`}
            className={`fan-dot ${i === activeIndex ? 'fan-dot-active' : ''}`}
            onClick={() => { hideHint(); animateTo(i); }}
          />
        ))}
      </div>

      <style>{`
        .fan-coverflow {
          position: relative;
          overflow: clip;
          padding: 24px 0 70px;
        }
        .fan-coverflow-track {
          position: relative;
          height: 436px;
          max-width: 100%;
          margin: 0 auto;
          cursor: grab;
          user-select: none;
          touch-action: pan-y;
          outline: none;
        }
        .fan-coverflow-track:active {
          cursor: grabbing;
        }
        .fan-coverflow-card {
          position: absolute;
          top: 0;
          left: 50%;
          width: 280px;
          will-change: transform, opacity;
          cursor: pointer;
        }
        .fan-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
          font-family: 'DM Sans';
          font-size: 12px;
          color: rgba(10,10,10,0.4);
          transition: opacity 0.4s ease;
          opacity: 1;
        }
        .fan-hint-hidden {
          opacity: 0;
          pointer-events: none;
        }
        .fan-hint-arrow {
          font-size: 14px;
        }
        .fan-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
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
        .fan-dot-active {
          background: #003DA5;
          width: 20px;
        }
        @media (max-width: 768px) {
          .fan-coverflow-track { height: 93vw; }
          .fan-coverflow-card { width: 60vw; }
        }
      `}</style>
    </div>
  );
}
