import express from "express";
import dotenv from "dotenv";
import path from "path";

// routes import
import authRouter from "./routes/auth.route.js";

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());

const __dirname = path.resolve();

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
