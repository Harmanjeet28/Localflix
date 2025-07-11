import { useState, useEffect } from "react";
import { getWatchHistory } from "../utils/watchHistory";
import { saveDirHandle, getDirHandle } from "../utils/dirStorage";

export default function useAppData() {
  const [collections, setCollections] = useState([]);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [videos, setVideos] = useState([]);
  const [lastWatched, setLastWatched] = useState(null);

  useEffect(() => {
    (async () => {
      const savedHandle = await getDirHandle();
      if (savedHandle) {
        const permission = await savedHandle.queryPermission({ mode: "read" });
        if (permission === "granted" || permission === "prompt") {
          await loadCollections(savedHandle);
        }
      }
    })();
  }, []);

  const loadCollections = async (mainDirHandle) => {
    const folders = [];

    for await (const entry of mainDirHandle.values()) {
      if (entry.kind === "directory") {
        let hasSubfolders = false;

        for await (const subEntry of entry.values()) {
          if (subEntry.kind === "directory") {
            hasSubfolders = true;
            break;
          }
        }

        if (hasSubfolders) {
          for await (const subEntry of entry.values()) {
            if (subEntry.kind === "directory") {
              let posterUrl = null;
              for await (const fileEntry of subEntry.values()) {
                if (
                  fileEntry.kind === "file" &&
                  /\.(jpg|jpeg|png|webp)$/i.test(fileEntry.name.toLowerCase())
                ) {
                  const file = await fileEntry.getFile();
                  posterUrl = URL.createObjectURL(file);
                  break;
                }
              }

              folders.push({
                name: subEntry.name,
                category: entry.name,
                handle: subEntry,
                posterUrl,
              });
            }
          }
        } else {
          let posterUrl = null;
          for await (const fileEntry of entry.values()) {
            if (
              fileEntry.kind === "file" &&
              /\.(jpg|jpeg|png|webp)$/i.test(fileEntry.name.toLowerCase())
            ) {
              const file = await fileEntry.getFile();
              posterUrl = URL.createObjectURL(file);
              break;
            }
          }

          folders.push({
            name: entry.name,
            category: null,
            handle: entry,
            posterUrl,
          });
        }
      }
    }

    setCollections(folders);
    setCurrentCollection(null);
    setVideos([]);
    await saveDirHandle(mainDirHandle);
  };

  const loadVideosInCollection = async (collectionHandle) => {
    const vids = [];
    const history = getWatchHistory();

    const filesMap = new Map();
    for await (const entry of collectionHandle.values()) {
      if (entry.kind === "file") {
        filesMap.set(entry.name, entry);
      }
    }

    const getBaseName = (filename) =>
      filename.replace(/\.[^/.]+$/, "").toLowerCase();
    const isImage = (name) => /\.(jpg|jpeg|png|webp)$/i.test(name);

    for (const [name, entry] of filesMap.entries()) {
      if (name.toLowerCase().endsWith(".mp4")) {
        const file = await entry.getFile();
        const videoBase = getBaseName(name);
        let posterUrl = null;

        for (const [imgName, imgEntry] of filesMap.entries()) {
          if (isImage(imgName)) {
            const imgBase = getBaseName(imgName);
            if (videoBase.includes(imgBase) || imgBase.includes(videoBase)) {
              const imgFile = await imgEntry.getFile();
              posterUrl = URL.createObjectURL(imgFile);
              break;
            }
          }
        }

        const url = URL.createObjectURL(file);
        const watch = history[name]?.time || 0;

        vids.push({ name, file, url, watch, posterUrl });
      }
    }

    setVideos(vids);
    setCurrentCollection(collectionHandle);
  };

  const getVideosFromCollection = async (collectionHandle) => {
    const vids = [];
    const filesMap = new Map();
    for await (const entry of collectionHandle.values()) {
      if (entry.kind === "file") {
        filesMap.set(entry.name, entry);
      }
    }

    const getBaseName = (filename) => filename.replace(/\.[^/.]+$/, "").toLowerCase();
    const isImage = (name) => /\.(jpg|jpeg|png|webp)$/i.test(name);

    for (const [name, entry] of filesMap.entries()) {
      if (name.toLowerCase().endsWith(".mp4")) {
        const file = await entry.getFile();
        const videoBase = getBaseName(name);
        let posterUrl = null;
        for (const [imgName, imgEntry] of filesMap.entries()) {
          if (isImage(imgName)) {
            const imgBase = getBaseName(imgName);
            if (videoBase.includes(imgBase) || imgBase.includes(videoBase)) {
              const imgFile = await imgEntry.getFile();
              posterUrl = URL.createObjectURL(imgFile);
              break;
            }
          }
        }
        const url = URL.createObjectURL(file);
        vids.push({ name, file, url, posterUrl });
      }
    }

    return vids;
  };

  useEffect(() => {
    if (collections.length === 0) return;

    (async () => {
      const history = getWatchHistory();
      let lastVideoName = null;
      let maxWatchTime = 0;

      Object.entries(history).forEach(([name, { time }]) => {
        if (time > maxWatchTime) {
          maxWatchTime = time;
          lastVideoName = name;
        }
      });

      if (lastVideoName) {
        for (const collection of collections) {
          const vids = await getVideosFromCollection(collection.handle);
          const found = vids.find((v) => v.name === lastVideoName);
          if (found) {
            setLastWatched(found);
            return;
          }
        }
      }

      const vids = await getVideosFromCollection(collections[0].handle);
      if (vids.length) {
        setLastWatched(vids[Math.floor(Math.random() * vids.length)]);
      }
    })();
  }, [collections]);

  const handleFolderSelection = async () => {
    const mainDirHandle = await window.showDirectoryPicker();
    await loadCollections(mainDirHandle);
  };

  // NEW: Reset folder selection & clear saved directory
  const resetFolderSelection = async () => {
    await saveDirHandle(null);  // clear saved directory handle
    setCollections([]);
    setCurrentCollection(null);
    setVideos([]);
    setLastWatched(null);
  };

  return {
    collections,
    currentCollection,
    videos,
    lastWatched,
    setCurrentCollection,
    setVideos,
    setLastWatched,
    loadCollections,
    loadVideosInCollection,
    handleFolderSelection,
    resetFolderSelection,  // Export the reset function
  };
}
