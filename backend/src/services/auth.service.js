const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

function buildTokenPayload(user) {
  return {
    sub: user.id,
    controlNumber: user.control_number,
    role: user.role,
  };
}

function signToken(user) {
  return jwt.sign(
    buildTokenPayload(user),
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

async function login(controlNumber, password) {
  const normalizedControlNumber = String(controlNumber || "").trim();
  const normalizedPassword = String(password || "");

  if (!normalizedControlNumber || !normalizedPassword) {
    throw new Error("Número de control y contraseña son requeridos");
  }

  const user = await userRepository.findByControlNumber(normalizedControlNumber);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isValidPassword = await bcrypt.compare(
    normalizedPassword,
    user.password_hash
  );

  if (!isValidPassword) {
    throw new Error("Credenciales inválidas");
  }

  const token = signToken(user);

  return {
    token,
    user: {
      id: user.id,
      controlNumber: user.control_number,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
    },
  };
}

module.exports = {
  login,
};