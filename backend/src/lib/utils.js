import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId: userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: ENV.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  });
  return token;
};
