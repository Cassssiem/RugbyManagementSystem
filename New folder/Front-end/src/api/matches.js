import { apiClient } from "./client";

export const matchesApi = {
  getAll: () => apiClient.get("/Match"),
  getById: (id) => apiClient.get(`/Match/${id}`),
  create: (payload) => apiClient.post("/Match", payload),
  update: (id, payload) => apiClient.put(`/Match/${id}`, payload),
  delete: (id) => apiClient.delete(`/Match/${id}`),
};