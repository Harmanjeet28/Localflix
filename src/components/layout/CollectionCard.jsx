import React, { useState } from "react";
import "./CollectionCard.css";

export default function CollectionCard({ collection, onSelect, toggleInMyList, isInMyList }) {
  const [hovered, setHovered] = useState(false);

  const { name, posterUrl, metadata } = collection;

  const toggleMyList = (e) => {
    e.stopPropagation(); // prevent triggering onSelect
    toggleInMyList(collection);
  };

  return (
    <div
      className={`collection-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(collection.handle)}
      title={name}
    >
      <div className={`collection-name ${hovered ? "dimmed" : ""}`}>{name}</div>
      {posterUrl && <img src={posterUrl} alt={name} className="poster" />}

      <div className="details-panel">
        <h3>{name}</h3>
        {metadata && (
          <>
            <p><strong>Genre:</strong> {metadata.genre}</p>
            <p><strong>Air Date:</strong> {metadata.airDate}</p>
            <p>{metadata.description}</p>
          </>
        )}
        <button
          className={`my-list-btn ${isInMyList ? "added" : ""}`}
          onClick={toggleMyList}
        >
          {isInMyList ? "Remove from My List" : "Add to My List"}
        </button>
      </div>
    </div>
  );
}
