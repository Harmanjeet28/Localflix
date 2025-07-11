import React from "react";
import "../../styles/SingleMovieBox.css";

export default function SingleMovieBox({ video, onPlay }) {
  return (
    <div className="single-movie-box">
      <h2 className="movie-title">{video.name}</h2>

      {/* No thumbnail image here */}

      <button className="play-button" onClick={() => onPlay(video)}>
        ▶ Play Movie
      </button>
    </div>
  );
}
