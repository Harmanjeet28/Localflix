import React, { useEffect, useRef } from "react";
import { saveWatchTime } from "../utils/watchHistory";

export default function VideoModal({ video, onClose }) {
  const videoRef = useRef();

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleLoadedMetadata = async () => {
      if (video.watch > 0 && video.watch < vid.duration) {
        vid.currentTime = video.watch;
      }

      // 👉 Attempt to go fullscreen
      try {
        if (vid.requestFullscreen) {
          await vid.requestFullscreen();
        } else if (vid.webkitRequestFullscreen) {
          await vid.webkitRequestFullscreen(); // Safari
        } else if (vid.msRequestFullscreen) {
          await vid.msRequestFullscreen(); // IE11
        }
      } catch (err) {
        console.warn("Fullscreen failed", err);
      }

      // Play video
      vid.play().catch(() => {});
    };

    vid.pause();
    vid.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      vid.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [video]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const saveTime = () => {
      saveWatchTime(video.name, vid.currentTime);
    };

    vid.addEventListener("pause", saveTime);
    return () => {
      saveTime();
      vid.removeEventListener("pause", saveTime);
    };
  }, [video]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-auto">
        <button
          className="absolute top-2 right-2 text-white text-3xl"
          onClick={onClose}
        >
          ×
        </button>
        <video
          ref={videoRef}
          src={video.url}
          controls
          className="w-full max-h-[90vh] rounded"
        />
      </div>
    </div>
  );
}
