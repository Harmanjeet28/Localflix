import React from "react";

export default function Banner({ video, onPlay }) {
  return (
    <div className="banner" onClick={onPlay} style={{ cursor: "pointer" }}>
      {video.posterUrl ? (
        <img src={video.posterUrl} alt={video.name} className="banner-image" />
      ) : (
        <video src={video.url} muted preload="metadata" className="banner-image" />
      )}
      <div className="banner-info">
        <h2 className="banner-title">{video.name}</h2>
        <button className="play-button">▶ Play</button>
      </div>
    </div>
  );
}
