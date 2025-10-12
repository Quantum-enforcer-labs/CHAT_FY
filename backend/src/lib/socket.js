import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "../lib/env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL, // e.g. "http://localhost:5173"
    credentials: true,
  },
});

// ✅ Authenticate every socket connection
io.use(socketAuthMiddleware);

// Map of userId → socket.id
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.userId;

  if (!userId) {
    console.warn("❌ Socket connected without valid userId");
    socket.disconnect(true);
    return;
  }

  console.log(`✅ User connected: ${userId}`);
  userSocketMap[userId] = socket.id;

  // Send online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${userId}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
