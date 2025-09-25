import { resendClient, sender } from "../lib/resend.js";
import { chatFySignupEmail } from "./emailsTemplate.js";

export const welcomeEmail = async (email, name, clientUrl) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chat_Fy!",
    html: chatFySignupEmail(name, clientUrl),
  });
  if (error) {
    console.error("Error sending welcome email:", error);
  } else {
    console.log("Welcome email sent successfully:", data);
  }
};
