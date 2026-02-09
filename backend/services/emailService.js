import axios from "axios";


// ==============================
// VERIFY EMAIL TEMPLATE
// ==============================

const verifyTemplate = (name, otp) => `
<div style="background:#0f172a;padding:20px;font-family:Arial,sans-serif;">
  <div style="max-width:420px;margin:auto;background:#020617;border-radius:12px;padding:30px;color:#e2e8f0;">

    <h2 style="text-align:center;color:#2563eb;margin-bottom:5px;">
      ZayTrade
    </h2>

    <p style="text-align:center;font-size:13px;color:#94a3b8;">
      Secure Trading Platform
    </p>

    <hr style="border:none;height:1px;background:#1e293b;margin:20px 0;" />

    <p>Hello <strong>${name}</strong>,</p>

    <p>Please verify your account using this OTP:</p>

    <div style="
      background:#1e293b;
      border:1px solid #2563eb;
      text-align:center;
      padding:16px;
      margin:20px 0;
      border-radius:8px;
      font-size:26px;
      font-weight:bold;
      color:#2563eb;
      letter-spacing:6px;
    ">
      ${otp}
    </div>

    <p style="font-size:13px;color:#94a3b8;">
      This code expires in 10 minutes.
    </p>

    <p style="text-align:center;font-size:11px;color:#64748b;margin-top:20px;">
      © ${new Date().getFullYear()} ZayTrade
    </p>

  </div>
</div>
`;


// ==============================
// RESET PASSWORD TEMPLATE
// ==============================

const resetTemplate = (name, otp) => `
<div style="background:#0f172a;padding:20px;font-family:Arial,sans-serif;">
  <div style="max-width:420px;margin:auto;background:#020617;border-radius:12px;padding:30px;color:#e2e8f0;">

    <h2 style="text-align:center;color:#2563eb;">
      ZayTrade Password Reset
    </h2>

    <p>Hello <strong>${name}</strong>,</p>

    <p>You requested a password reset. Use this OTP:</p>

    <div style="
      background:#1e293b;
      border:1px solid #2563eb;
      text-align:center;
      padding:16px;
      margin:20px 0;
      border-radius:8px;
      font-size:26px;
      font-weight:bold;
      color:#2563eb;
      letter-spacing:6px;
    ">
      ${otp}
    </div>

    <div style="
      background:#020617;
      padding:12px;
      border-radius:6px;
      font-size:12px;
      color:#94a3b8;
    ">
      If you didn't request this, ignore this email.
    </div>

    <p style="text-align:center;font-size:11px;color:#64748b;margin-top:20px;">
      Secure Trading Notifications • ZayTrade
    </p>

  </div>
</div>
`;


// ==============================
// GENERIC SEND FUNCTION
// ==============================

const sendEmail = async ({ to, subject, html }) => {

  try {

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.E_SENDER },
        to: [{ email: to }],
        subject,
        htmlContent: html
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return { success: true, data: response.data };

  } catch (error) {

    console.error("Email error:", error.response?.data || error.message);

    return { success:false };
  }
};


// ==============================
// EXPORT FUNCTIONS
// ==============================

export const sendVerifyOTP = (email, name, otp) => {
  return sendEmail({
    to: email,
    subject: "Verify your ZayTrade account",
    html: verifyTemplate(name, otp)
  });
};

export const sendResetOTP = (email, name, otp) => {
  return sendEmail({
    to: email,
    subject: "🔐 ZayTrade Password Reset OTP",
    html: resetTemplate(name, otp)
  });
};
