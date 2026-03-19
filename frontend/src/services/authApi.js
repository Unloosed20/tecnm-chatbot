const API_BASE_URL = "http://localhost:3001/api";

export async function loginRequest({ controlNumber, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      controlNumber,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "No se pudo iniciar sesión");
  }

  return data;
}