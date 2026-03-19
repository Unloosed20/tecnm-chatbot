const authService = require("../services/auth.service");

async function login(req, res) {
  try {
    const { controlNumber, password } = req.body;

    const result = await authService.login(controlNumber, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({
      error: error.message || "No se pudo iniciar sesión",
    });
  }
}

module.exports = {
  login,
};