import React from 'react';

function tiktokVideoId(url) {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

export default function TikTokCarousel({ videos, emptyLabel }) {
  const items = videos && videos.length > 0 ? videos : [null, null, null, null];

  return (
    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
      {items.map((url, i) => {
        const id = url ? tiktokVideoId(url) : null;
        return (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: '220px',
              aspectRatio: '9 / 16',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '0.5px solid rgba(255,255,255,0.1)',
              background: '#111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {id ? (
              <iframe
                title={`tiktok-${i}`}
                src={`https://www.tiktok.com/embed/v2/${id}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media"
                loading="lazy"
              />
            ) : url ? (
              <video src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls />
            ) : (
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 16px', textAlign: 'center' }}>
                {emptyLabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
