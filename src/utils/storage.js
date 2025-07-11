const DIR_HANDLE_KEY = "localflix_dir_handle";

export async function saveDirHandle(handle) {
  if ("storage" in navigator && "persist" in navigator.storage) {
    await navigator.storage.persist();
  }
  const idb = await window.indexedDB.open("localflix-db", 1);
  idb.onupgradeneeded = () => {
    const db = idb.result;
    if (!db.objectStoreNames.contains("handles")) {
      db.createObjectStore("handles");
    }
  };
  idb.onsuccess = () => {
    const db = idb.result;
    const tx = db.transaction("handles", "readwrite");
    const store = tx.objectStore("handles");
    store.put(handle, DIR_HANDLE_KEY);
    tx.oncomplete = () => db.close();
  };
}

export async function getDirHandle() {
  const idb = await window.indexedDB.open("localflix-db", 1);
  return new Promise((resolve, reject) => {
    idb.onsuccess = () => {
      const db = idb.result;
      const tx = db.transaction("handles", "readonly");
      const store = tx.objectStore("handles");
      const request = store.get(DIR_HANDLE_KEY);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(null);
    };
    idb.onerror = () => reject(null);
  });
}
