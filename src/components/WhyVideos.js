import React, { useEffect, useRef, useState } from 'react';
import { whyVideos } from '../data/whyVideos';

const BLUE = '#003DA5';
const STEPS = whyVideos.length;
const HYSTERESIS = 0.03; // ±3% of p around a step boundary, to stop flicker when p hovers near it

/* Generates the 5x5 attribute-selector rules that drive the sticky scene
   purely from the single `data-etape` attribute — no per-frame React state. */
function buildPanelCSS() {
  const rows = [];
  for (let etape = 0; etape < STEPS; etape += 1) {
    for (let idx = 0; idx < STEPS; idx += 1) {
      const sel = `.wv-stage[data-etape="${etape}"] .wv-panel[data-index="${idx}"]`;
      if (idx === etape) {
        rows.push(`${sel} { opacity: 1; transform: translateY(0); pointer-events: auto; }`);
        rows.push(`${sel} .wv-frame { transform: translateZ(0) scale(1); }`);
        rows.push(`${sel} .wv-media-kenburns { animation: wvKenburns 8s ease-out forwards; }`);
      } else {
        const dir = idx < etape ? -16 : 16;
        rows.push(`${sel} { opacity: 0; transform: translateY(${dir}px); pointer-events: none; }`);
      }
    }
  }
  return rows.join('\n');
}

function buildSegmentCSS() {
  const rows = [];
  for (let etape = 0; etape < STEPS; etape += 1) {
    for (let idx = 0; idx < STEPS; idx += 1) {
      const sel = `.wv-stage[data-etape="${etape}"] .wv-seg[data-index="${idx}"] .wv-seg-fill`;
      if (idx < etape) rows.push(`${sel} { width: 100%; }`);
      else if (idx === etape) rows.push(`${sel} { width: calc(var(--step-p, 0) * 100%); }`);
      else rows.push(`${sel} { width: 0%; }`);
    }
  }
  return rows.join('\n');
}

const PANEL_CSS = buildPanelCSS();
const SEGMENT_CSS = buildSegmentCSS();

/* Detects "is this step currently active?" without ever touching the parent's
   scroll handler: on desktop it watches the ancestor .wv-stage's data-etape
   attribute (MutationObserver), on mobile it falls back to a plain
   IntersectionObserver on the element itself. Either way the state update
   happens at most once per activation — never per scroll frame. */
function useVisualActive(ref, stepIndex) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const stage = el.closest('.wv-stage');
    if (stage) {
      const check = () => setActive(stage.dataset.etape === String(stepIndex));
      check();
      const obs = new MutationObserver(check);
      obs.observe(stage, { attributes: true, attributeFilter: ['data-etape'] });
      return () => obs.disconnect();
    }
    const obs = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, stepIndex]);
  return active;
}

/* ---------- shared bits ---------- */

function CropMarks() {
  return (
    <svg className="wv-crop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M10 2 V10 H2" />
      <path d="M90 2 V10 H98" />
      <path d="M10 98 V90 H2" />
      <path d="M90 98 V90 H98" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="#fff" />
    </svg>
  );
}
function IconTiktok() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.6-1.5H17V4.8C16.6 4.7 15.7 4.6 14.7 4.6c-2.2 0-3.7 1.3-3.7 3.8V11H8.5v3H11v7h3Z" fill="#fff" />
    </svg>
  );
}

/* ---------- the central frame: real photo/video first, drawing as fallback ---------- */

function MediaFrame({ label, media, fallback, stepIndex }) {
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
    <div className="wv-frame" ref={wrapRef}>
      <div className="wv-frame-grid" aria-hidden="true" />
      <CropMarks />
      <div className="wv-frame-bar">
        <span className="wv-frame-label">{label}</span>
        <span className="wv-frame-dot" aria-hidden="true" />
      </div>
      <div className="wv-frame-content">
        {showMedia ? (
          media.type === 'video' ? (
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
          )
        ) : fallback}
        {showMedia && (
          <>
            <div className="wv-media-fade" aria-hidden="true" />
            {media.caption && <span className="wv-media-caption">{media.caption}</span>}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- counters (small, self-contained — not scroll-driven) ---------- */

function useCountUp(active, target, duration = 1400) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { ref.current.textContent = target.toLocaleString('fr-CA'); return undefined; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = Math.round(eased * target).toLocaleString('fr-CA');
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return ref;
}

function Timecode({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 8;
    let sec = 12;
    const format = () => `00:00:${String(sec).padStart(2, '0')}:${String(frame).padStart(2, '0')}`;
    if (ref.current) ref.current.textContent = format();
    if (reduced) return undefined;
    const id = setInterval(() => {
      frame += 1;
      if (frame > 23) { frame = 0; sec += 1; }
      if (sec > 59) sec = 0;
      if (ref.current) ref.current.textContent = format();
    }, 120);
    return () => clearInterval(id);
  }, [active]);
  return <span ref={ref} className="wv-timecode-value">00:00:12:08</span>;
}

/* ---------- 5 fallback drawings (used only while media is empty or fails) ---------- */

const NODES = ['Quotidien', 'Clients', 'Défis', 'Équipe', 'Valeurs', 'Ce qui te rend unique'];
const NODE_POS = [
  { x: 50, y: 10 }, { x: 85, y: 30 }, { x: 85, y: 70 },
  { x: 50, y: 90 }, { x: 15, y: 70 }, { x: 22, y: 30 },
];

function BrainstormVisual() {
  return (
    <div className="bs-wrap">
      <svg className="bs-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {NODE_POS.map((p, i) => (
          <line
            key={i}
            className="bs-line"
            x1="50" y1="50" x2={p.x} y2={p.y}
            style={{ transitionDelay: `${i * 140}ms` }}
          />
        ))}
      </svg>
      <div className="bs-node bs-node-center">TON ENTREPRISE</div>
      {NODE_POS.map((p, i) => (
        <div
          key={NODES[i]}
          className={`bs-node bs-sat ${i === NODES.length - 1 ? 'bs-angle' : ''}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, transitionDelay: `${220 + i * 140}ms` }}
        >
          {NODES[i]}
          {i === NODES.length - 1 && <span className="bs-angle-tag">ANGLE</span>}
        </div>
      ))}
    </div>
  );
}

const EPISODES = [
  { ep: 'EP.01', title: 'Les débuts' },
  { ep: 'EP.02', title: 'Dans les coulisses' },
  { ep: 'EP.03', title: 'Le premier client' },
];
const PILLS = ['QUOTIDIEN', 'COULISSES', 'ACTUALITÉ'];

function SerieVisual() {
  return (
    <div className="se-wrap">
      <div className="se-header">
        <span className="se-season">SAISON 1</span>
        <span className="se-count">3 ÉPISODES</span>
      </div>
      <svg className="se-thread" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
        <line className="se-thread-line" x1="20" y1="10" x2="280" y2="10" />
        <circle className="se-dot" cx="20" cy="10" r="3" style={{ transitionDelay: '100ms' }} />
        <circle className="se-dot" cx="150" cy="10" r="3" style={{ transitionDelay: '300ms' }} />
        <circle className="se-dot" cx="280" cy="10" r="3" style={{ transitionDelay: '500ms' }} />
      </svg>
      <div className="se-row">
        {EPISODES.map((e, i) => (
          <div key={e.ep} className="se-card" style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="se-thumb"><span>{e.ep}</span></div>
            <div className="se-title">{e.title}</div>
          </div>
        ))}
      </div>
      <div className="se-pills">
        {PILLS.map((p, i) => (
          <span key={p} className="se-pill" style={{ transitionDelay: `${300 + i * 100}ms` }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

function TournageVisual({ stepIndex }) {
  const wrapRef = useRef(null);
  const active = useVisualActive(wrapRef, stepIndex);
  return (
    <div className="tr-wrap" ref={wrapRef}>
      <div className="tr-bg" />
      <div className="tr-hud" aria-hidden="true">
        <span className="tr-corner tr-tl" /><span className="tr-corner tr-tr" />
        <span className="tr-corner tr-bl" /><span className="tr-corner tr-br" />
        <span className="tr-focus" />
        <span className="tr-rec"><span className="tr-rec-dot" />REC</span>
        <span className="tr-time"><Timecode active={active} /></span>
        <span className="tr-info">4K · 24 FPS · ISO 800 · f/2.8</span>
        <span className="tr-battery"><span className="tr-battery-fill" /></span>
        <span className="tr-vu">
          <span className="tr-vu-bar" />
          <span className="tr-vu-bar" />
        </span>
      </div>
    </div>
  );
}

const MARKERS = [
  { pos: 12, label: 'ACCROCHE 0:03' },
  { pos: 50, label: 'ÉMOTION' },
  { pos: 86, label: "APPEL À L'ACTION" },
];
const CLIPS = [18, 30, 22, 14];

function MontageVisual() {
  return (
    <div className="mo-wrap">
      <div className="mo-monitor" />
      <div className="mo-ruler" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
      </div>
      <div className="mo-track mo-track-v1">
        <span className="mo-track-label">V1</span>
        <div className="mo-clips">
          {CLIPS.map((w, i) => <span key={i} className="mo-clip" style={{ width: `${w}%` }} />)}
        </div>
      </div>
      <div className="mo-track mo-track-a1">
        <span className="mo-track-label">A1</span>
        <div className="mo-wave">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 60}%` }} />
          ))}
        </div>
      </div>
      <div className="mo-track mo-track-t1">
        <span className="mo-track-label">T1</span>
        <div className="mo-tmarks">
          {MARKERS.map((m) => <span key={m.label} className="mo-tmark" style={{ left: `${m.pos}%` }} />)}
        </div>
      </div>
      <div className="mo-playhead" aria-hidden="true">
        <div className="mo-playhead-track">
          <span className="mo-playhead-line" />
        </div>
      </div>
      {MARKERS.map((m) => (
        <span key={m.label} className="mo-marker-tag" style={{ left: `${m.pos}%` }}>{m.label}</span>
      ))}
    </div>
  );
}

function PhoneProfile({ active }) {
  const counterRef = useCountUp(active, 12400);
  return (
    <div className="cm-phone">
      <span className="cm-island" />
      <div className="cm-screen">
        <span className="cm-notif">Nouvelle demande reçue</span>
        <div className="cm-profile">
          <span className="cm-avatar" />
          <span className="cm-handle">@ton_entreprise</span>
          <span className="cm-followers"><span ref={counterRef}>0</span> abonnés</span>
          <div className="cm-stats">
            <span>Vues<b>48,2K</b></span>
            <span>Engagement<b>9,4%</b></span>
            <span>Abonnés<b>+1,2K</b></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunauteVisual({ stepIndex }) {
  const wrapRef = useRef(null);
  const active = useVisualActive(wrapRef, stepIndex);
  return (
    <div className="cm-wrap" ref={wrapRef}>
      <span className="cm-chip cm-chip-1"><IconInstagram /></span>
      <span className="cm-chip cm-chip-2"><IconTiktok /></span>
      <span className="cm-chip cm-chip-3"><IconFacebook /></span>
      <PhoneProfile active={active} />
    </div>
  );
}

const VISUALS = [BrainstormVisual, SerieVisual, TournageVisual, MontageVisual, CommunauteVisual];

/* ---------- panel (one step, used on desktop) ---------- */

const StepPanel = React.forwardRef(function StepPanel({ step, index }, ref) {
  const Visual = VISUALS[index];
  return (
    <div ref={ref} className="wv-panel" data-index={index} aria-hidden={index === 0 ? 'false' : 'true'}>
      <div className="wv-col wv-col-left">
        <div className="wv-num">{step.num}</div>
        <h3 className="wv-step-title">{step.title}</h3>
        <div className="wv-card wv-card-usual">
          <span className="wv-card-label">D'habitude</span>
          <p>{step.usual}</p>
        </div>
      </div>

      <div className="wv-col wv-col-center">
        <MediaFrame label={step.label} media={step.media} stepIndex={index} fallback={<Visual stepIndex={index} />} />
      </div>

      <div className="wv-col wv-col-right">
        <div className="wv-card wv-card-us">
          <span className="wv-card-label">Avec AuchuMedia</span>
          <p>{step.withUs}</p>
        </div>
        <div className="wv-question">
          <span className="wv-card-label">La question qu'on se pose</span>
          <p>« {step.question} »</p>
        </div>
      </div>
    </div>
  );
});

/* ---------- mobile card (one step, used <1024px) ---------- */

function useRevealOnce(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function MobileStepCard({ step, index }) {
  const [ref, inView] = useRevealOnce();
  const Visual = VISUALS[index];

  return (
    <div ref={ref} className={`wv-mcard ${inView ? 'is-in' : ''}`}>
      <div className="wv-mcard-head">
        <span className="wv-mnum">{step.num}</span>
        <h3 className="wv-step-title">{step.title}</h3>
      </div>
      <MediaFrame label={step.label} media={step.media} stepIndex={index} fallback={<Visual stepIndex={index} />} />
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

/* ---------- header (shared, rendered once per layout) ---------- */

function WvHeader({ id }) {
  return (
    <div className="wv-header">
      <h2 id={id} className="wv-title">
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
      el.__wcTimer = setTimeout(() => el.classList.remove('wv-will-change'), 600);
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
      if (window.innerWidth < 1024) return;
      const piste = pisteRef.current;
      const stage = stageRef.current;
      if (!piste || !stage) return;
      const rect = piste.getBoundingClientRect();
      const scrollable = piste.offsetHeight - window.innerHeight;
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
      stage.style.setProperty('--step-p', stepP.toFixed(4));

      if (idx !== lastEtapeRef.current) {
        const prevIdx = lastEtapeRef.current;
        lastEtapeRef.current = idx;
        stage.dataset.etape = String(idx);
        panelRefs.current.forEach((el, i) => {
          if (el) el.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
        });
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
    if (!piste) return;
    const top = piste.getBoundingClientRect().top + window.scrollY;
    const scrollable = piste.offsetHeight - window.innerHeight;
    const target = top + ((i + 0.5) / STEPS) * Math.max(0, scrollable);
    window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="pourquoi-videos"
      ref={sectionRef}
      aria-labelledby="wv-title-desktop wv-title-mobile"
      className={`section-pad wv-section ${reduced ? 'wv-reduced' : ''}`}
    >
      <div className="wv-halo" aria-hidden="true" />

      <div className="wv-piste" ref={pisteRef}>
        <div className="wv-stage" ref={stageRef} data-etape="0">
          <WvHeader id="wv-title-desktop" />

          <div className="wv-panels">
            {whyVideos.map((step, i) => (
              <StepPanel
                key={step.num}
                step={step}
                index={i}
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
                <span className="wv-seg-fill" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wv-mobile-list">
        <WvHeader id="wv-title-mobile" />
        {whyVideos.map((step, i) => (
          <MobileStepCard key={step.num} step={step} index={i} />
        ))}
      </div>

      <style>{`
        .wv-section {
          position: relative;
          background: #0a0a0a;
          overflow-x: clip;
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

        /* ---- desktop sticky scene ---- */
        .wv-piste {
          position: relative;
          height: 500vh;
          display: none;
        }
        @supports (height: 100svh) {
          .wv-piste { height: 500svh; }
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
          gap: 40px;
          align-items: start;
          transition: opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .wv-panel.wv-will-change { will-change: opacity, transform; }
        .wv-col-left, .wv-col-right { padding-top: 8px; }
        .wv-col-right { display: flex; flex-direction: column; gap: 16px; }

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

        /* ---- the central frame (shared chrome; photo/video first) ---- */
        .wv-frame {
          position: relative;
          width: 100%;
          max-width: 520px;
          aspect-ratio: 5 / 4;
          background: #0e1016;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 28px;
          overflow: hidden;
          transform: translateZ(0) scale(0.985);
          transition: transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .wv-frame-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .wv-crop {
          position: absolute; inset: 10px;
          width: calc(100% - 20px); height: calc(100% - 20px);
          stroke: rgba(255,255,255,0.25);
          stroke-width: 1.2;
          fill: none;
          pointer-events: none;
        }
        .wv-frame-bar {
          position: relative; z-index: 2;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px 0;
        }
        .wv-frame-label {
          font-family: 'DM Sans';
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.5);
        }
        .wv-frame-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #3f78e8;
        }
        .wv-frame-content {
          position: absolute;
          inset: 44px 16px 16px;
          border-radius: 16px;
          overflow: hidden;
        }
        .wv-media {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1);
        }
        @keyframes wvKenburns {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }
        .wv-mcard.is-in .wv-media-kenburns { animation: wvKenburns 8s ease-out forwards; }
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

        /* ---- segments ---- */
        .wv-segments { position: relative; z-index: 2; display: flex; gap: 8px; }
        .wv-seg {
          width: 56px; height: 3px;
          background: rgba(255,255,255,0.15);
          border: none; border-radius: 2px;
          padding: 0; cursor: pointer;
          overflow: hidden;
        }
        .wv-seg-fill { display: block; height: 100%; background: #3f78e8; width: 0%; }

        ${PANEL_CSS}
        ${SEGMENT_CSS}

        /* ---- brainstorm drawing (fallback) ---- */
        .bs-wrap { position: relative; width: 100%; height: 100%; background: #0e1016; }
        .bs-lines { position: absolute; inset: 0; width: 100%; height: 100%; }
        .bs-line {
          stroke: rgba(255,255,255,0.18);
          stroke-width: 1;
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          transition: stroke-dashoffset 0.6s ease;
        }
        .wv-stage[data-etape="0"] .wv-panel[data-index="0"] .bs-line,
        .wv-mcard.is-in .bs-line { stroke-dashoffset: 0; }
        .bs-node {
          position: absolute;
          max-width: 32%;
          transform: translate(-50%, -50%) scale(0.9);
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(.34,1.56,.64,1);
          font-family: 'DM Sans'; font-size: 11px; line-height: 1.25; color: #fff; text-align: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 6px 10px;
        }
        .bs-node-center {
          left: 50%; top: 50%;
          max-width: none;
          white-space: nowrap;
          background: ${BLUE};
          border: none;
          font-weight: 700;
          padding: 10px 14px;
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .wv-mcard.is-in .bs-node,
        .wv-stage[data-etape="0"] .wv-panel[data-index="0"] .bs-node {
          opacity: 1; transform: translate(-50%, -50%) scale(1);
        }
        .bs-angle { border-color: #3f78e8; }
        .bs-angle-tag {
          display: inline-block;
          margin-left: 6px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #8fb4ff;
          opacity: 0;
          transition: opacity 0.4s ease 0.9s;
        }
        .wv-mcard.is-in .bs-angle-tag,
        .wv-stage[data-etape="0"] .wv-panel[data-index="0"] .bs-angle-tag { opacity: 1; }

        /* ---- serie drawing (fallback) ---- */
        .se-wrap { position: relative; width: 100%; height: 100%; background: #0e1016; padding: 4px 8px; display: flex; flex-direction: column; }
        .se-header { display: flex; align-items: baseline; gap: 10px; margin-bottom: 10px; }
        .se-season { font-family: 'Bebas Neue'; font-size: 20px; color: #fff; letter-spacing: 0.02em; }
        .se-count { font-family: 'DM Sans'; font-size: 11px; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; }
        .se-thread { width: 100%; height: 14px; overflow: visible; }
        .se-thread-line { stroke: rgba(255,255,255,0.18); stroke-width: 1; stroke-dasharray: 280; stroke-dashoffset: 280; transition: stroke-dashoffset 0.8s ease; }
        .se-dot { fill: #3f78e8; opacity: 0; transition: opacity 0.3s ease; }
        .wv-mcard.is-in .se-thread-line,
        .wv-stage[data-etape="1"] .wv-panel[data-index="1"] .se-thread-line { stroke-dashoffset: 0; }
        .wv-mcard.is-in .se-dot,
        .wv-stage[data-etape="1"] .wv-panel[data-index="1"] .se-dot { opacity: 1; }
        .se-row { display: flex; gap: 10px; margin-top: 10px; flex: 1; }
        .se-card {
          flex: 1; opacity: 0; transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .se-card:nth-child(2) { margin-top: 10px; }
        .se-card:nth-child(3) { margin-top: 20px; }
        .wv-mcard.is-in .se-card,
        .wv-stage[data-etape="1"] .wv-panel[data-index="1"] .se-card { opacity: 1; transform: translateY(0); }
        .se-thumb {
          aspect-ratio: 16/9; border-radius: 8px;
          background: linear-gradient(145deg, #0d1424, #13306b);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: flex-end; padding: 6px;
        }
        .se-thumb span { font-family: 'DM Sans'; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.75); }
        .se-title { font-family: 'DM Sans'; font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 6px; }
        .se-pills { display: flex; gap: 6px; margin-top: auto; padding-top: 10px; }
        .se-pill {
          font-family: 'DM Sans'; font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px; padding: 4px 9px;
          opacity: 0; transition: opacity 0.4s ease;
        }
        .wv-mcard.is-in .se-pill,
        .wv-stage[data-etape="1"] .wv-panel[data-index="1"] .se-pill { opacity: 1; }

        /* ---- tournage drawing (fallback) ---- */
        .tr-wrap { position: relative; width: 100%; height: 100%; }
        .tr-bg { position: absolute; inset: 0; background: linear-gradient(145deg, #0d1424, #13306b); }
        .tr-hud { position: absolute; inset: 10px; font-family: 'DM Sans'; }
        .tr-corner { position: absolute; width: 16px; height: 16px; border: 1.5px solid rgba(255,255,255,0.6); }
        .tr-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .tr-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .tr-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .tr-br { bottom: 0; right: 0; border-left: none; border-top: none; }
        .tr-focus {
          position: absolute; top: 50%; left: 50%; width: 72px; height: 72px;
          transform: translate(-50%, -50%) scale(1.3);
          border: 1.5px solid rgba(255,255,255,0.35);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), opacity 0.6s ease;
        }
        .wv-mcard.is-in .tr-focus,
        .wv-stage[data-etape="2"] .wv-panel[data-index="2"] .tr-focus {
          transform: translate(-50%, -50%) scale(1); opacity: 1;
        }
        .tr-rec {
          position: absolute; top: 0; left: 24px;
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #fff;
        }
        .tr-rec-dot { width: 7px; height: 7px; border-radius: 50%; background: #e34; animation: trBlink 1.2s step-end infinite; }
        @keyframes trBlink { 50% { opacity: 0.2; } }
        .wv-scrolling .tr-rec-dot { animation-play-state: paused; }
        .tr-time { position: absolute; top: 0; right: 24px; font-size: 11px; color: #fff; }
        .wv-timecode-value { font-family: monospace; letter-spacing: 0.04em; }
        .tr-info {
          position: absolute; bottom: 24px; left: 24px;
          font-size: 10px; letter-spacing: 0.04em; color: rgba(255,255,255,0.7);
        }
        .tr-battery {
          position: absolute; bottom: 24px; right: 24px;
          width: 22px; height: 10px; border: 1px solid rgba(255,255,255,0.6); border-radius: 2px;
        }
        .tr-battery-fill { display: block; height: 100%; width: 70%; background: rgba(255,255,255,0.7); }
        .tr-vu { position: absolute; bottom: 42px; right: 24px; display: flex; gap: 3px; align-items: flex-end; height: 16px; }
        .tr-vu-bar { width: 3px; height: 16px; background: #3f78e8; transform-origin: bottom; transform: scaleY(0.3); animation: trVu 1s ease-in-out infinite; }
        .tr-vu-bar:nth-child(2) { animation-delay: 0.3s; }
        @keyframes trVu { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(0.9); } }
        .wv-scrolling .tr-vu-bar { animation-play-state: paused; }

        /* ---- montage drawing (fallback) ---- */
        .mo-wrap { position: relative; width: 100%; height: 100%; background: #0e1016; padding: 6px 10px; display: flex; flex-direction: column; gap: 6px; }
        .mo-monitor { height: 36%; border-radius: 8px; background: linear-gradient(145deg, #0d1424, #13306b); border: 1px solid rgba(255,255,255,0.1); }
        .mo-ruler { display: flex; justify-content: space-between; padding: 0 2px; }
        .mo-ruler span { width: 1px; height: 6px; background: rgba(255,255,255,0.2); }
        .mo-track { position: relative; display: flex; align-items: center; gap: 8px; height: 16%; }
        .mo-track-label { width: 18px; font-family: 'DM Sans'; font-size: 9px; color: rgba(255,255,255,0.4); flex-shrink: 0; }
        .mo-clips { flex: 1; display: flex; gap: 3px; height: 70%; }
        .mo-clip { display: block; height: 100%; border-radius: 4px; background: linear-gradient(90deg, #1d4fb0, #3f78e8); }
        .mo-wave { flex: 1; display: flex; align-items: center; gap: 2px; height: 70%; }
        .mo-wave span { flex: 1; background: rgba(255,255,255,0.3); border-radius: 1px; }
        .mo-tmarks { position: relative; flex: 1; height: 70%; }
        .mo-tmark { position: absolute; top: 0; width: 2px; height: 100%; background: rgba(255,255,255,0.3); }
        .mo-playhead {
          position: absolute; top: 36%; bottom: 8%; left: 26px; right: 10px;
          overflow: hidden;
          pointer-events: none;
        }
        .mo-playhead-track {
          position: absolute; inset: 0;
          transform: translateX(-100%);
          animation: moSweep 6s linear infinite paused;
        }
        .mo-playhead-line {
          position: absolute; top: 0; bottom: 0; right: 0;
          width: 1.5px; background: #fff;
        }
        .mo-playhead-line::before {
          content: ''; position: absolute; top: -4px; right: -2.5px;
          border: 4px solid transparent; border-top-color: #fff;
        }
        @keyframes moSweep { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
        .wv-mcard.is-in .mo-playhead-track,
        .wv-stage[data-etape="3"] .wv-panel[data-index="3"] .mo-playhead-track { animation-play-state: running; }
        .wv-scrolling .mo-playhead-track { animation-play-state: paused; }
        .mo-marker-tag {
          position: absolute; top: 28%; transform: translateX(-50%);
          font-family: 'DM Sans'; font-size: 9px; font-weight: 700; letter-spacing: 0.06em;
          color: #8fb4ff; white-space: nowrap; opacity: 0;
        }
        .mo-marker-tag:nth-of-type(1) { animation: moLabel 6s linear infinite paused; }
        .mo-marker-tag:nth-of-type(2) { animation: moLabel2 6s linear infinite paused; }
        .mo-marker-tag:nth-of-type(3) { animation: moLabel3 6s linear infinite paused; }
        .wv-mcard.is-in .mo-marker-tag,
        .wv-stage[data-etape="3"] .wv-panel[data-index="3"] .mo-marker-tag { animation-play-state: running; }
        .wv-scrolling .mo-marker-tag { animation-play-state: paused; }
        @keyframes moLabel { 0%, 8%, 100% { opacity: 0; } 12%, 18% { opacity: 1; } }
        @keyframes moLabel2 { 0%, 46%, 100% { opacity: 0; } 50%, 56% { opacity: 1; } }
        @keyframes moLabel3 { 0%, 82%, 100% { opacity: 0; } 86%, 92% { opacity: 1; } }

        /* ---- communauté drawing (fallback) ---- */
        .cm-wrap { position: relative; width: 100%; height: 100%; background: #0e1016; }
        .cm-chip {
          position: absolute; width: 30px; height: 30px; border-radius: 50%;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
          display: flex; align-items: center; justify-content: center;
        }
        .cm-chip-1 { top: 16%; left: 10%; animation: cmOrbit1 9s ease-in-out infinite; }
        .cm-chip-2 { top: 50%; right: 8%; animation: cmOrbit2 10s ease-in-out infinite; }
        .cm-chip-3 { bottom: 18%; left: 14%; animation: cmOrbit3 11s ease-in-out infinite; }
        @keyframes cmOrbit1 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(1px,-2px); } }
        @keyframes cmOrbit2 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-1px,2px); } }
        @keyframes cmOrbit3 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(2px,1px); } }
        .wv-scrolling .cm-chip-1, .wv-scrolling .cm-chip-2, .wv-scrolling .cm-chip-3 { animation-play-state: paused; }

        .cm-phone {
          position: absolute; bottom: -34px; left: 50%; transform: translateX(-50%);
          width: 46%; max-width: 200px; aspect-ratio: 9/18.5;
          background: #111; border: 1px solid rgba(255,255,255,0.14);
          border-radius: 36px 36px 0 0;
          padding: 10px 8px 0;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.4);
        }
        .cm-island {
          position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
          width: 36%; height: 8px; border-radius: 6px; background: #000;
        }
        .cm-screen {
          position: relative; width: 100%; height: 100%;
          background: #0b0d13; border-radius: 20px 20px 0 0; overflow: hidden;
          display: flex; flex-direction: column; align-items: center;
          padding-top: 22px;
        }
        .cm-notif {
          position: absolute; top: -40px; left: 6px; right: 6px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px; padding: 5px 7px;
          font-family: 'DM Sans'; font-size: 7.5px; color: #fff;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .wv-mcard.is-in .cm-notif,
        .wv-stage[data-etape="4"] .wv-panel[data-index="4"] .cm-notif { transform: translateY(50px); }
        .cm-profile { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .cm-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #3f78e8, #0a1f4d); }
        .cm-handle { font-family: 'DM Sans'; font-size: 8px; color: #fff; font-weight: 700; }
        .cm-followers { font-family: 'DM Sans'; font-size: 7px; color: rgba(255,255,255,0.5); }
        .cm-stats { display: flex; gap: 8px; margin-top: 6px; }
        .cm-stats span { display: flex; flex-direction: column; align-items: center; font-size: 6px; color: rgba(255,255,255,0.45); }
        .cm-stats b { font-size: 8px; color: #fff; font-weight: 700; }

        /* ---- mobile list (<1024px, also forced when reduced-motion) ---- */
        .wv-mobile-list { display: none; position: relative; z-index: 2; }
        .wv-mcard {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 20px;
          margin-top: 24px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .wv-mcard.is-in { opacity: 1; transform: translateY(0); }
        .wv-mcard-head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .wv-mnum {
          font-family: 'Bebas Neue'; font-size: 34px;
          -webkit-text-stroke: 1.5px #3f78e8; color: transparent;
        }
        .wv-mcard .wv-frame { margin-bottom: 14px; }
        .wv-mcard .wv-card { margin-bottom: 10px; }

        @media (min-width: 1024px) {
          .wv-piste { display: block; }
        }
        @media (max-width: 1023px) {
          .wv-mobile-list { display: block; }
        }
        .wv-reduced .wv-piste { display: none !important; }
        .wv-reduced .wv-mobile-list { display: block !important; }

        @media (max-width: 1180px) {
          .wv-panel { grid-template-columns: minmax(0,0.9fr) minmax(0,440px) minmax(0,0.9fr); gap: 28px; }
          .wv-num { font-size: 72px; }
          .wv-step-title { font-size: 24px; }
        }
        @media (max-width: 900px) {
          .wv-section { padding-left: 20px; padding-right: 20px; }
        }
        @media (max-width: 768px) {
          .wv-section { padding-top: 32px; padding-bottom: 32px; }
          .wv-subtitle { font-size: 14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wv-halo, .wv-gradient-line { animation: none !important; }
          .wv-mcard { opacity: 1 !important; transform: none !important; transition: none !important; }
          .wv-media-kenburns { animation: none !important; transform: none !important; }
          .bs-line, .bs-node, .bs-angle-tag, .se-thread-line, .se-dot, .se-card, .se-pill,
          .tr-focus, .cm-notif { transition: none !important; }
          .tr-rec-dot, .tr-vu-bar, .mo-playhead-track, .mo-marker-tag,
          .cm-chip-1, .cm-chip-2, .cm-chip-3 { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
