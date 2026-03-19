const express = require("express");
const controller = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", controller.listChats);
router.get("/:id", controller.getChat);
router.post("/", controller.createChat);
router.post("/:id/messages", controller.createMessage);

module.exports = router;