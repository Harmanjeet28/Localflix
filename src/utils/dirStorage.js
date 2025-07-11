import { get, set } from "idb-keyval";

const DIR_HANDLE_KEY = "localflix_dir_handle";

export async function saveDirHandle(handle) {
  await set(DIR_HANDLE_KEY, handle);
}

export async function getDirHandle() {
  return await get(DIR_HANDLE_KEY);
}
