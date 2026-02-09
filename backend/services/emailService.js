import axios from "axios";

// ==============================
// VERIFY EMAIL TEMPLATE - SIMPLE & CLEAN
// ==============================

const verifyTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width">
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
        <tr>
            <td align="center" style="padding:0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;">
                    <!-- Header -->
                    <tr>
                        <td style="padding:30px 20px 20px;text-align:center;">
                            <div style="color:#0066cc;font-size:24px;font-weight:bold;">ZayTrade</div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding:0 20px;">
                            <p style="margin:0 0 16px;font-size:16px;color:#333;">
                                Hello <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin:0 0 24px;font-size:15px;color:#555;">
                                Your verification code:
                            </p>
                            
                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                                <tr>
                                    <td align="center" style="background:#f8f8f8;border:2px solid #0066cc;border-radius:6px;padding:20px;">
                                        <div style="font-size:24px;font-weight:bold;color:#0066cc;letter-spacing:6px;font-family:monospace;">
                                            ${otp}
                                        </div>
                                        <div style="font-size:13px;color:#666;margin-top:8px;">
                                            Expires in 10 minutes
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin:0 0 20px;font-size:14px;color:#666;">
                                Enter this code to verify your account.
                            </p>
                            
                            <!-- Note -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                                <tr>
                                    <td style="background:#f8f8f8;border-left:3px solid #ccc;padding:12px;">
                                        <p style="margin:0;font-size:12px;color:#777;">
                                            If you didn't create an account, ignore this email.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding:30px 20px;text-align:center;border-top:1px solid #eee;">
                            <div style="color:#888;font-size:12px;">
                                © ${new Date().getFullYear()} ZayTrade
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// ==============================
// RESET PASSWORD TEMPLATE - SIMPLE & CLEAN
// ==============================

const resetTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width">
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
        <tr>
            <td align="center" style="padding:0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;">
                    <!-- Header -->
                    <tr>
                        <td style="padding:30px 20px 20px;text-align:center;">
                            <div style="color:#333;font-size:24px;font-weight:bold;">ZayTrade</div>
                            <div style="color:#666;font-size:14px;margin-top:4px;">Password Reset</div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding:0 20px;">
                            <p style="margin:0 0 16px;font-size:16px;color:#333;">
                                Hello <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin:0 0 24px;font-size:15px;color:#555;">
                                Your password reset code:
                            </p>
                            
                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                                <tr>
                                    <td align="center" style="background:#f8f8f8;border:2px solid #333;border-radius:6px;padding:20px;">
                                        <div style="font-size:24px;font-weight:bold;color:#333;letter-spacing:6px;font-family:monospace;">
                                            ${otp}
                                        </div>
                                        <div style="font-size:13px;color:#666;margin-top:8px;">
                                            Expires in 10 minutes
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin:0 0 20px;font-size:14px;color:#666;">
                                Enter this code to reset your password.
                            </p>
                            
                            <!-- Note -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                                <tr>
                                    <td style="background:#f8f8f8;border-left:3px solid #666;padding:12px;">
                                        <p style="margin:0;font-size:12px;color:#777;">
                                            If you didn't request this, please secure your account.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding:30px 20px;text-align:center;border-top:1px solid #eee;">
                            <div style="color:#888;font-size:12px;">
                                © ${new Date().getFullYear()} ZayTrade Security
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// ==============================
// GENERIC SEND FUNCTION
// ==============================

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { 
          email: process.env.E_SENDER,
          name: "ZayTrade"
        },
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
    return { success: false };
  }
};

// ==============================
// EXPORT FUNCTIONS
// ==============================

export const sendVerifyOTP = (email, name, otp) => {
  return sendEmail({
    to: email,
    subject: "Verify Your ZayTrade Account",
    html: verifyTemplate(name, otp)
  });
};

export const sendResetOTP = (email, name, otp) => {
  return sendEmail({
    to: email,
    subject: "Reset Your ZayTrade Password",
    html: resetTemplate(name, otp)
  });
};