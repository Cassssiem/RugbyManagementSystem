import { apiClient } from "./client";

export const matchPlayersApi = {
  getByMatch: (matchId) => apiClient.get(`/api/matches/${matchId}/api/players`),
  getByPlayer: (playerId) => apiClient.get(`/api/players/${playerId}/api/matches`),
  getOne: (playerId, matchId) => apiClient.get(`/api/players/${playerId}/api/matches/${matchId}`),
  getByTeam: (team) => apiClient.get(`/teams/${team}/api/players`),

  addToMatch: (matchId, playerId, payload) =>
    apiClient.post(`/api/matches/${matchId}/api/players/${playerId}`, payload),

  updateStats: (matchId, playerId, payload) =>
    apiClient.put(`/api/matches/${matchId}/api/players/${playerId}`, { ...payload, matchId, playerId }),

  removeFromMatch: (matchId, playerId) =>
    apiClient.delete(`/api/matches/${matchId}/api/players/${playerId}`),
};