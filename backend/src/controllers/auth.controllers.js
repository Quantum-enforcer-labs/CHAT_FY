import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { welcomeEmail } from "../emails/emailHandlers.js";
import { imagekit } from "../lib/imageKit.js";

import { ENV } from "../lib/env.js";

export const userSignUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User with this email already exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
      });

      try {
        await welcomeEmail(newUser.email, newUser.fullName, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Error sending welcome email:", error);
      }
    } else {
      res.status(400).json({
        message: "User registration failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const userLogOut = (_, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: ENV.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logout successful" });
};

export const updateUserProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic)
      return res.status(400).json({ message: "Profile picture is required" });

    const userId = req.user._id;

    const uploadResponse = await imagekit.upload({
      file: profilePic,
      fileName: `profile_pic_${userId}`,
      folder: "/profile_pictures/",
    });

    if (uploadResponse) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.url },
        { new: true }
      ).select("-password");
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      res.status(200).json({
        message: "Profile picture updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(500).json({ message: "Image upload failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
