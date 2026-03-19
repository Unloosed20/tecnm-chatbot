const pool = require("../config/db");

async function getAllChatsByUser(userId) {
  const [rows] = await pool.query(
    `
    SELECT id, user_id, title, section, created_at
    FROM chats
    WHERE user_id = ?
    ORDER BY created_at DESC, id DESC
    `,
    [userId]
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
        userId: chat.user_id,
        title: chat.title,
        section: chat.section,
        created_at: chat.created_at,
        messages,
      };
    })
  );

  return chatsWithMessages;
}

async function getChatByIdForUser(chatId, userId) {
  const [chatRows] = await pool.query(
    `
    SELECT id, user_id, title, section, created_at
    FROM chats
    WHERE id = ? AND user_id = ?
    LIMIT 1
    `,
    [chatId, userId]
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
    userId: chat.user_id,
    title: chat.title,
    section: chat.section,
    created_at: chat.created_at,
    messages,
  };
}

async function createChat(userId, section = "Inicio") {
  const [result] = await pool.query(
    `
    INSERT INTO chats (user_id, title, section)
    VALUES (?, 'Nuevo chat', ?)
    `,
    [userId, section]
  );

  return getChatByIdForUser(result.insertId, userId);
}

async function updateChat(chatId, userId, data) {
  await pool.query(
    `
    UPDATE chats
    SET title = ?, section = ?
    WHERE id = ? AND user_id = ?
    `,
    [data.title, data.section, chatId, userId]
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
  getAllChatsByUser,
  getChatByIdForUser,
  createChat,
  updateChat,
  createMessage,
};