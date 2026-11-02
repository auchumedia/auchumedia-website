import React from 'react';
import { fan } from '../data/showcase';
import FanCarousel from './FanCarousel';

export default function FanShowcase() {
  return (
    <section id="clients" className="fan-section" aria-label="Nos clients actuels">
      <h2 className="fan-title">Nos clients actuels</h2>

      <FanCarousel fan={fan} />

      <style>{`
        .fan-section {
          position: relative;
          background: #ffffff;
          padding: 40px 0 0;
          overflow: clip;
        }
        .fan-title {
          font-family: 'Bebas Neue';
          color: #003DA5;
          font-size: clamp(40px, 6vw, 72px);
          text-align: center;
          margin: 0 0 48px;
          text-transform: uppercase;
          padding: 0 20px;
        }

        .fan-card {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 14;
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
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 44%);
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
          margin-bottom: 6px;
        }
        .fan-card-views {
          font-family: 'Bebas Neue';
          font-size: 22px;
          line-height: 1;
          color: #bcd4ff;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .fan-card-videos {
          font-family: 'DM Sans';
          font-size: 11px;
          color: rgba(255,255,255,0.75);
          margin-top: 3px;
        }

        @media (max-width: 768px) {
          .fan-title { font-size: clamp(32px, 9vw, 48px); margin: 0 0 32px; }
          .fan-card-text { top: 10px; left: 10px; right: 10px; }
          .fan-card-name { font-size: 11px; }
          .fan-card-views { font-size: 17px; }
          .fan-card-videos { font-size: 10px; }
          .fan-card-placeholder-name { font-size: 16px; }
        }
      `}</style>
    </section>
  );
}
