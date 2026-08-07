import { apiClient } from "./client";

export const sponsorsApi = {
  submit: (payload) => apiClient.post("/SponsorInquiry", payload),
  getAll: () => apiClient.get("/SponsorInquiry"),
  markReviewed: (id) => apiClient.put(`/SponsorInquiry/${id}/reviewed`, {}),
  delete: (id) => apiClient.delete(`/SponsorInquiry/${id}`),
};