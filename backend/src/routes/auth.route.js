import express from "express";
import {
  userLogin,
  userSignUp,
  userLogOut,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/sign-up", userSignUp);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogOut);

export default authRouter;
