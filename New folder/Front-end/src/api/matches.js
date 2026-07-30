import { apiClient } from "./client";

export const matchesApi = {
  getAll: () => apiClient.get("/api/Match"),
  getById: (id) => apiClient.get(`/api/Match/${id}`),
  create: (payload) => apiClient.post("/api/Match", payload),
  update: (id, payload) => apiClient.put(`/api/Match/${id}`, payload),
  delete: (id) => apiClient.delete(`/api/Match/${id}`),
};