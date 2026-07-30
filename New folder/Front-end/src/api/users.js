import { apiClient } from "./client";

export const usersApi = {
  getAll: () => apiClient.get("/api/User"),
  getById: (id) => apiClient.get(`/api/User/${id}`),

  // Public sign-up — no auth required, role is forced to "User" by the backend
  register: (username, password) => apiClient.post("/api/User", { username, password }),

  update: (id, payload) => apiClient.put(`/api/User/${id}`, payload),
  delete: (id) => apiClient.delete(`/api/User/${id}`),
};