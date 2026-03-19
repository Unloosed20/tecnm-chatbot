require("dotenv").config();

const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chats", chatRoutes);

module.exports = app;