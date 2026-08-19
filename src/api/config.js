export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://rugbymanagementsystem.onrender.com/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function getAssetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_ORIGIN}${path}`;
}