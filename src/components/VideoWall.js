import React, { useRef, useEffect, useMemo } from 'react';
import { wallVideos } from '../data/videos';

const ROW_COUNT = 4;
const ROW_DURATIONS = [60, 75, 60, 75];

function chunkIntoRows(videos, rowCount) {
  const rows = Array.from({ length: rowCount }, () => []);
  videos.forEach((v, i) => rows[i % rowCount].push(v));
  return rows;
}

function Thumb({ video, onVideoEl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (video.src && videoRef.current) onVideoEl(videoRef.current);
  }, [video.src, onVideoEl]);

  if (!video.src) {
    return <div className="wall-thumb"><div className="wall-thumb-placeholder" /></div>;
  }

  return (
    <div className="wall-thumb">
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster || undefined}
        muted
        loop
        playsInline
        preload="none"
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default function VideoWall() {
  const rows = useMemo(() => chunkIntoRows(wallVideos, ROW_COUNT), []);
  const videoEls = useRef(new Set());
  const onVideoEl = (el) => { videoEls.current.add(el); };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.15 });

    videoEls.current.forEach(v => observer.observe(v));
    return () => observer.disconnect();
  }, [rows]);

  return (
    <div className="video-wall" aria-hidden="true">
      <div className="video-wall-rotate">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`wall-row ${i % 2 === 0 ? 'wall-row-left' : 'wall-row-right'}`}
            style={{ animationDuration: `${ROW_DURATIONS[i % ROW_DURATIONS.length]}s` }}
          >
            {[...row, ...row].map((video, j) => (
              <Thumb key={j} video={video} onVideoEl={onVideoEl} />
            ))}
          </div>
        ))}
      </div>
      <div className="video-wall-fade" />

      <style>{`
        .video-wall {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .video-wall-rotate {
          position: absolute;
          inset: -20%;
          transform: rotate(-8deg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          opacity: 0.35;
        }
        .wall-row {
          display: flex;
          gap: 18px;
          width: max-content;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .wall-row-left { animation-name: wallScrollLeft; }
        .wall-row-right { animation-name: wallScrollRight; }
        @keyframes wallScrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes wallScrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .wall-thumb {
          width: 124px;
          height: 220px;
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
          background: #e9e9ee;
        }
        .wall-thumb video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .wall-thumb-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          background: #e9e9ee;
        }
        .video-wall-fade {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 55%, #ffffff 85%),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.85) 82%, #ffffff 100%);
        }
        @media (max-width: 768px) {
          .wall-thumb { width: 84px; height: 150px; border-radius: 10px; }
          .video-wall-rotate { gap: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wall-row-left, .wall-row-right { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
