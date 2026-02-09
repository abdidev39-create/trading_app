import axios from "axios";

// ==============================
// VERIFY EMAIL TEMPLATE
// ==============================

const verifyTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 10px !important;
            }
            .content-box {
                padding: 20px 16px !important;
            }
            .otp-box {
                padding: 16px !important;
                font-size: 20px !important;
                letter-spacing: 4px !important;
            }
            .header {
                padding: 20px 16px !important;
            }
        }
        @media only screen and (min-width: 601px) {
            .container {
                width: 500px !important;
            }
        }
    </style>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5;">
        <tr>
            <td align="center" style="padding:40px 20px;">
                <!-- Main Container -->
                <table class="container" cellpadding="0" cellspacing="0" border="0" style="background:white;border-radius:8px;max-width:500px;width:100%;">
                    <!-- Header -->
                    <tr>
                        <td class="header" align="center" style="background:#0066cc;padding:30px 24px;">
                            <div style="color:white;font-size:26px;font-weight:bold;">ZayTrade</div>
                            <div style="color:rgba(255,255,255,0.9);font-size:14px;margin-top:4px;">Secure Trading Platform</div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content-box" style="padding:32px 28px;color:#333333;">
                            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;">
                                Hello <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#555555;">
                                Use this code to verify your account:
                            </p>
                            
                            <!-- OTP Box -->
                            <table class="otp-box" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fa;border:2px solid #0066cc;border-radius:6px;padding:24px;margin:24px 0;text-align:center;">
                                <tr>
                                    <td>
                                        <div style="font-size:24px;font-weight:bold;color:#0066cc;letter-spacing:6px;font-family:'Courier New',monospace;padding:8px 0;">
                                            ${otp}
                                        </div>
                                        <div style="font-size:13px;color:#666666;margin-top:12px;">
                                            This code expires in 10 minutes
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#666666;">
                                Enter this code on the verification page to complete your account setup.
                            </p>
                            
                            <!-- Note -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fa;border-radius:4px;border-left:3px solid #cccccc;padding:16px;margin:24px 0;">
                                <tr>
                                    <td>
                                        <p style="margin:0;font-size:13px;line-height:1.5;color:#777777;">
                                            If you didn't create an account with ZayTrade, please ignore this email.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8f9fa;padding:24px;text-align:center;border-top:1px solid #dddddd;">
                            <div style="color:#666666;font-size:12px;margin-bottom:8px;">
                                © ${new Date().getFullYear()} ZayTrade. All rights reserved.
                            </div>
                            <div style="color:#888888;font-size:11px;">
                                This is an automated message, please do not reply.
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
// RESET PASSWORD TEMPLATE
// ==============================

const resetTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 10px !important;
            }
            .content-box {
                padding: 20px 16px !important;
            }
            .otp-box {
                padding: 16px !important;
                font-size: 20px !important;
                letter-spacing: 4px !important;
            }
            .header {
                padding: 20px 16px !important;
            }
        }
        @media only screen and (min-width: 601px) {
            .container {
                width: 500px !important;
            }
        }
    </style>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5;">
        <tr>
            <td align="center" style="padding:40px 20px;">
                <!-- Main Container -->
                <table class="container" cellpadding="0" cellspacing="0" border="0" style="background:white;border-radius:8px;max-width:500px;width:100%;">
                    <!-- Header -->
                    <tr>
                        <td class="header" align="center" style="background:#333333;padding:30px 24px;">
                            <div style="color:white;font-size:26px;font-weight:bold;">ZayTrade</div>
                            <div style="color:rgba(255,255,255,0.9);font-size:14px;margin-top:4px;">Password Reset Request</div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content-box" style="padding:32px 28px;color:#333333;">
                            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;">
                                Hello <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#555555;">
                                Use this code to reset your password:
                            </p>
                            
                            <!-- OTP Box -->
                            <table class="otp-box" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fa;border:2px solid #333333;border-radius:6px;padding:24px;margin:24px 0;text-align:center;">
                                <tr>
                                    <td>
                                        <div style="font-size:24px;font-weight:bold;color:#333333;letter-spacing:6px;font-family:'Courier New',monospace;padding:8px 0;">
                                            ${otp}
                                        </div>
                                        <div style="font-size:13px;color:#666666;margin-top:12px;">
                                            This code expires in 10 minutes
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#666666;">
                                Enter this code on the password reset page to create a new secure password.
                            </p>
                            
                            <!-- Security Note -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fa;border-radius:4px;border-left:3px solid #666666;padding:16px;margin:24px 0;">
                                <tr>
                                    <td>
                                        <p style="margin:0;font-size:13px;line-height:1.5;color:#777777;">
                                            If you didn't request this password reset, please secure your account immediately.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8f9fa;padding:24px;text-align:center;border-top:1px solid #dddddd;">
                            <div style="color:#666666;font-size:12px;margin-bottom:8px;">
                                © ${new Date().getFullYear()} ZayTrade Security Team
                            </div>
                            <div style="color:#888888;font-size:11px;">
                                For security reasons, this code will expire in 10 minutes.
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