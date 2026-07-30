import { apiClient } from "./client";

export const sponsorsApi = {
  // Public — no auth required
  submit: (payload) => apiClient.post("/api/SponsorInquiry", payload),
  getAll: () => apiClient.get("/api/SponsorInquiry"),
  markReviewed: (id) => apiClient.put(`/api/SponsorInquiry/${id}/reviewed`, {}),
  delete: (id) => apiClient.delete(`/api/SponsorInquiry/${id}`),
};