const pool = require("../config/db");

async function findByControlNumber(controlNumber) {
  const [rows] = await pool.query(
    `
    SELECT id, control_number, full_name, email, password_hash, role, created_at
    FROM users
    WHERE control_number = ?
    LIMIT 1
    `,
    [controlNumber]
  );

  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.query(
    `
    SELECT id, control_number, full_name, email, role, created_at
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  findByControlNumber,
  findById,
};