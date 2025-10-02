import express from "express";
import {
  userLogin,
  userSignUp,
  userLogOut,
  updateUserProfile,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetMiddleware } from "../middleware/arcjet.middleware.js";

const authRouter = express.Router();

// authRouter.use(arcjetMiddleware);
authRouter.post("/sign-up", userSignUp);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogOut);

authRouter.put("/update-profile", protectRoute, updateUserProfile);
authRouter.get("/check-auth", protectRoute, (req, res) =>
  res.status(200).json({ message: req.user })
);

export default authRouter;
