import React from 'react';

// Same cut-corner frame used by the hero's "Vidéo bientôt disponible" placeholder.
// `bordered=false` skips the border/clip layer so it can sit inside a parent
// that already provides the same cut-corner shape (e.g. WhyVideos' frame).
const CLIP = 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))';

export default function MediaPlaceholder({ label, caption, bordered = true }) {
  return (
    <div className={`media-placeholder ${bordered ? '' : 'media-placeholder-bare'}`}>
      <div className="media-placeholder-inner">
        <span className="media-placeholder-label">{label}</span>
        {caption && <span className="media-placeholder-caption">{caption}</span>}
      </div>
      <style>{`
        .media-placeholder {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 2px;
          background: #1a3a9f;
          clip-path: ${CLIP};
        }
        .media-placeholder-bare {
          padding: 0;
          background: transparent;
          clip-path: none;
        }
        .media-placeholder-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0a0f, #0d1a3d);
          clip-path: ${CLIP};
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
          padding: 16px;
        }
        .media-placeholder-bare .media-placeholder-inner {
          clip-path: none;
        }
        .media-placeholder-label {
          font-family: 'DM Sans';
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }
        .media-placeholder-caption {
          font-family: 'DM Sans';
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
      `}</style>
    </div>
  );
}
