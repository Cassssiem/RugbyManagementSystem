import { apiClient } from "./client";

export const matchPlayersApi = {
  getByMatch: (matchId) => apiClient.get(`/matches/${matchId}/players`),

  getByPlayer: (playerId) => apiClient.get(`/players/${playerId}/matches`),

  getOne: (playerId, matchId) => apiClient.get(`/players/${playerId}/matches/${matchId}`),

  getByTeam: (team) => apiClient.get(`/teams/${team}/players`),

 addToMatch: (matchId, playerId, payload) =>
    apiClient.post(`/matches/${matchId}/players/${playerId}`, payload),
 
  updateStats: (matchId, playerId, payload) =>
    apiClient.put(`/matches/${matchId}/players/${playerId}`, { ...payload, matchId, playerId }),

  removeFromMatch: (matchId, playerId) =>
    apiClient.delete(`/matches/${matchId}/players/${playerId}`),
};