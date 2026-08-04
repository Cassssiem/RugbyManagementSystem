import { apiClient } from "./client";

export const playersApi = {
  getAll: () => apiClient.get("/Player"),
  getById: (id) => apiClient.get(`/Player/${id}`),
  create: (payload) => apiClient.post("/Player", payload),
  update: (id, payload) => apiClient.put(`/Player/${id}`, payload),
  delete: (id) => apiClient.delete(`/Player/${id}`),
};