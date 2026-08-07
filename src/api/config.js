console.log("THIS IS THE REAL CONFIG FILE");

export const API_BASE_URL = "https://localhost:7056/api";

export function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}