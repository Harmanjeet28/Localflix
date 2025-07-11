import React from "react";
import SingleMovieBox from "./SingleMovieBox";

export default function VideoGrid({ videos, onSelect }) {
  if (!videos.length) return null;

  if (videos.length === 1) {
    return <SingleMovieBox video={videos[0]} onPlay={onSelect} />;
  }

  return (
    <div className="horizontal-scroll">
      {videos.map((video) => (
        <div
          key={video.name}
          className="video-card"
          onClick={() => onSelect(video)}
        >
          {video.posterUrl ? (
            <img src={video.posterUrl} alt={video.name} />
          ) : (
            <div className="no-poster">No Poster</div>
          )}
          <div className="video-name">{video.name}</div>
        </div>
      ))}
    </div>
  );
}
