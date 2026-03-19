const chatService = require("../services/chat.service");

function listChats(req, res) {
  const chats = chatService.getAllChats();
  res.json(chats);
}

function getChat(req, res) {
  const chat = chatService.getChatById(req.params.id);

  if (!chat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  res.json(chat);
}

function createChat(req, res) {
  const { section } = req.body;
  const chat = chatService.createChat(section);
  res.status(201).json(chat);
}

function createMessage(req, res) {
  try {
    const { section, message } = req.body;

    const result = chatService.sendMessage(req.params.id, section, message);

    if (!result) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  listChats,
  getChat,
  createChat,
  createMessage,
};