export async function setStorage(key, data) {
  if (!chrome?.storage?.local) return false;
  try {
    await chrome.storage.local.set({ [key]: data });
    return true;
  } catch {
    return false;
  }
}
export async function getStorage(key) {
  if (!chrome?.storage?.local) return;
  try {
    const result = await chrome.storage.local.get(key);
    return result[key];
  } catch {
    return null;
  }
}
