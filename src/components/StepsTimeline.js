import React, { useEffect, useRef, useState } from 'react';
import { steps } from '../data/approach';

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function StepRow({ step, index, reversed, dotRef, numRef, imageInnerRef }) {
  const rowRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const textCol = (
    <div className="step-col step-col-text">
      <div ref={numRef} className="step-num">{step.num}</div>
      <div className="step-titre">{step.titre}</div>
      <p className="step-texte">{step.texte}</p>
      <div className="step-tags">
        {step.tags.map((t, ti) => (
          <span key={t} className="step-tag" style={{ transitionDelay: `${0.3 + ti * 0.08}s` }}>{t}</span>
        ))}
      </div>
    </div>
  );

  const visualCol = (
    <div className="step-col step-col-visual">
      <div className="step-image-card">
        <div className="step-image-wipe">
          <div className="step-image-scale">
            <div ref={imageInnerRef} className="step-image-inner">
              {step.img ? (
                <div className="step-image-bg" style={{ backgroundImage: `url(${step.img})` }} />
              ) : (
                <div className="step-placeholder">
                  <div className="step-placeholder-grid" />
                  <div className="step-placeholder-halo" />
                  <span className="step-placeholder-num">{step.num}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="step-badge">{step.num} · {step.titre}</div>
      </div>
    </div>
  );

  return (
    <div ref={rowRef} className={`step-row ${revealed ? 'is-revealed' : ''}`}>
      <span ref={dotRef} className="step-dot" />
      {reversed ? <>{visualCol}{textCol}</> : <>{textCol}{visualCol}</>}
    </div>
  );
}

export default function StepsTimeline() {
  const bodyRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const numRefs = useRef([]);
  const imageInnerRefs = useRef([]);
  const pingedRef = useRef(steps.map(() => false));

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      if (lineRef.current) lineRef.current.style.transform = 'scaleY(1)';
      dotRefs.current.forEach((el) => { if (el) el.classList.add('step-dot-active'); });
      numRefs.current.forEach((el) => { if (el) el.classList.add('step-num-active'); });
      return undefined;
    }

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const el = bodyRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = clamp((vh - rect.top) / (vh + rect.height * 0.35), 0, 1);

        if (lineRef.current) lineRef.current.style.transform = `scaleY(${p.toFixed(4)})`;

        const n = steps.length;
        steps.forEach((_, i) => {
          const threshold = (i + 0.5) / n;
          const active = p >= threshold;

          const dotEl = dotRefs.current[i];
          if (dotEl) {
            dotEl.classList.toggle('step-dot-active', active);
            if (active && !pingedRef.current[i]) {
              pingedRef.current[i] = true;
              dotEl.classList.remove('step-ping-fire');
              void dotEl.offsetWidth;
              dotEl.classList.add('step-ping-fire');
            } else if (!active) {
              pingedRef.current[i] = false;
            }
          }

          const numEl = numRefs.current[i];
          if (numEl) numEl.classList.toggle('step-num-active', active);

          const imgEl = imageInnerRefs.current[i];
          if (imgEl) {
            const parallax = clamp((p - i / n) * 60, -20, 20);
            imgEl.style.transform = `translateY(${parallax.toFixed(2)}px)`;
          }
        });
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
  }, []);

  return (
    <div className="steps-timeline">
      <div className="steps-header">
        <div className="steps-label">Notre méthode</div>
        <h3 className="steps-title">
          <span className="steps-title-black">DE L'IDÉE À </span>
          <span className="hero-gradient-line">L'ATTENTION.</span>
        </h3>
      </div>

      <div ref={bodyRef} className="steps-body">
        <div className="steps-line-track">
          <div ref={lineRef} className="steps-line-fill" />
        </div>

        <div className="steps-rows">
          {steps.map((step, i) => (
            <StepRow
              key={step.num}
              step={step}
              index={i}
              reversed={i % 2 === 1}
              dotRef={(el) => { dotRefs.current[i] = el; }}
              numRef={(el) => { numRefs.current[i] = el; }}
              imageInnerRef={(el) => { imageInnerRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .steps-timeline {
          position: relative;
        }
        .steps-header {
          text-align: center;
          margin-bottom: 88px;
        }
        .steps-label {
          font-family: 'DM Sans';
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #003DA5;
          margin-bottom: 18px;
        }
        .steps-title {
          font-family: 'Bebas Neue';
          font-size: clamp(40px, 6.5vw, 84px);
          line-height: 1.02;
          margin: 0;
          text-transform: uppercase;
        }
        .steps-title-black { color: #0a0a0a; }

        .steps-body {
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
        }
        .steps-line-track {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(10,10,10,0.1);
          transform: translateX(-50%);
        }
        .steps-line-fill {
          position: relative;
          width: 100%;
          height: 100%;
          background: #003DA5;
          transform-origin: top;
          transform: scaleY(0);
          will-change: transform;
        }
        .steps-line-fill::after {
          content: '';
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #003DA5;
          box-shadow: 0 0 0 6px rgba(0,61,165,0.22), 0 0 22px rgba(0,61,165,0.6);
          animation: stepsGlowPulse 1.8s ease-in-out infinite;
        }
        @keyframes stepsGlowPulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.7; transform: translateX(-50%) scale(1.25); }
        }

        .steps-rows {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
        }
        .step-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 64px;
          align-items: center;
          padding: 36px 0;
        }
        .step-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #f8f8fa;
          border: 2px solid rgba(10,10,10,0.15);
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          z-index: 3;
        }
        .step-dot-active {
          background: #003DA5;
          border-color: #003DA5;
          box-shadow: 0 0 0 6px rgba(0,61,165,0.16), 0 0 18px rgba(0,61,165,0.5);
        }
        .step-ping-fire { animation: stepPing 0.9s ease-out; }
        @keyframes stepPing {
          from { box-shadow: 0 0 0 0 rgba(0,61,165,0.55); }
          to { box-shadow: 0 0 0 28px rgba(0,61,165,0); }
        }

        .step-col-text {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .step-row.is-revealed .step-col-text { opacity: 1; transform: translateY(0); }

        .step-num {
          font-family: 'Bebas Neue';
          font-size: clamp(56px, 6vw, 88px);
          line-height: 1;
          -webkit-text-stroke: 1.5px #003DA5;
          color: transparent;
          transition: color 0.4s ease;
          margin-bottom: 4px;
        }
        .step-num-active { color: #003DA5; }

        .step-titre {
          font-family: 'DM Sans';
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #0a0a0a;
          margin-bottom: 12px;
        }
        .step-texte {
          font-family: 'DM Sans';
          font-size: 15px;
          color: rgba(10,10,10,0.6);
          line-height: 1.75;
          margin: 0 0 20px;
          max-width: 400px;
        }
        .step-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .step-tag {
          display: inline-block;
          background: #ffffff;
          border: 1px solid #e3e6f0;
          color: #0a0a0a;
          font-family: 'DM Sans';
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 999px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .step-row.is-revealed .step-tag { opacity: 1; transform: translateY(0); }

        .step-col-visual {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .step-row.is-revealed .step-col-visual { opacity: 1; }

        .step-image-card { position: relative; }
        .step-image-wipe {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.14);
          border: 1px solid rgba(255,255,255,0.6);
          clip-path: inset(0 100% 0 0);
          transition: clip-path 0.9s cubic-bezier(.22,1,.36,1);
        }
        .step-row.is-revealed .step-image-wipe { clip-path: inset(0 0 0 0); }
        .step-image-scale {
          position: absolute;
          inset: 0;
          transform: scale(1.15);
          transition: transform 0.9s cubic-bezier(.22,1,.36,1);
        }
        .step-row.is-revealed .step-image-scale { transform: scale(1); }
        .step-image-inner {
          position: absolute;
          inset: -20px;
          will-change: transform;
        }
        .step-image-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        .step-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #0a0a14, #0d2a6b);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .step-placeholder-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .step-placeholder-halo {
          position: absolute;
          width: 55%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,97,255,0.5), transparent 70%);
          filter: blur(10px);
          animation: stepHaloDrift 11s ease-in-out infinite;
        }
        @keyframes stepHaloDrift {
          0%, 100% { transform: translate(-25%, -20%); }
          50% { transform: translate(20%, 20%); }
        }
        .step-placeholder-num {
          position: relative;
          z-index: 1;
          font-family: 'Bebas Neue';
          font-size: clamp(64px, 9vw, 120px);
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
          color: transparent;
        }

        .step-badge {
          position: absolute;
          left: 16px;
          bottom: 16px;
          z-index: 2;
          background: rgba(10,10,10,0.72);
          backdrop-filter: blur(6px);
          color: #fff;
          font-family: 'DM Sans';
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 8px 14px;
          border-radius: 999px;
          opacity: 0;
          transition: opacity 0.6s ease 0.5s;
        }
        .step-row.is-revealed .step-badge { opacity: 1; }

        @media (max-width: 768px) {
          .steps-header { margin-bottom: 56px; }
          .steps-line-track { left: 18px; transform: none; }
          .step-row {
            grid-template-columns: 1fr;
            row-gap: 24px;
            padding: 28px 0 28px 48px;
          }
          .step-dot { left: 18px; }
          .step-col-visual { order: -1; }
          .step-texte { max-width: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .step-col-text, .step-tag, .step-col-visual, .step-badge {
            opacity: 1 !important; transform: none !important; transition: none !important;
          }
          .step-image-wipe { clip-path: inset(0 0 0 0) !important; }
          .step-image-scale { transform: scale(1) !important; }
        }
      `}</style>
    </div>
  );
}
