import express from "express";
import { userLogin, userSignUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/sign-up", userSignUp);
authRouter.post("/login", userLogin);

export default authRouter;
