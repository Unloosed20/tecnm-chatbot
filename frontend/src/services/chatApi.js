const API_BASE_URL = "http://localhost:3001/api";

export async function fetchChats() {
  const response = await fetch(`${API_BASE_URL}/chats`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los chats");
  }

  return response.json();
}

export async function createChat(section) {
  const response = await fetch(`${API_BASE_URL}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ section }),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el chat");
  }

  return response.json();
}

export async function sendMessage(chatId, payload) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el mensaje");
  }

  return response.json();
}