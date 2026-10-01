import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', padding: '80px 20px 32px', textAlign: 'center' }}>
      <img src="/Copie de AUCHU.png.png" alt="AuchuMedia" style={{ height: '24px', width: 'auto', margin: '0 auto 24px' }} />
      <p style={{ fontFamily: "'DM Sans'", fontSize: '14px', color: 'rgba(255,255,255,0.55)', maxWidth: '420px', margin: '0 auto 48px', lineHeight: 1.6 }}>
        L'attention se mérite. On sait comment l'obtenir.
      </p>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans'" }}>
        © 2025 AuchuMedia
      </div>
    </footer>
  );
}
