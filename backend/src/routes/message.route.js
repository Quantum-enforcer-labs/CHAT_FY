import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetMiddleware } from "../middleware/arcjet.middleware.js";

import {
  getContacts,
  getChats,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();
messageRouter.use(arcjetMiddleware, protectRoute);

messageRouter.get("/contacts", getContacts);
messageRouter.get("/chats", getChats);
messageRouter.get("/:id", getMessagesByUserId);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
