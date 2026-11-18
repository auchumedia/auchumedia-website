import React, { useEffect, useRef, useState } from 'react';
import { whyVideos } from '../data/whyVideos';
import MediaPlaceholder from './MediaPlaceholder';

const STEPS = whyVideos.length;
const GRID_COLS = 'minmax(0,1fr) minmax(0,520px) minmax(0,1fr)';

/* Opacity-only, attribute-selector driven. No JS writes these per frame —
   only the single `data-etape` attribute changes (via IntersectionObserver,
   see useStickyScene below), and the browser handles the rest as a plain
   CSS transition. */
function buildPanelCSS() {
  const rows = [];
  for (let etape = 0; etape < STEPS; etape += 1) {
    for (let idx = 0; idx < STEPS; idx += 1) {
      const sel = `.wv-stage[data-etape="${etape}"] .wv-panel[data-index="${idx}"]`;
      rows.push(`${sel} { opacity: ${idx === etape ? 1 : 0}; pointer-events: ${idx === etape ? 'auto' : 'none'}; }`);
    }
  }
  return rows.join('\n');
}

/* Same idea for the media layers stacked inside the one persistent frame —
   the frame chrome itself never animates, only the media crossfades. */
function buildMediaCSS() {
  const rows = [];
  for (let etape = 0; etape < STEPS; etape += 1) {
    for (let idx = 0; idx < STEPS; idx += 1) {
      const sel = `.wv-stage[data-etape="${etape}"] .wv-media-layer[data-index="${idx}"]`;
      if (idx === etape) {
        rows.push(`${sel} { opacity: 1; }`);
        rows.push(`${sel} .wv-media-kenburns { animation: wvKenburns 8s ease-out forwards; }`);
      } else {
        rows.push(`${sel} { opacity: 0; }`);
      }
    }
  }
  return rows.join('\n');
}

/* Segments: full/empty is a plain attribute-selector class of CSS (no JS),
   and the only "animation" is a CSS transition on transform: scaleX(),
   triggered purely by the data-etape attribute change — no continuous
   scroll-linked value at all. */
function buildSegmentCSS() {
  const rows = [];
  for (let etape = 0; etape < STEPS; etape += 1) {
    for (let idx = 0; idx < STEPS; idx += 1) {
      const sel = `.wv-stage[data-etape="${etape}"] .wv-seg[data-index="${idx}"] .wv-seg-fill`;
      rows.push(`${sel} { transform: scaleX(${idx <= etape ? 1 : 0}); }`);
    }
  }
  return rows.join('\n');
}

const PANEL_CSS = buildPanelCSS();
const MEDIA_CSS = buildMediaCSS();
const SEGMENT_CSS = buildSegmentCSS();

/* Detects "is this media layer currently active?" for video play/pause and
   the Ken Burns trigger, by watching the ancestor .wv-stage's data-etape
   attribute via MutationObserver — never by reading layout during scroll. */
function useVisualActive(ref, stepIndex) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const stage = el.closest('.wv-stage');
    if (!stage) { setActive(true); return undefined; }
    const check = () => setActive(stage.dataset.etape === String(stepIndex));
    check();
    const mo = new MutationObserver(check);
    mo.observe(stage, { attributes: true, attributeFilter: ['data-etape'] });
    return () => mo.disconnect();
  }, [ref, stepIndex]);
  return active;
}

function MediaLayer({ media, caption, stepIndex }) {
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
    <div className="wv-media-layer" data-index={stepIndex} ref={wrapRef}>
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
  );
}

/* The frame's border/cut-corners/background is a single, permanent element —
   it is never part of any opacity transition. Only the media layers inside
   it crossfade. */
function FrameChrome() {
  return (
    <div className="wv-media-stack">
      <div className="wv-frame">
        <div className="wv-frame-inner">
          {whyVideos.map((step, i) => (
            <MediaLayer key={step.num} media={step.media} caption={step.caption} stepIndex={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* One text panel per step: number/title, "usual", "with us", question.
   No frame here — the frame lives once, outside, in FrameChrome. */
const StepPanel = React.forwardRef(function StepPanel({ step, index }, ref) {
  return (
    <div ref={ref} className="wv-panel" data-index={index} aria-hidden={index === 0 ? 'false' : 'true'}>
      <div className="wv-piece wv-piece-numtitle">
        <div className="wv-num">{step.num}</div>
        <h3 className="wv-step-title">{step.title}</h3>
      </div>
      <div className="wv-piece wv-piece-usual wv-card wv-card-usual">
        <span className="wv-card-label">D'habitude</span>
        <p>{step.usual}</p>
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

/* ---------- the normal, scroll-jacked scene ---------- */

function StickyScene() {
  const pisteRef = useRef(null);
  const stageRef = useRef(null);
  const panelRefs = useRef([]);
  const sentinelRefs = useRef([]);
  const lastEtapeRef = useRef(0);

  useEffect(() => {
    const piste = pisteRef.current;
    const stage = stageRef.current;
    if (!piste || !stage) return undefined;

    const positionSentinels = () => {
      const scrollable = Math.max(0, piste.offsetHeight - stage.offsetHeight);
      const v = stage.offsetHeight;
      const step = scrollable / STEPS;
      // Each sentinel spans its whole step's scroll range (not a 1px line):
      // a 1px target crossing a 0-height rootMargin line is only "intersecting"
      // for ~1px of scroll, which a normal-sized scroll jump (mouse wheel,
      // fling, even a slow drag) steps straight over — confirmed by direct
      // testing, that is why steps were never advancing. A target spanning
      // the full quarter can't be skipped by any realistic scroll delta.
      // The small gap between spans is the dead-zone.
      const gap = step * 0.05;
      sentinelRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.top = `${Math.max(0, v / 2 + i * step)}px`;
        el.style.height = `${Math.max(1, step - gap)}px`;
      });
    };

    positionSentinels();
    window.addEventListener('resize', positionSentinels);

    const setEtape = (idx) => {
      if (idx === lastEtapeRef.current && stage.dataset.etape !== undefined) return;
      lastEtapeRef.current = idx;
      stage.dataset.etape = String(idx);
      panelRefs.current.forEach((el, i) => {
        if (el) el.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
      });
    };

    // No getBoundingClientRect, no scroll listener: a sentinel crossing the
    // viewport's vertical centerline (rootMargin -50%/-50%) is the only
    // signal, delivered off the scroll-handling thread by the browser.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.sentinelIndex);
          setEtape(idx);
        }
      });
    }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sentinelRefs.current.forEach((el) => { if (el) observer.observe(el); });

    return () => {
      window.removeEventListener('resize', positionSentinels);
      observer.disconnect();
    };
  }, []);

  const goToStep = (i) => {
    const piste = pisteRef.current;
    const stage = stageRef.current;
    if (!piste || !stage) return;
    const top = piste.getBoundingClientRect().top + window.scrollY;
    const scrollable = piste.offsetHeight - stage.offsetHeight;
    const target = top + ((i + 0.5) / STEPS) * Math.max(0, scrollable);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div className="wv-piste" ref={pisteRef}>
      {whyVideos.map((_, i) => (
        <div
          key={i}
          className="wv-sentinel"
          data-sentinel-index={i}
          aria-hidden="true"
          ref={(el) => { sentinelRefs.current[i] = el; }}
        />
      ))}
      <div className="wv-stage" ref={stageRef} data-etape="0">
        <WvHeader />

        <div className="wv-panels">
          <FrameChrome />
          <div className="wv-text-stack">
            {whyVideos.map((step, i) => (
              <StepPanel key={step.num} step={step} index={i} ref={(el) => { panelRefs.current[i] = el; }} />
            ))}
          </div>
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
              <span className="wv-seg-fill" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- reduced-motion fallback: plain static list, no scroll-jacking ---------- */

function ReducedCard({ step, index }) {
  return (
    <div className="wv-rcard">
      <div className="wv-frame wv-frame-reduced">
        <div className="wv-frame-inner">
          <MediaLayer media={step.media} caption={step.caption} stepIndex={index} />
        </div>
      </div>
      <div className="wv-piece-numtitle">
        <div className="wv-num">{step.num}</div>
        <h3 className="wv-step-title">{step.title}</h3>
      </div>
      <div className="wv-card wv-card-usual">
        <span className="wv-card-label">D'habitude</span>
        <p>{step.usual}</p>
      </div>
      <div className="wv-card wv-card-us">
        <span className="wv-card-label">Avec AuchuMedia</span>
        <p>{step.withUs}</p>
      </div>
      <div className="wv-question">
        <span className="wv-card-label">La question qu'on se pose</span>
        <p>« {step.question} »</p>
      </div>
    </div>
  );
}

function ReducedList() {
  return (
    <div className="wv-reduced-list">
      {whyVideos.map((step, i) => (
        <ReducedCard key={step.num} step={step} index={i} />
      ))}
    </div>
  );
}

/* ---------- main component ---------- */

export default function WhyVideos() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section
      id="pourquoi-videos"
      aria-labelledby="wv-title"
      className={`section-pad wv-section ${reduced ? 'wv-reduced' : ''}`}
    >
      <div className="wv-halo" aria-hidden="true" />

      {reduced ? (
        <>
          <WvHeader />
          <ReducedList />
        </>
      ) : (
        <StickyScene />
      )}

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
        .wv-sentinel {
          position: absolute;
          left: 0;
          width: 1px;
          pointer-events: none;
        }
        .wv-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          align-content: start;
          justify-items: center;
          gap: 28px;
          padding-top: 5rem;
          z-index: 2;
          overflow-anchor: none;
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        @supports (height: 100svh) {
          .wv-stage { height: 100svh; }
        }
        .wv-panels {
          position: relative;
          width: min(1240px, 100%);
          height: clamp(460px, 62vh, 560px);
          display: grid;
          grid-template-columns: ${GRID_COLS};
          column-gap: 40px;
        }

        /* the persistent frame: a real grid item, never fades */
        .wv-media-stack { grid-column: 2; grid-row: 1; align-self: start; }

        /* the 4 text panels: absolutely stacked, each its own nested grid
           using the same column template so column 2 stays empty and the
           shared frame shows through. will-change/translateZ/contain are
           permanent — there are only 4 of these. */
        .wv-text-stack { position: absolute; inset: 0; }
        .wv-panel {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: ${GRID_COLS};
          column-gap: 40px;
          row-gap: 16px;
          transition: opacity 0.3s ease;
          will-change: opacity;
          transform: translateZ(0);
          contain: layout paint style;
        }

        .wv-piece-numtitle { grid-column: 1; grid-row: 1; align-self: start; }
        .wv-piece-usual    { grid-column: 1; grid-row: 2; align-self: start; }
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

        /* ---- the frame: static chrome, never animated. Fixed size always,
           content-independent. Desktop: aspect-ratio box, max 520px wide.
           Mobile/iPad: fixed svh height (set below). ---- */
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
        .wv-media-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transition: opacity 0.3s ease;
          will-change: opacity;
          transform: translateZ(0);
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
        .wv-media-fade {
          position: absolute; left: 0; right: 0; bottom: 0; height: 45%;
          background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);
          pointer-events: none;
        }

        /* ---- segments: CSS transition only, no JS writes per frame ---- */
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
          transition: transform 0.6s ease;
        }

        ${PANEL_CSS}
        ${MEDIA_CSS}
        ${SEGMENT_CSS}

        /* ---- <1024px: same scene. The frame stays fixed-size and first in
           the flow; the 4 text panels reflow into a single column below it
           via CSS order, each internally a flex column. ---- */
        @media (max-width: 1023px) {
          .wv-header { min-height: auto; }
          .wv-panels {
            display: flex;
            flex-direction: column;
            width: min(720px, 100%);
            height: clamp(600px, 78svh, 740px);
          }
          @supports not (height: 1svh) {
            .wv-panels { height: clamp(600px, 78vh, 740px); }
          }
          .wv-media-stack { order: 1; flex-shrink: 0; align-self: stretch; }
          .wv-text-stack { order: 2; position: relative; flex: 1 1 auto; min-height: 0; }
          .wv-panel {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .wv-piece { align-self: stretch; }
          .wv-piece-numtitle { order: 1; display: flex; align-items: baseline; gap: 12px; margin-top: 10px; }
          .wv-piece-usual    { order: 2; }
          .wv-piece-withus   { order: 3; }
          .wv-piece-question { order: 4; }

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
          .wv-seg { width: 48px; }
        }

        /* iPad: 769–1023px */
        @media (min-width: 769px) and (max-width: 1023px) {
          .wv-section { padding-top: 16px; padding-bottom: 12px; }
          .wv-frame { height: clamp(260px, 36svh, 360px); }
          @supports not (height: 1svh) {
            .wv-frame { height: clamp(260px, 36vh, 360px); }
          }
        }

        @media (max-width: 768px) {
          .wv-section { padding-left: 20px; padding-right: 20px; }
          .wv-section { padding-top: 8px; padding-bottom: 8px; }
          .wv-title { font-size: clamp(26px, 8vw, 40px); }
          .wv-subtitle { display: none; }
          .wv-stage { padding-top: 4.3rem; gap: 10px; }
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
          .wv-stage { padding-top: 4.4rem; gap: 8px; }
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
        .wv-reduced-list {
          position: relative;
          z-index: 2;
          width: min(760px, 100%);
          margin: 32px auto 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .wv-rcard {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wv-rcard .wv-piece-numtitle { display: flex; align-items: baseline; gap: 12px; }
        .wv-rcard .wv-num { font-size: 40px; margin-bottom: 0; }
        .wv-rcard .wv-step-title { font-size: 18px; margin: 0; }
        .wv-frame-reduced { max-width: none; aspect-ratio: 5 / 4; height: auto; }
        .wv-frame-reduced .wv-media-layer { opacity: 1; }
        .wv-frame-reduced .wv-media-kenburns { animation: none; }

        @media (prefers-reduced-motion: reduce) {
          .wv-halo, .wv-gradient-line { animation: none !important; }
          .wv-media-kenburns { transition: none; }
        }
      `}</style>
    </section>
  );
}
