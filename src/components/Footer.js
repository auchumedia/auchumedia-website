import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '24px 60px', borderTop: '0.5px solid rgba(255,255,255,0.12)',
      background: '#080808', width: '100%'
    }}>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: '16px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)' }}>
        AUCHUMEDIA
      </div>
      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
        © 2025 Agence AuchuMedia Inc. · Montréal, Québec
      </div>
    </footer>
  );
}
