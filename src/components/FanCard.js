import React from 'react';

export default function FanCard({ item }) {
  return (
    <div
      className="fan-card"
      style={{
        background: item.img
          ? `url(${item.img}) center / cover no-repeat`
          : (item.gradient || 'linear-gradient(135deg, #14161d, #050506)'),
      }}
    >
      {!item.img && <span className="fan-card-placeholder-name">{item.name}</span>}
      <div className="fan-card-overlay" />
      <div className="fan-card-text">
        <div className="fan-card-name">{item.name}</div>
        {item.views && (
          <>
            <div className="fan-card-views">{item.views}</div>
            {item.videos && <div className="fan-card-videos">{item.videos}</div>}
          </>
        )}
      </div>
    </div>
  );
}
