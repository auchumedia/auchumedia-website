import React, { useEffect, useRef, useState } from 'react';
import { fan } from '../data/showcase';
import FanArc from './FanArc';
import FanMobileSlider from './FanMobileSlider';

export default function FanShowcase() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  ));

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section ref={sectionRef} id="clients" className="fan-section" aria-label="Nos clients actuels">
      <h2 className="fan-title">Nos clients actuels</h2>

      {isMobile ? <FanMobileSlider fan={fan} /> : <FanArc fan={fan} sectionRef={sectionRef} />}

      <style>{`
        .fan-section {
          position: relative;
          background: #ffffff;
          padding: 40px 20px 0;
          overflow: clip;
        }
        .fan-title {
          font-family: 'Bebas Neue';
          color: #003DA5;
          font-size: clamp(40px, 6vw, 72px);
          text-align: center;
          margin: 0 0 56px;
          text-transform: uppercase;
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
          font-size: 22px;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          text-align: center;
          padding: 0 14px;
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
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        @media (max-width: 768px) {
          .fan-section { padding: 28px 0 0; }
          .fan-title { margin: 0 20px 32px; font-size: clamp(32px, 9vw, 48px); }
          .fan-card { aspect-ratio: 9 / 14; border-radius: 18px; }
          .fan-card-text { top: 10px; left: 10px; right: 10px; }
          .fan-card-name { font-size: 11px; }
          .fan-card-placeholder-name { font-size: 16px; }
        }
      `}</style>
    </section>
  );
}
