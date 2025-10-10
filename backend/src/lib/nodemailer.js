import nodemailer from "nodemailer";
import { ENV } from "./env.js";

export const transporter = nodemailer.createTransport({
  service: ENV.EMAIL_SERVICE,
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  secure: false,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});
