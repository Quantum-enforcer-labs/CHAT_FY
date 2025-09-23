import express from "express";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.send("Login Route");
});

export default authRouter;
