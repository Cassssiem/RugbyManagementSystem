import { apiClient } from "./client";

export const playersApi = {
  getAll: () => apiClient.get("/api/Player"),
  getById: (id) => apiClient.get(`/api/Player/${id}`),
  create: (payload) => apiClient.post("/api/Player", payload),
  update: (id, payload) => apiClient.put(`/api/Player/${id}`, payload),
  delete: (id) => apiClient.delete(`/api/Player/${id}`),
};