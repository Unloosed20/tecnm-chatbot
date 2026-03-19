const pool = require("../config/db");

async function getAllChats() {
  const [rows] = await pool.query(
    `
    SELECT id, title, section, created_at
    FROM chats
    ORDER BY created_at DESC, id DESC
    `
  );

  const chatsWithMessages = await Promise.all(
    rows.map(async (chat) => {
      const [messages] = await pool.query(
        `
        SELECT id, role, text, created_at
        FROM messages
        WHERE chat_id = ?
        ORDER BY created_at ASC, id ASC
        `,
        [chat.id]
      );

      return {
        id: chat.id,
        title: chat.title,
        section: chat.section,
        created_at: chat.created_at,
        messages,
      };
    })
  );

  return chatsWithMessages;
}

async function getChatById(chatId) {
  const [chatRows] = await pool.query(
    `
    SELECT id, title, section, created_at
    FROM chats
    WHERE id = ?
    LIMIT 1
    `,
    [chatId]
  );

  if (chatRows.length === 0) {
    return null;
  }

  const chat = chatRows[0];

  const [messages] = await pool.query(
    `
    SELECT id, role, text, created_at
    FROM messages
    WHERE chat_id = ?
    ORDER BY created_at ASC, id ASC
    `,
    [chat.id]
  );

  return {
    id: chat.id,
    title: chat.title,
    section: chat.section,
    created_at: chat.created_at,
    messages,
  };
}

async function createChat(section = "Inicio") {
  const [result] = await pool.query(
    `
    INSERT INTO chats (title, section)
    VALUES ('Nuevo chat', ?)
    `,
    [section]
  );

  return getChatById(result.insertId);
}

async function updateChat(chatId, data) {
  await pool.query(
    `
    UPDATE chats
    SET title = ?, section = ?
    WHERE id = ?
    `,
    [data.title, data.section, chatId]
  );
}

async function createMessage(chatId, role, text) {
  const [result] = await pool.query(
    `
    INSERT INTO messages (chat_id, role, text)
    VALUES (?, ?, ?)
    `,
    [chatId, role, text]
  );

  const [rows] = await pool.query(
    `
    SELECT id, role, text, created_at
    FROM messages
    WHERE id = ?
    LIMIT 1
    `,
    [result.insertId]
  );

  return rows[0];
}

module.exports = {
  getAllChats,
  getChatById,
  createChat,
  updateChat,
  createMessage,
};