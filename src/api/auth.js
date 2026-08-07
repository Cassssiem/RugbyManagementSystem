import { API_BASE_URL } from "./config";

export async function login(username, password) {
  const res = await fetch(`${API_BASE_URL}/User/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password.");
  }

  const data = await res.json();
  localStorage.setItem("authToken", data.token);
  return data.token;
}

export function logout() {
  localStorage.removeItem("authToken");
}

export function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}

// A JWT has 3 parts separated by dots: header.payload.signature
// The payload (middle part) is base64-encoded JSON containing the user's role —
// this reads it without needing an extra library.
export function getUserRole() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (
      payload.role ||
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      null
    );
  } catch {
    return null;
  }
}
export function getUsername() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (
      payload.name ||
      payload.unique_name ||
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      null
    );
  } catch {
    return null;
  }
}