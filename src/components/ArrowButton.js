import React from 'react';

const BLUE = '#003DA5';

export default function ArrowButton({
  children,
  onClick,
  background = BLUE,
  color = '#fff',
  lift = false,
  className = '',
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      className={`arrow-btn ${lift ? 'arrow-btn-lift' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        fontFamily: "'DM Sans'",
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color,
        background,
        border: 'none',
        borderRadius: '999px',
        padding: '6px 6px 6px 24px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span className="arrow-btn-label">{children}</span>
      <span
        className="arrow-btn-square"
        style={{
          width: '30px',
          height: '30px',
          flexShrink: 0,
          borderRadius: '8px',
          background: '#0a0a0a',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="arrow-btn-arrow" style={{ color: '#fff', fontSize: '15px', display: 'inline-block' }}>→</span>
      </span>
    </button>
  );
}
