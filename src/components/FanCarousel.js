import React from 'react';
import FanCard from './FanCard';

const ROTATIONS = [-4, 3, -2, 4];
const Y_OFFSETS = [8, -6, 10, -4];

export default function FanCarousel({ fan }) {
  const items = [...fan, ...fan];

  return (
    <div className="fan-carousel">
      <div className="fan-carousel-track">
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="fan-carousel-item"
            style={{ '--rot': `${ROTATIONS[i % ROTATIONS.length]}deg`, '--ty': `${Y_OFFSETS[i % Y_OFFSETS.length]}px` }}
          >
            <div className="fan-carousel-card">
              <FanCard item={item} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .fan-carousel {
          overflow: clip;
          padding: 24px 0 32px;
        }
        .fan-carousel-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: fanCarouselLTR 40s linear infinite;
        }
        .fan-carousel:hover .fan-carousel-track {
          animation-play-state: paused;
        }
        @keyframes fanCarouselLTR {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .fan-carousel-item {
          width: 260px;
          flex-shrink: 0;
        }
        .fan-carousel-card {
          transform: rotate(var(--rot)) translateY(var(--ty));
          transition: transform 0.25s ease;
          will-change: transform;
        }
        .fan-carousel-item:hover .fan-carousel-card {
          transform: rotate(var(--rot)) translateY(calc(var(--ty) - 10px));
        }
        @media (max-width: 768px) {
          .fan-carousel-track { gap: 16px; animation-duration: 30s; }
          .fan-carousel-item { width: 55vw; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fan-carousel-track {
            animation: none;
            transform: none;
            width: 100%;
            justify-content: center;
          }
          .fan-carousel-item:nth-child(n + ${items.length / 2 + 1}) { display: none; }
        }
      `}</style>
    </div>
  );
}
