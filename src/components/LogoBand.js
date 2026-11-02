import React from 'react';

const LOGOS = [
  { src: '/cardinal.png', alt: 'Cardinal Asphalte' },
  { src: '/norcan.png', alt: 'Nor-Can' },
  { src: '/lefevbre.png', alt: 'R. Lefebvre & Fils' },
  { src: '/trabsport.png', alt: 'Transport Christian Tardif' },
  { src: '/nsexxxplus.png', alt: 'SexxxPlus' },
];

export default function LogoBand() {
  return (
    <div className="logo-band">
      <div className="logo-band-glow" />
      <div className="logo-band-track">
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <img key={i} src={l.src} alt={l.alt} className="logo-band-logo" />
        ))}
      </div>

      <style>{`
        .logo-band {
          position: relative;
          width: 100%;
          height: 110px;
          background: #0a0a0a;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .logo-band-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 480px 110px at 50% 50%, rgba(0,61,165,0.45), transparent 70%);
          pointer-events: none;
        }
        .logo-band-track {
          display: flex;
          align-items: center;
          gap: 72px;
          width: max-content;
          padding: 0 36px;
          animation: logoBandScroll 32s linear infinite;
        }
        .logo-band:hover .logo-band-track {
          animation-play-state: paused;
        }
        .logo-band-logo {
          height: 28px;
          width: auto;
          flex-shrink: 0;
          filter: brightness(0) invert(1);
          opacity: 0.8;
        }
        @keyframes logoBandScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .logo-band { height: 90px; }
          .logo-band-track { gap: 48px; }
          .logo-band-logo { height: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-band-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
