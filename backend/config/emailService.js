import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

// ONE transporter only
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  pool: true, // reuse connection = faster
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});


// ==============================
// GENERIC SEND FUNCTION
// ==============================

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.E_SENDER || `"App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error("Email Error:", error);
    return {
      success: false,
      error: error.message
    };
  }
};


// ==============================
// OTP VERIFY EMAIL
// ==============================

export const sendOTP = async (to, otp) => {

  const html = `
    <h2>Your OTP Code</h2>
    <p>Your verification code is:</p>
    <h1>${otp}</h1>
  `;

  return await sendEmail({
    to,
    subject: "Your Verification Code",
    html
  });
};


// ==============================
// RESET PASSWORD EMAIL
// ==============================

export const ResetEmail = async (myotp, name, email) => {

  const html = `
    <h2>ZayTrade Password Reset</h2>
    <p>Hello ${name}</p>
    <p>Your OTP:</p>
    <h1>${myotp}</h1>
  `;

  return await sendEmail({
    to: email,
    subject: "🔐 OTP Reset Password",
    html
  });
};


export default transporter;
