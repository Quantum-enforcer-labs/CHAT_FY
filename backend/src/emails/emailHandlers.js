import { chatFySignupEmail } from "./emailsTemplate.js";
import { transporter } from "../lib/nodemailer.js";
import { ENV } from "../lib/env.js";

export const welcomeEmail = async (email, name, clientUrl) => {
  const mailOptions = {
    from: ENV.EMAIL_USER,
    to: email,
    subject: "Welcome to ChatFy! 🎉",
    html: chatFySignupEmail(name, clientUrl),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
