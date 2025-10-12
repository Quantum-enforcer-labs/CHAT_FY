import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";
import { connectDataBase } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

// routes import
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../frontend/dist");
  const indexPath = path.join(distPath, "index.html");

  app.use(express.static(distPath));

  app.get("*", (_, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error(
        "❌ index.html not found. Did you run `npm run build` in frontend?"
      );
      res.status(500).send("Frontend build missing.");
    }
  });
}

const PORT = ENV.PORT || 5000;

// Connect to DB first, then start server
connectDataBase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err.message);
    process.exit(1);
  });
