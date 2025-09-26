import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
  IMAGE_KIT_PUBLIC_API_KEY: process.env.IMAGE_KIT_PUBLIC_API_KEY,
  IMAGE_KIT_PRIVATE_API_KEY: process.env.IMAGE_KIT_PRIVATE_API_KEY,
  IMAGE_KIT_URL_ENDPOINT: process.env.IMAGE_KIT_URL_ENDPOINT,
};
