import React from "react";

export default function VideoCard({ video, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative min-w-[150px] w-[150px] h-[225px] rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-110"
    >
      <div className="w-full h-full relative bg-zinc-900">
        {video.posterUrl ? (
          <img
            src={video.posterUrl}
            alt={video.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            src={video.url}
            muted
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
        )}

        {/* Play icon overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-white drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.306v7.388a1 1 0 001.234.97l6.518-1.889a1 1 0 00.75-.97v-4.658a1 1 0 00-.75-.87z"
            />
          </svg>
        </div>
      </div>
      <div
        className="mt-2 px-1 text-sm font-semibold truncate text-center"
        title={video.name}
      >
        {video.name}
      </div>
    </div>
  );
}
