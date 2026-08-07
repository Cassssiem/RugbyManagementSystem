import { API_BASE_URL, getAuthHeaders } from "./config";

export async function uploadPlayerImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const headers = getAuthHeaders();
  delete headers["Content-Type"]; // the browser sets this itself for FormData, with the correct boundary

  const res = await fetch(`${API_BASE_URL}/Upload/player-image`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || body?.title || "Image upload failed.");
  }

  const data = await res.json();
  return data.url; // e.g. "/uploads/players/abc123.jpg"
}