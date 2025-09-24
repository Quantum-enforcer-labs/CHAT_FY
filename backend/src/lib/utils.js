import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("oken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  });
  return token;
};
