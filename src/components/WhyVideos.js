import React, { useEffect, useRef, useState } from 'react';
import { whyVideos } from '../data/whyVideos';
import MediaPlaceholder from './MediaPlaceholder';

const STEPS = whyVideos.length;
const HYSTERESIS = 0.03; // ±3% of p around a step boundary, to stop flicker when p hovers near it

/* Generates the NxN attribute-selector rules that drive the sticky scene
   purely from the single `data-etape` attribute — no per-frame React state.
   Opacity only: no translateY/scale, so switching steps never moves anything. */
function buildPanelCSS() {
  const rows = [];
  for (let etape = 0; etape < STEPS; etape += 1) {
    for (let idx = 0; idx < STEPS; idx += 1) {
      const sel = `.wv-stage[data-etape="${etape}"] .wv-panel[data-index="${idx}"]`;
      if (idx === etape) {
        rows.push(`${sel} { opacity: 1; pointer-events: auto; }`);
        rows.push(`${sel} .wv-media-kenburns { animation: wvKenburns 8s ease-out forwards; }`);
      } else {
        rows.push(`${sel} { opacity: 0; pointer-events: none; }`);
      }
    }
  }
  return rows.join('\n');
}

/* Segment fill: binary full/empty states are plain attribute-selector CSS
   (cheap, only recomputed when data-etape actually changes). The ACTIVE
   segment's continuous progress is written directly to that one element's
   transform via a ref, every frame — never through a CSS custom property
   on the stage (which would restyle the whole subtree each frame). */
function buildSegmentCSS() {
  const rows = [];
  for (let etape = 0; etape < STEPS; etape += 1) {
    for (let idx = 0; idx < STEPS; idx += 1) {
      const sel = `.wv-stage[data-etape="${etape}"] .wv-seg[data-index="${idx}"] .wv-seg-fill`;
      if (idx < etape) rows.push(`${sel} { transform: scaleX(1); }`);
      else if (idx > etape) rows.push(`${sel} { transform: scaleX(0); }`);
    }
  }
  return rows.join('\n');
}

const PANEL_CSS = buildPanelCSS();
const SEGMENT_CSS = buildSegmentCSS();

/* Detects "is this step currently active?" without touching the scroll
   handler. In the normal sticky scene it watches the ancestor .wv-stage's
   data-etape attribute (MutationObserver). When reduced-motion forces the
   static list, panels are laid out normally so a plain IntersectionObserver
   on the element itself reports real, independent visibility. */
function useVisualActive(ref, stepIndex) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const section = el.closest('.wv-section');
    const stage = el.closest('.wv-stage');

    if (section && section.classList.contains('wv-reduced')) {
      const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.3 });
      io.observe(el);
      return () => io.disconnect();
    }
    if (stage) {
      const check = () => setActive(stage.dataset.etape === String(stepIndex));
      check();
      const mo = new MutationObserver(check);
      mo.observe(stage, { attributes: true, attributeFilter: ['data-etape'] });
      return () => mo.disconnect();
    }
    return undefined;
  }, [ref, stepIndex]);
  return active;
}

/* ---------- the central frame: real photo/video, "photo à venir" otherwise.
   Fixed size always (set by the parent .wv-frame box); the media/placeholder
   itself is absolutely positioned inset:0 so it can never influence that
   size, whatever its own content or caption length. ---------- */

function MediaFrame({ media, caption, stepIndex, label }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const isActive = useVisualActive(wrapRef, stepIndex);
  const showMedia = Boolean(media && media.src) && !failed;

  useEffect(() => {
    if (!showMedia || !media || media.type !== 'video') return undefined;
    const video = videoRef.current;
    if (!video) return undefined;
    if (isActive) video.play().catch(() => {});
    else video.pause();
    return undefined;
  }, [isActive, showMedia, media]);

  return (
    <div className="wv-frame" ref={wrapRef} aria-label={label}>
      <div className="wv-frame-inner">
        {showMedia ? (
          <>
            {media.type === 'video' ? (
              <video
                ref={videoRef}
                className="wv-media wv-media-kenburns"
                src={media.src}
                poster={media.poster || undefined}
                style={{ objectPosition: media.position || 'center' }}
                muted
                loop
                playsInline
                preload="none"
                crossOrigin="anonymous"
                onError={() => setFailed(true)}
              />
            ) : (
              <img
                className="wv-media wv-media-kenburns"
                src={media.src}
                alt=""
                style={{ objectPosition: media.position || 'center' }}
                onError={() => setFailed(true)}
              />
            )}
            <div className="wv-media-fade" aria-hidden="true" />
            {caption && <span className="wv-media-caption">{caption}</span>}
          </>
        ) : (
          <div className="wv-frame-fill">
            <MediaPlaceholder label="Photo à venir" caption={caption} bordered={false} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- panel (one step) — same structure/mechanic at every breakpoint,
   CSS alone reorders the pieces into a single column under 1024px ---------- */

const StepPanel = React.forwardRef(function StepPanel({ step, index, reduced }, ref) {
  return (
    <div
      ref={ref}
      className="wv-panel"
      data-index={index}
      aria-hidden={reduced ? 'false' : (index === 0 ? 'false' : 'true')}
    >
      <div className="wv-piece wv-piece-numtitle">
        <div className="wv-num">{step.num}</div>
        <h3 className="wv-step-title">{step.title}</h3>
      </div>

      <div className="wv-piece wv-piece-usual wv-card wv-card-usual">
        <span className="wv-card-label">D'habitude</span>
        <p>{step.usual}</p>
      </div>

      <div className="wv-piece wv-piece-frame">
        <MediaFrame media={step.media} caption={step.caption} stepIndex={index} label={step.label} />
      </div>

      <div className="wv-piece wv-piece-withus wv-card wv-card-us">
        <span className="wv-card-label">Avec AuchuMedia</span>
        <p>{step.withUs}</p>
      </div>

      <div className="wv-piece wv-piece-question wv-question">
        <span className="wv-card-label">La question qu'on se pose</span>
        <p>« {step.question} »</p>
      </div>
    </div>
  );
});

/* ---------- header (title + subtitle) ---------- */

function WvHeader() {
  return (
    <div className="wv-header">
      <h2 id="wv-title" className="wv-title">
        <span className="wv-title-white">Pourquoi nos vidéos </span>
        <span className="wv-gradient-line">fonctionnent</span>
      </h2>
      <p className="wv-subtitle">
        Une pub se scrolle. Une histoire s'attache. Voici comment on transforme ton quotidien en contenu qui crée une communauté.
      </p>
    </div>
  );
}

/* ---------- main component ---------- */

export default function WhyVideos() {
  const sectionRef = useRef(null);
  const pisteRef = useRef(null);
  const stageRef = useRef(null);
  const panelRefs = useRef([]);
  const segFillRefs = useRef([]);
  const lastEtapeRef = useRef(-1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;

    const markTransitioning = (i) => {
      const el = panelRefs.current[i];
      if (!el) return;
      el.classList.add('wv-will-change');
      clearTimeout(el.__wcTimer);
      el.__wcTimer = setTimeout(() => el.classList.remove('wv-will-change'), 450);
    };

    let scrollStopTimer = null;
    const markScrolling = () => {
      const section = sectionRef.current;
      if (!section) return;
      section.classList.add('wv-scrolling');
      clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => section.classList.remove('wv-scrolling'), 180);
    };

    let raf = null;
    const compute = () => {
      raf = null;
      const piste = pisteRef.current;
      const stage = stageRef.current;
      if (!piste || !stage) return;
      // Use stage.offsetHeight (stable, tied to 100svh) rather than
      // window.innerHeight, which iOS Safari changes mid-scroll as its
      // address bar collapses — that mismatch was feeding a jittery p.
      const rect = piste.getBoundingClientRect();
      const scrollable = piste.offsetHeight - stage.offsetHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      const rawIdx = Math.min(STEPS - 1, Math.floor(p * STEPS));

      let idx = lastEtapeRef.current;
      if (idx < 0) {
        idx = rawIdx;
      } else if (rawIdx > idx) {
        const boundary = (idx + 1) / STEPS;
        if (rawIdx > idx + 1 || p > boundary + HYSTERESIS) idx = rawIdx;
      } else if (rawIdx < idx) {
        const boundary = idx / STEPS;
        if (rawIdx < idx - 1 || p < boundary - HYSTERESIS) idx = rawIdx;
      }

      const stepP = Math.min(1, Math.max(0, p * STEPS - idx));
      const activeFill = segFillRefs.current[idx];
      if (activeFill) activeFill.style.transform = `scaleX(${stepP.toFixed(4)})`;

      if (idx !== lastEtapeRef.current) {
        const prevIdx = lastEtapeRef.current;
        lastEtapeRef.current = idx;
        stage.dataset.etape = String(idx);
        panelRefs.current.forEach((el, i) => {
          if (el) el.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
        });
        // hand the previous segment's fill back to plain CSS (full/empty)
        if (prevIdx >= 0) {
          const prevFill = segFillRefs.current[prevIdx];
          if (prevFill) prevFill.style.transform = '';
        }
        if (prevIdx >= 0) markTransitioning(prevIdx);
        markTransitioning(idx);
      }
    };
    const onScroll = () => {
      markScrolling();
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(scrollStopTimer);
    };
  }, [reduced]);

  const goToStep = (i) => {
    const piste = pisteRef.current;
    const stage = stageRef.current;
    if (!piste || !stage) return;
    const top = piste.getBoundingClientRect().top + window.scrollY;
    const scrollable = piste.offsetHeight - stage.offsetHeight;
    const target = top + ((i + 0.5) / STEPS) * Math.max(0, scrollable);
    window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="pourquoi-videos"
      ref={sectionRef}
      aria-labelledby="wv-title"
      className={`section-pad wv-section ${reduced ? 'wv-reduced' : ''}`}
    >
      <div className="wv-halo" aria-hidden="true" />

      <div className="wv-piste" ref={pisteRef}>
        <div className="wv-stage" ref={stageRef} data-etape="0">
          <WvHeader />

          <div className="wv-panels">
            {whyVideos.map((step, i) => (
              <StepPanel
                key={step.num}
                step={step}
                index={i}
                reduced={reduced}
                ref={(el) => { panelRefs.current[i] = el; }}
              />
            ))}
          </div>

          <div className="wv-segments" role="group" aria-label="Étapes">
            {whyVideos.map((_, i) => (
              <button
                key={i}
                type="button"
                className="wv-seg"
                data-index={i}
                aria-label={`Étape ${i + 1}`}
                onClick={() => goToStep(i)}
              >
                <span className="wv-seg-fill" ref={(el) => { segFillRefs.current[i] = el; }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .wv-section {
          position: relative;
          background: #0a0a0a;
          overflow-x: clip;
          overflow-anchor: none;
          padding: 52px 60px 48px;
        }
        .wv-halo {
          position: absolute;
          top: 20%;
          left: 50%;
          width: 70vw;
          max-width: 900px;
          height: 900px;
          transform: translate(-50%, 0);
          background: radial-gradient(circle, rgba(0,61,165,0.25), transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
          animation: wvHaloDrift 22s ease-in-out infinite;
        }
        @keyframes wvHaloDrift {
          0%, 100% { transform: translate(-54%, -2%) scale(1); opacity: 0.9; }
          50% { transform: translate(-46%, 4%) scale(1.08); opacity: 1; }
        }
        .wv-scrolling .wv-halo { animation-play-state: paused; }

        .wv-header {
          position: relative; z-index: 2; text-align: center;
          min-height: 112px;
        }
        .wv-title {
          font-family: 'Bebas Neue';
          font-size: clamp(34px, 4.6vw, 64px);
          line-height: 1.05;
          text-transform: uppercase;
          margin: 0 0 14px;
        }
        .wv-title-white { color: #fff; }
        .wv-gradient-line {
          background: linear-gradient(100deg, #6fa0ff 0%, #3f78e8 50%, #6fa0ff 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: wvReflet 6s ease-in-out infinite;
        }
        @keyframes wvReflet {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .wv-scrolling .wv-gradient-line { animation-play-state: paused; }
        .wv-subtitle {
          font-family: 'DM Sans';
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ---- sticky scene (same mechanic at every breakpoint) ---- */
        .wv-piste {
          position: relative;
          height: 400vh;
          overflow-anchor: none;
        }
        @supports (height: 100svh) {
          .wv-piste { height: 400svh; }
        }
        .wv-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 28px;
          padding-top: 5rem;
          z-index: 2;
          overflow-anchor: none;
        }
        @supports (height: 100svh) {
          .wv-stage { height: 100svh; }
        }
        .wv-panels {
          position: relative;
          width: min(1240px, 100%);
          height: clamp(460px, 62vh, 560px);
        }
        .wv-panel {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,520px) minmax(0,1fr);
          column-gap: 40px;
          row-gap: 16px;
          transition: opacity 0.35s ease;
        }
        .wv-panel.wv-will-change { will-change: opacity; }

        .wv-piece-numtitle { grid-column: 1; grid-row: 1; align-self: start; }
        .wv-piece-usual    { grid-column: 1; grid-row: 2; align-self: start; }
        .wv-piece-frame    { grid-column: 2; grid-row: 1 / 3; align-self: start; }
        .wv-piece-withus   { grid-column: 3; grid-row: 1; align-self: start; }
        .wv-piece-question { grid-column: 3; grid-row: 2; align-self: start; }

        .wv-num {
          font-family: 'Bebas Neue';
          font-size: 88px;
          line-height: 0.9;
          background: linear-gradient(100deg, #6fa0ff 0%, #3f78e8 60%, #6fa0ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 4px;
        }
        .wv-step-title {
          font-family: 'DM Sans';
          font-weight: 700;
          font-size: 28px;
          line-height: 1.2;
          color: #fff;
          margin: 0 0 20px;
        }
        .wv-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 18px 20px;
        }
        .wv-card-label {
          display: block;
          font-family: 'DM Sans';
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
        }
        .wv-card p {
          font-family: 'DM Sans';
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }
        .wv-card-us {
          background: rgba(255,255,255,0.06);
          border: 1px solid #3f78e8;
        }
        .wv-card-us .wv-card-label { color: #8fb4ff; }
        .wv-card-us p { color: #fff; }
        .wv-question {
          border-left: 2px solid #3f78e8;
          padding-left: 16px;
        }
        .wv-question .wv-card-label { color: rgba(255,255,255,0.45); }
        .wv-question p {
          font-family: 'DM Sans';
          font-style: italic;
          font-size: 15px;
          color: rgba(255,255,255,0.85);
          line-height: 1.5;
          margin: 0;
        }

        /* ---- the central frame: fixed size at every step, content-independent.
           Desktop: aspect-ratio box, max 520px wide. Mobile/iPad: fixed svh
           height, set below. The media/placeholder inside is always
           position:absolute; inset:0 so it can never affect this size. ---- */
        .wv-frame {
          position: relative;
          width: 100%;
          max-width: 520px;
          aspect-ratio: 5 / 4;
        }
        .wv-frame-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
        }
        .wv-frame-fill, .wv-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .wv-media {
          object-fit: cover;
          transform: scale(1);
        }
        @keyframes wvKenburns {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }
        .wv-reduced .wv-media-kenburns { animation: none !important; transform: none !important; }
        .wv-media-fade {
          position: absolute; left: 0; right: 0; bottom: 0; height: 45%;
          background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);
          pointer-events: none;
        }
        .wv-media-caption {
          position: absolute; left: 10px; bottom: 10px;
          background: rgba(10,10,10,0.7);
          color: #fff;
          font-family: 'DM Sans';
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 6px 10px;
          border-radius: 6px;
        }

        /* ---- segments: fixed width, progress via transform: scaleX() only ---- */
        .wv-segments { position: relative; z-index: 2; display: flex; gap: 8px; }
        .wv-seg {
          width: 56px; height: 3px;
          background: rgba(255,255,255,0.15);
          border: none; border-radius: 2px;
          padding: 0; cursor: pointer;
          overflow: hidden;
        }
        .wv-seg-fill {
          display: block; width: 100%; height: 100%;
          background: #3f78e8;
          transform-origin: left;
          transform: scaleX(0);
        }

        ${PANEL_CSS}
        ${SEGMENT_CSS}

        /* ---- <1024px: same scene, single-column reflow via CSS order.
           Each piece gets align-self: stretch (overriding the desktop
           grid's align-self: start) so none of them — especially the
           frame — shrink-wraps to its own content width. ---- */
        @media (max-width: 1023px) {
          .wv-header { min-height: auto; }
          .wv-panels { width: min(720px, 100%); }
          .wv-panel {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .wv-piece { align-self: stretch; }
          .wv-piece-frame    { order: 1; }
          .wv-piece-numtitle { order: 2; display: flex; align-items: baseline; gap: 12px; }
          .wv-piece-usual    { order: 3; }
          .wv-piece-withus   { order: 4; }
          .wv-piece-question { order: 5; }

          .wv-num { font-size: 44px; margin-bottom: 0; }
          .wv-step-title { font-size: 19px; margin: 0; }
          .wv-card { padding: 12px 14px; }
          .wv-card p { font-size: 13px; line-height: 1.5; }
          .wv-card-usual p,
          .wv-card-us p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .wv-card-usual p { -webkit-line-clamp: 3; }
          .wv-card-us p { -webkit-line-clamp: 4; }
          .wv-question { padding-left: 10px; }
          .wv-question p { font-size: 12px; }

          .wv-frame { max-width: none; aspect-ratio: auto; }

          .wv-stage { padding-top: 4.5rem; gap: 14px; }
          .wv-panels { height: clamp(600px, 78svh, 740px); }
          @supports not (height: 1svh) {
            .wv-panels { height: clamp(600px, 78vh, 740px); }
          }
          .wv-seg { width: 48px; }
        }

        /* iPad: 769–1023px — frame height per spec */
        @media (min-width: 769px) and (max-width: 1023px) {
          .wv-frame { height: clamp(260px, 36svh, 360px); }
          @supports not (height: 1svh) {
            .wv-frame { height: clamp(260px, 36vh, 360px); }
          }
        }

        @media (max-width: 768px) {
          .wv-section { padding-left: 20px; padding-right: 20px; }
          .wv-section { padding-top: 32px; padding-bottom: 32px; }
          .wv-title { font-size: clamp(26px, 8vw, 40px); }
          .wv-subtitle { display: none; }
          .wv-stage { padding-top: 3.75rem; gap: 10px; }
          .wv-frame { height: clamp(190px, 30svh, 280px); }
          @supports not (height: 1svh) {
            .wv-frame { height: clamp(190px, 30vh, 280px); }
          }
          .wv-panels { height: clamp(500px, 80svh, 630px); }
          @supports not (height: 1svh) {
            .wv-panels { height: clamp(500px, 80vh, 630px); }
          }
          .wv-seg { width: 42px; }
        }

        @media (max-height: 700px) {
          .wv-stage { align-content: start; padding-top: 4.4rem; gap: 8px; }
          .wv-header { min-height: auto; }
          .wv-title { margin-bottom: 4px; }
          .wv-subtitle { display: none; }
          .wv-piece-question { display: none; }
          .wv-panels { height: clamp(360px, 70svh, 480px); }
          @supports not (height: 1svh) {
            .wv-panels { height: clamp(360px, 70vh, 480px); }
          }
        }

        /* ---- reduced motion: static stacked list, no scroll-jacking ---- */
        .wv-reduced .wv-piste { height: auto; }
        .wv-reduced .wv-stage {
          position: static;
          height: auto;
          display: block;
          padding-top: 0;
        }
        .wv-reduced .wv-header { margin-bottom: 32px; }
        .wv-reduced .wv-subtitle { display: block; }
        .wv-reduced .wv-panels {
          position: static;
          height: auto;
          width: min(760px, 100%);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .wv-reduced .wv-panel {
          position: static;
          opacity: 1 !important;
          pointer-events: auto !important;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 20px;
        }
        .wv-reduced .wv-piece { align-self: stretch; }
        .wv-reduced .wv-piece-frame    { order: 1; }
        .wv-reduced .wv-piece-numtitle { order: 2; display: flex; align-items: baseline; gap: 12px; }
        .wv-reduced .wv-piece-usual    { order: 3; }
        .wv-reduced .wv-piece-withus   { order: 4; }
        .wv-reduced .wv-piece-question { order: 5; display: block; }
        .wv-reduced .wv-num { font-size: 40px; margin-bottom: 0; }
        .wv-reduced .wv-step-title { font-size: 18px; margin: 0; }
        .wv-reduced .wv-card-usual p { display: block; -webkit-line-clamp: unset; overflow: visible; }
        .wv-reduced .wv-frame { aspect-ratio: 5 / 4; max-width: none; height: auto; }
        .wv-reduced .wv-segments { display: none; }

        @media (prefers-reduced-motion: reduce) {
          .wv-halo, .wv-gradient-line { animation: none !important; }
          .wv-media-kenburns { transition: none; }
        }
      `}</style>
    </section>
  );
}
