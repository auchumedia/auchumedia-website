import React, { useState } from 'react';
import { presentationVideo } from '../data/videos';

const BLUE = '#003DA5';
const CLIP = 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))';

function getYouTubeEmbedUrl(url) {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([a-zA-Z0-9_-]{6,})/);
  const id = match ? match[1] : '';
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

export default function PresentationVideo() {
  const [playing, setPlaying] = useState(false);
  const { src, poster, duration } = presentationVideo;
  const hasSrc = !!src;
  const isYouTube = hasSrc && /youtube\.com|youtu\.be/.test(src);

  return (
    <div style={{ width: '100%', maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ padding: '2px', background: BLUE, clipPath: CLIP }}>
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '16 / 9',
          background: '#0a0a0a', clipPath: CLIP, overflow: 'hidden',
        }}>
          {playing && hasSrc ? (
            isYouTube ? (
              <iframe
                src={getYouTubeEmbedUrl(src)}
                title="Présentation AuchuMedia"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            ) : (
              <video
                src={src}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )
          ) : (
            <button
              onClick={() => hasSrc && setPlaying(true)}
              disabled={!hasSrc}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', padding: 0,
                cursor: hasSrc ? 'pointer' : 'default',
                background: poster ? `url(${poster}) center / cover no-repeat` : 'linear-gradient(135deg, #0a0a0a, #0a1f4d)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
              }}
            >
              {hasSrc ? (
                <>
                  <span style={{
                    width: '68px', height: '68px', borderRadius: '50%', background: BLUE,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 28px rgba(0,61,165,0.5)',
                  }}>
                    <span style={{
                      width: 0, height: 0, marginLeft: '4px',
                      borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '18px solid #fff',
                    }} />
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans'", fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: '#fff',
                  }}>
                    Regarder la présentation{duration ? ` · ${duration}` : ''}
                  </span>
                </>
              ) : (
                <span style={{
                  fontFamily: "'DM Sans'", fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                }}>
                  Vidéo bientôt disponible
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
