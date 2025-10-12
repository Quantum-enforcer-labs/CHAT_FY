import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // Try from cookie first
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      ?.find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.log("❌ No token provided in socket handshake");
      return next(new Error("Authentication error"));
    }

    // Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded?.userId) {
      return next(new Error("Invalid token"));
    }

    // Fetch user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new Error("User not found"));
    }

    // Attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    console.error("Socket auth error:", error.message);
    next(new Error("Authentication failed"));
  }
};
