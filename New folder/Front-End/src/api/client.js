import { API_BASE_URL, getAuthHeaders } from "./config";

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || body?.title || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null; // No Content (DELETE responses)
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const apiClient = {
  get: (path) =>
    fetch(`${API_BASE_URL}${path}`, { headers: getAuthHeaders() }).then(handleResponse),

  post: (path, body) =>
    fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),

  put: (path, body) =>
    fetch(`${API_BASE_URL}${path}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),

  delete: (path) =>
    fetch(`${API_BASE_URL}${path}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    }).then(handleResponse),
};