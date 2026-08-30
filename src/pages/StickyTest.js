import React from 'react';

const items = [
  {
    title: 'CONTRÔLE DE TON IMAGE',
    bg: 'linear-gradient(135deg, #1a0a2a, #2a1a3a)',
    image: null
  },
  {
    title: 'REVENUS DIVERSIFIÉS',
    bg: null,
    image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1788118137/Capture_d_%C3%A9cran_le_2026-08-30_%C3%A0_15.28.22_wwxod5.png'
  },
  {
    title: "PRÉPARER L'APRÈS-CARRIÈRE",
    bg: null,
    image: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1788122678/Capture_d_%C3%A9cran_le_2026-08-30_%C3%A0_16.43.54_qlkahx.png'
  },
];

export default function StickyTest() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ padding: '100px 60px 300px' }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              position: 'sticky',
              top: `${80 + i * 30}px`,
              zIndex: i + 1,
              height: '500px',
              maxWidth: '900px',
              margin: '0 auto',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.image
              ? <img src={item.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ position: 'absolute', inset: 0, background: item.bg }} />
            }
            <h2 style={{ position: 'relative', zIndex: 1, color: '#fff', fontFamily: 'sans-serif', fontSize: '48px', textAlign: 'center', padding: '0 24px' }}>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
