import { getToken, clearSession } from "../utils/authStorage";

const API_BASE_URL = "http://localhost:3001/api";

function buildAuthHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleApiResponse(response, defaultMessage) {
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      clearSession();
    }

    throw new Error(data.error || defaultMessage);
  }

  return data;
}

export async function fetchChats() {
  const response = await fetch(`${API_BASE_URL}/chats`, {
    headers: buildAuthHeaders(),
  });

  return handleApiResponse(response, "No se pudieron cargar los chats");
}

export async function createChat(section) {
  const response = await fetch(`${API_BASE_URL}/chats`, {
    method: "POST",
    headers: buildAuthHeaders(),
    body: JSON.stringify({ section }),
  });

  return handleApiResponse(response, "No se pudo crear el chat");
}

export async function sendMessage(chatId, payload) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: buildAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleApiResponse(response, "No se pudo enviar el mensaje");
}