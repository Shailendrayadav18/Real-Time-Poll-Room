require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const pollRoutes = require("./routes/poll");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  socket.on("join_poll", (pollId) => {
    socket.join(pollId);
  });
});

app.set("io", io);

const { sequelize } = require("./models");
sequelize.sync();

app.use("/api/polls", pollRoutes);

const PORT = process.env.PORT || 5000;

server.listen(5000, () => {
  console.log("Server running on port 5000");
});