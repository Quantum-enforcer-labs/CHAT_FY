import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDataBase } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import fs from "fs";

// routes import
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

// Static file serving for production
if (ENV.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(distPath));

  app.get("*", (_, res) => {
    const indexPath = path.join(distPath, "index.html");

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

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDataBase();
});
