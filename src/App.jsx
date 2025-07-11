import React, { useState, useMemo } from "react";

import Header from "./components/Header";
import FilePicker from "./components/FilePicker";
import VideoModal from "./components/VideoModal";

import Banner from "./components/layout/Banner";
import CollectionGrid from "./components/layout/CollectionGrid";
import VideoGrid from "./components/layout/VideoGrid";

import useAppData from "./hooks/useAppData";

export default function App() {
  const {
    collections,
    currentCollection,
    videos,
    lastWatched,
    setCurrentCollection,
    setVideos,
    setLastWatched,
    loadVideosInCollection,
    handleFolderSelection,
  } = useAppData();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Category filter state: "TV Shows", "Movies", "My List" or null
  const [categoryFilter, setCategoryFilter] = useState(null);

  // My List state - persist in localStorage
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("myList");
    return saved ? JSON.parse(saved) : [];
  });

  // Toggle collection in My List
  const toggleInMyList = (collection) => {
    setMyList((prevList) => {
      const exists = prevList.find((c) => c.name === collection.name);
      let updatedList;
      if (exists) {
        updatedList = prevList.filter((c) => c.name !== collection.name);
      } else {
        updatedList = [...prevList, collection];
      }
      localStorage.setItem("myList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  // Filter collections depending on category and search
  const filteredCollections = useMemo(() => {
    if (categoryFilter === "My List") {
      return myList.filter((col) =>
        col.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return collections.filter((col) => {
      const matchesSearch = col.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter && categoryFilter !== "My List"
          ? col.category?.toLowerCase() === categoryFilter.toLowerCase()
          : true;
      return matchesSearch && matchesCategory;
    });
  }, [collections, myList, searchTerm, categoryFilter]);

  // Filter videos by search term inside selected collection
  const filteredVideos = useMemo(() => {
    if (!searchTerm.trim()) return videos;
    return videos.filter((vid) =>
      vid.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [videos, searchTerm]);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        setCategoryFilter={setCategoryFilter}
      />

      <div className="main-container" style={{ marginTop: "80px" }}>
        {!collections.length && <FilePicker onPick={handleFolderSelection} />}

        {lastWatched &&
          currentCollection === null &&
          !searchTerm.trim() &&
          !categoryFilter && (
            <Banner
              video={lastWatched}
              onPlay={() => {
                setSelectedVideo(lastWatched);
                setLastWatched(null);
              }}
            />
          )}

        {!currentCollection && filteredCollections.length > 0 && (
          <CollectionGrid
            collections={filteredCollections}
            onSelect={loadVideosInCollection}
            toggleInMyList={toggleInMyList}
            myList={myList}
          />
        )}

        {!currentCollection && searchTerm.trim() && filteredCollections.length === 0 && (
          <p style={{ color: "white", textAlign: "center" }}>
            No matches found for "{searchTerm}"
          </p>
        )}

        {currentCollection && (
          <>
            <button
              onClick={() => {
                setCurrentCollection(null);
                setVideos([]);
                setSearchTerm("");
                setCategoryFilter(null);
              }}
              className="back-button"
            >
              ← Back to Shows
            </button>

            <VideoGrid videos={filteredVideos} onSelect={setSelectedVideo} />

            {filteredVideos.length === 0 && searchTerm.trim() && (
              <p style={{ color: "white", textAlign: "center" }}>
                No videos found for "{searchTerm}"
              </p>
            )}
          </>
        )}

        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </div>
    </>
  );
}
