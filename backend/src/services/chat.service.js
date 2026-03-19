const { chats } = require("../data/chat.store");

function buildChatTitle(text) {
  const cleaned = String(text || "").trim();
  if (!cleaned) return "Nuevo chat";
  return cleaned.length > 28 ? `${cleaned.slice(0, 28)}...` : cleaned;
}

function getAssistantResponse(section, message) {
  const lowerMessage = String(message).toLowerCase();

  const sectionReplies = {
    Inicio:
      "Puedo orientarte sobre trámites escolares, becas, titulación, servicio social, residencias, inglés y créditos complementarios.",
    "Trámites escolares":
      "En trámites escolares puedo ayudarte con constancias, certificados, historial académico y otros procesos administrativos.",
    Becas:
      "En becas puedo orientarte sobre convocatorias, requisitos y tipos de apoyo.",
    Titulación:
      "En titulación puedo ayudarte con modalidades, requisitos, EGEL, tesis y proceso general.",
    "Servicio social":
      "En servicio social puedo ayudarte con registro, requisitos, duración y liberación.",
    "Residencias profesionales":
      "En residencias profesionales puedo orientarte sobre registro, empresas, requisitos y reportes.",
    Inglés:
      "En la sección de inglés puedo ayudarte con cursos, niveles, certificaciones y horarios.",
    "Créditos Complementarios":
      "En créditos complementarios puedo orientarte sobre actividades, requisitos y validación.",
  };

  if (section === "Trámites escolares" && lowerMessage.includes("constancia")) {
    return "La constancia de estudios generalmente se solicita en servicios escolares. Normalmente te pedirán identificación, datos del alumno y, en algunos casos, comprobante de pago.";
  }

  if (section === "Becas" && lowerMessage.includes("requisito")) {
    return "Los requisitos de una beca pueden variar, pero suelen incluir promedio mínimo, documentación personal, solicitud y cumplimiento de la convocatoria vigente.";
  }

  return sectionReplies[section] || "Puedo ayudarte con información general del campus. Cuéntame tu duda con más detalle.";
}

function getAllChats() {
  return chats;
}

function getChatById(id) {
  return chats.find((chat) => chat.id === Number(id)) || null;
}

function createChat(section = "Inicio") {
  const newChat = {
    id: Date.now(),
    title: "Nuevo chat",
    section,
    messages: [],
  };

  chats.unshift(newChat);
  return newChat;
}

function sendMessage(chatId, section, messageText) {
  const chat = chats.find((item) => item.id === Number(chatId));

  if (!chat) {
    return null;
  }

  const trimmedMessage = String(messageText || "").trim();

  if (!trimmedMessage) {
    throw new Error("Message is required");
  }

  const userMessage = {
    id: Date.now(),
    role: "user",
    text: trimmedMessage,
  };

  const assistantMessage = {
    id: Date.now() + 1,
    role: "assistant",
    text: getAssistantResponse(section || chat.section, trimmedMessage),
  };

  if (chat.title === "Nuevo chat" || chat.title === "Bienvenida") {
    chat.title = buildChatTitle(trimmedMessage);
  }

  chat.section = section || chat.section;
  chat.messages.push(userMessage, assistantMessage);

  return {
    chat,
    userMessage,
    assistantMessage,
  };
}

module.exports = {
  getAllChats,
  getChatById,
  createChat,
  sendMessage,
};