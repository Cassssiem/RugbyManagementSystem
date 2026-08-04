import { login } from "./auth";
import { apiClient } from "./client";

export const usersApi = {
  getAll: () => apiClient.get("/User"),
  getById: (id) => apiClient.get(`/User/${id}`),

  // Public sign-up — no auth required, role is forced to "User" by the backend
  register: (username, password) => apiClient.post("/User", { username, password }),

  update: (id, payload) => apiClient.put(`/User/${id}`, payload),
  delete: (id) => apiClient.delete(`/User/${id}`),
  
};