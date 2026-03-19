const chatService = require("../services/chat.service");

async function listChats(req, res) {
  try {
    const chats = await chatService.getAllChats(req.user.id);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener chats" });
  }
}

async function getChat(req, res) {
  try {
    const chat = await chatService.getChatById(req.params.id, req.user.id);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el chat" });
  }
}

async function createChat(req, res) {
  try {
    const { section } = req.body;
    const chat = await chatService.createChat(req.user.id, section);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el chat" });
  }
}

async function createMessage(req, res) {
  try {
    const { section, message } = req.body;

    const result = await chatService.sendMessage(
      req.params.id,
      req.user.id,
      section,
      message
    );

    if (!result) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error al enviar mensaje" });
  }
}

module.exports = {
  listChats,
  getChat,
  createChat,
  createMessage,
};