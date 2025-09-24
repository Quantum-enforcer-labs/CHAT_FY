import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
