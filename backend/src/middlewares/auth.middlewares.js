const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    req.user = {
      id: user.id,
      controlNumber: user.control_number,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "No autorizado" });
  }
}

module.exports = authMiddleware;