import React from 'react';

const items = [
  { title: 'Card 1', bg: '#1a1a2e' },
  { title: 'Card 2', bg: '#16213e' },
  { title: 'Card 3', bg: '#0f3460' },
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
              background: item.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2 style={{ color: '#fff', fontFamily: 'sans-serif', fontSize: '48px' }}>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
