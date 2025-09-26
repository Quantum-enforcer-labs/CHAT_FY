import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDataBase } from "./lib/db.js";
import { ENV } from "./lib/env.js";

// routes import
import authRouter from "./routes/auth.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

app.use("/api/v1/auth", authRouter);

const PORT = ENV.PORT || 5000;

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDataBase();
});
