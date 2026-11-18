import React, { useEffect, useRef, useState } from 'react';
import { testimonials } from '../data/testimonials';

const FLICK_THRESHOLD = 0.35; // px/ms

function initials(nom) {
  return nom
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function TestimonialCard({ t, index, reveal, reduced, isPlaying, onPlay }) {
  const [revealed, setRevealed] = useState(false);
  const [settled, setSettled] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!reveal) return undefined;
    if (reduced) { setRevealed(true); setSettled(true); return undefined; }
    const t1 = setTimeout(() => setRevealed(true), index * 120);
    const t2 = setTimeout(() => setSettled(true), index * 120 + 750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reveal, reduced, index]);

  useEffect(() => {
    if (!isPlaying && videoRef.current) videoRef.current.pause();
  }, [isPlaying]);

  const hasVideo = Boolean(t.video);

  return (
    <article className={`testi-card ${revealed ? 'is-in' : ''} ${settled ? 'is-settled' : ''}`}>
      {hasVideo && (
        <div className="testi-video-wrap">
          {isPlaying ? (
            <video
              ref={videoRef}
              className="testi-video"
              src={t.video}
              poster={t.poster || undefined}
              controls
              autoPlay
              crossOrigin="anonymous"
              preload="none"
            />
          ) : (
            <button
              type="button"
              className="testi-video-poster"
              style={t.poster ? { backgroundImage: `url(${t.poster})` } : undefined}
              onClick={onPlay}
              aria-label={`Voir le témoignage vidéo de ${t.nom}`}
            >
              <span className="testi-play-btn">▶</span>
            </button>
          )}
        </div>
      )}
      <div className="testi-quote-mark" aria-hidden="true">“</div>
      <div className="testi-stars" aria-hidden="true">★★★★★</div>
      <p className="testi-texte">"{t.texte}"</p>
      <div className="testi-footer">
        <span className="testi-avatar" aria-hidden="true">{initials(t.nom)}</span>
        <div>
          <div className="testi-nom">{t.nom}</div>
          <div className="testi-role">{t.titre}</div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef({
    dragging: false, moved: false, suppressClick: false,
    startX: 0, startScrollLeft: 0, lastX: 0, lastT: 0, velocity: 0,
  });

  const [headerIn, setHeaderIn] = useState(false);
  const [cardsIn, setCardsIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHeaderIn(true); setCardsIn(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const center = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let closestDist = Infinity;
        Array.from(el.children).forEach((child, i) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(childCenter - center);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        setActiveIndex(closest);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const nearestIndex = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(childCenter - center);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  };

  const scrollToIndex = (i) => {
    const el = trackRef.current;
    const child = el?.children[i];
    if (!el || !child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  // Mouse-only drag. Touch is left entirely to native scroll-snap scrolling.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    dragRef.current = {
      dragging: true, moved: false, suppressClick: false,
      startX: e.clientX, startScrollLeft: el.scrollLeft,
      lastX: e.clientX, lastT: performance.now(), velocity: 0,
    };
    el.setPointerCapture?.(e.pointerId);
    el.classList.add('is-dragging', 'no-snap');
  };

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const st = dragRef.current;
    const el = trackRef.current;
    if (!st.dragging || !el) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 5) st.moved = true;
    el.scrollLeft = st.startScrollLeft - dx;
    const now = performance.now();
    const dt = now - st.lastT;
    if (dt > 0) st.velocity = (e.clientX - st.lastX) / dt;
    st.lastX = e.clientX;
    st.lastT = now;
  };

  const endDrag = (e) => {
    if (e && e.pointerType && e.pointerType !== 'mouse') return;
    const st = dragRef.current;
    const el = trackRef.current;
    if (!st.dragging) return;
    st.dragging = false;
    st.suppressClick = st.moved;
    el?.classList.remove('is-dragging', 'no-snap');
    if (!el) return;

    let target = nearestIndex();
    const count = testimonials.length;
    if (Math.abs(st.velocity) > FLICK_THRESHOLD) {
      if (st.velocity < 0 && target < count - 1) target += 1;
      else if (st.velocity > 0 && target > 0) target -= 1;
    }
    scrollToIndex(target);
  };

  const onDragStart = (e) => e.preventDefault();

  const onClickCapture = (e) => {
    if (dragRef.current.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handlePlay = (id) => {
    if (dragRef.current.suppressClick) return;
    setPlayingId(id);
  };

  return (
    <section id="temoignages" className="section-pad testi-section">
      <div className="testi-halo" aria-hidden="true" />

      <div className="testi-inner">
        <div ref={headerRef} className={`testi-header ${headerIn || reduced ? 'is-in' : ''}`}>
          <div className="testi-label">Ils parlent de nous</div>
          <h2 className="testi-title">
            <span className="testi-title-white">Ce que nos clients </span>
            <span className="testi-gradient-line">Disent.</span>
          </h2>
        </div>

        <div
          ref={trackRef}
          className="testi-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onDragStart={onDragStart}
          onClickCapture={onClickCapture}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              t={t}
              index={i}
              reveal={cardsIn}
              reduced={reduced}
              isPlaying={playingId === t.id}
              onPlay={() => handlePlay(t.id)}
            />
          ))}
        </div>

        <div className="testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`testi-dot ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .testi-section {
          position: relative;
          background: #0a0a0a;
          overflow: clip;
          padding: 52px 60px 72px;
          text-align: center;
        }

        .testi-halo {
          position: absolute;
          top: 6%;
          left: 50%;
          width: 70vw;
          max-width: 900px;
          height: 900px;
          transform: translate(-50%, 0);
          background: radial-gradient(circle, rgba(0,61,165,0.25), transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
          animation: testiHaloDrift 22s ease-in-out infinite;
        }
        @keyframes testiHaloDrift {
          0%, 100% { transform: translate(-54%, -2%) scale(1); opacity: 0.9; }
          50% { transform: translate(-46%, 4%) scale(1.08); opacity: 1; }
        }

        .testi-inner {
          position: relative;
          z-index: 2;
          max-width: 960px;
          margin: 0 auto;
        }

        .testi-header {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .testi-header.is-in { opacity: 1; transform: none; }

        .testi-label {
          font-family: 'DM Sans';
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8fb4ff;
          margin-bottom: 14px;
        }
        .testi-title {
          font-family: 'Bebas Neue';
          font-size: clamp(40px, 6vw, 84px);
          line-height: 1.05;
          text-transform: uppercase;
          white-space: nowrap;
          margin: 0 0 40px;
        }
        .testi-title-white { color: #fff; }
        .testi-gradient-line {
          background: linear-gradient(100deg, #6fa0ff 0%, #3f78e8 50%, #6fa0ff 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: testiReflet 6s ease-in-out infinite;
        }
        @keyframes testiReflet {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .testi-track {
          --card-w: 320px;
          display: flex;
          gap: 20px;
          overflow-x: auto;
          overscroll-behavior-x: contain;
          scroll-snap-type: x mandatory;
          scroll-behavior: auto;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y;
          padding: 4px 4px 20px;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .testi-track::-webkit-scrollbar { display: none; }
        .testi-track.is-dragging { cursor: grabbing; }
        .testi-track.no-snap { scroll-snap-type: none; }

        .testi-card {
          position: relative;
          flex: 0 0 var(--card-w);
          width: var(--card-w);
          scroll-snap-align: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 22px;
          padding: 24px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          text-align: left;
          opacity: 0;
          transform: translateY(30px) scale(0.96);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .testi-card.is-in { opacity: 1; transform: none; }
        .testi-card.is-settled {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .testi-card:hover {
          transform: translateY(-6px);
          border-color: #3f78e8;
          box-shadow: 0 20px 60px rgba(0,61,165,0.35);
        }

        .testi-video-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
          background: #000;
        }
        .testi-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .testi-video-poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          padding: 0;
          cursor: pointer;
          background-color: #11182c;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testi-play-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #003DA5;
          color: #fff;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testi-quote-mark {
          font-family: 'Bebas Neue';
          font-size: 48px;
          line-height: 1;
          color: rgba(63,120,232,0.35);
          margin-bottom: -12px;
        }
        .testi-stars {
          color: #f5b301;
          font-size: 13px;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .testi-texte {
          font-family: 'DM Sans';
          font-size: 16px;
          color: #fff;
          line-height: 1.55;
          margin: 0 0 22px;
          flex: 1;
        }
        .testi-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }
        .testi-avatar {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #003DA5;
          color: #fff;
          font-family: 'DM Sans';
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testi-nom { font-family: 'DM Sans'; font-weight: 700; color: #fff; font-size: 13px; }
        .testi-role { font-family: 'DM Sans'; color: rgba(255,255,255,0.6); font-size: 12px; margin-top: 2px; }

        .testi-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }
        .testi-dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.2);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .testi-dot.is-active { width: 24px; background: #6fa0ff; }

        @media (max-width: 1024px) {
          .testi-track { --card-w: 300px; }
        }
        @media (max-width: 900px) {
          .testi-section { padding-left: 20px; padding-right: 20px; }
        }
        @media (max-width: 768px) {
          .testi-section { padding-top: 32px; padding-bottom: 60px; }
          .testi-title { font-size: min(9.5vw, 56px); margin-bottom: 32px; }
          .testi-track { --card-w: 78vw; gap: 14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .testi-halo, .testi-gradient-line { animation: none !important; }
          .testi-header, .testi-card { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
