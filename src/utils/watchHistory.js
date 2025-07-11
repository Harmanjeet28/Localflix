const WATCH_HISTORY_KEY = "localflix_watch_history";

export function getWatchHistory() {
  try {
    const stored = localStorage.getItem(WATCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveWatchTime(filename, time) {
  try {
    const history = getWatchHistory();
    history[filename] = { time };
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history));
  } catch {}
}
