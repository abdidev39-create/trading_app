import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" }); // ensure this exists locally
// On server, set env vars in dashboard or export manually

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,   // your Brevo SMTP user
    pass: process.env.SMTP_PASS    // your Brevo SMTP password
  }
});

// Simple test to check if transporter works
transporter.verify((err, success) => {
  if (err) console.error("Transporter error:", err);
  else console.log("Transporter ready ✅");
});

export const sendTestEmail = async (to) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.E_SENDER || process.env.SMTP_USER,
      to,
      subject: "Test Email Brevo SMTP",
      text: "This is a test email from Brevo SMTP minimal setup."
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
};

export default transporter;
