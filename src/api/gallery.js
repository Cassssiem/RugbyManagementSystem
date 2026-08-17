import { apiClient } from "./client";
import { API_BASE_URL, getAuthHeaders } from "./config";

export const galleryApi = {
  getAll: () => apiClient.get("/GalleryPhoto"),
  addPhoto: (imageUrl, caption) => apiClient.post("/GalleryPhoto", { imageUrl, caption }),
  delete: (id) => apiClient.delete(`/GalleryPhoto/${id}`),
};

export async function uploadGalleryPhoto(file) {
  const formData = new FormData();
  formData.append("file", file);

  const headers = getAuthHeaders();
  delete headers["Content-Type"];

  const res = await fetch(`${API_BASE_URL}/Upload/gallery-photo`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || body?.title || "Photo upload failed.");
  }

  const data = await res.json();
  return data.url;
}