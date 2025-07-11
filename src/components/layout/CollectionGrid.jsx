import React from "react";
import CollectionCard from "./CollectionCard";
import "./CollectionGrid.css"; // Make sure this line is present

export default function CollectionGrid({ collections, onSelect, toggleInMyList, myList }) {
  return (
    <div className="collection-grid">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.name}
          collection={collection}
          onSelect={onSelect}
          toggleInMyList={toggleInMyList}
          isInMyList={myList.some((c) => c.name === collection.name)}
        />
      ))}
    </div>
  );
}
