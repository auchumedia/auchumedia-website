import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowButton from './ArrowButton';
import { testimonials } from '../data/testimonials';

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
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, scrollLeft: 0, moved: false });

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

  const scrollToIndex = (i) => {
    const el = trackRef.current;
    const child = el?.children[i];
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { dragging: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    el.setPointerCapture?.(e.pointerId);
    el.classList.add('is-dragging');
  };
  const onPointerMove = (e) => {
    const st = dragRef.current;
    const el = trackRef.current;
    if (!st.dragging || !el) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 5) st.moved = true;
    el.scrollLeft = st.scrollLeft - dx;
  };
  const endDrag = () => {
    dragRef.current.dragging = false;
    trackRef.current?.classList.remove('is-dragging');
  };

  const handlePlay = (id) => {
    if (dragRef.current.moved) return;
    setPlayingId(id);
  };

  return (
    <section id="temoignages" className="section-pad testi-section">
      <div className="testi-halo" aria-hidden="true" />
      <div className="testi-topline" aria-hidden="true" />

      <div ref={headerRef} className={`testi-header ${headerIn || reduced ? 'is-in' : ''}`}>
        <div className="testi-label">Ils parlent de nous</div>
        <h2 className="testi-title">
          <span className="testi-title-white">Ce que nos clients</span><br />
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

      <div className="testi-cta">
        <ArrowButton lift onClick={() => navigate('/planifier-un-appel')}>
          Planifier un appel
        </ArrowButton>
      </div>

      <style>{`
        .testi-section {
          position: relative;
          z-index: 2;
          margin-top: -40px;
          border-radius: 40px 40px 0 0;
          background: #0a0a0a;
          overflow: clip;
          padding: 160px 60px 140px;
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

        .testi-topline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3f78e8, #6fa0ff, #3f78e8, transparent);
          background-size: 200% 100%;
          animation: testiLineSlide 8s linear infinite;
          z-index: 1;
        }
        @keyframes testiLineSlide {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        .testi-header {
          position: relative;
          z-index: 2;
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
          margin-bottom: 16px;
        }
        .testi-title {
          font-family: 'Bebas Neue';
          font-size: clamp(36px, 5.5vw, 64px);
          line-height: 1.05;
          text-transform: uppercase;
          margin: 0 0 56px;
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
          --card-w: 420px;
          position: relative;
          z-index: 2;
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px max(60px, calc(50% - var(--card-w) / 2)) 24px;
          margin: 0 -60px;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .testi-track::-webkit-scrollbar { display: none; }
        .testi-track.is-dragging { cursor: grabbing; scroll-snap-type: none; }

        .testi-card {
          position: relative;
          flex: 0 0 var(--card-w);
          width: var(--card-w);
          scroll-snap-align: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 26px;
          padding: 32px;
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
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 20px;
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
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #003DA5;
          color: #fff;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testi-quote-mark {
          font-family: 'Bebas Neue';
          font-size: 64px;
          line-height: 1;
          color: rgba(63,120,232,0.35);
          margin-bottom: -18px;
        }
        .testi-stars {
          color: #f5b301;
          font-size: 15px;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }
        .testi-texte {
          font-family: 'DM Sans';
          font-size: 18px;
          color: #fff;
          line-height: 1.6;
          margin: 0 0 28px;
          flex: 1;
        }
        .testi-footer {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: auto;
        }
        .testi-avatar {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #003DA5;
          color: #fff;
          font-family: 'DM Sans';
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testi-nom { font-family: 'DM Sans'; font-weight: 700; color: #fff; font-size: 14px; }
        .testi-role { font-family: 'DM Sans'; color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 2px; }

        .testi-dots {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 32px;
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

        .testi-cta {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }

        @media (max-width: 1100px) {
          .testi-track { --card-w: 360px; }
        }
        @media (max-width: 900px) {
          .testi-section { padding-left: 20px; padding-right: 20px; }
          .testi-track { margin: 0 -20px; padding: 8px max(20px, calc(50% - var(--card-w) / 2)) 24px; }
        }
        @media (max-width: 768px) {
          .testi-section { padding-top: 120px; padding-bottom: 110px; border-radius: 28px 28px 0 0; }
          .testi-track { --card-w: 85vw; gap: 16px; }
          .testi-title { margin-bottom: 44px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .testi-halo, .testi-topline, .testi-gradient-line { animation: none !important; }
          .testi-header, .testi-card { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
