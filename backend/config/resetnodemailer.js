import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // Change to true if using port 465
    auth: {
        user: process.env.EMAIL_USER, // Must be loaded
        pass: process.env.EMAIL_PASS  // Must be loaded
    }
});
export const RestEmail = async (myotp, name, email) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.E_SENDER,
            to: email,
            subject: "🔐 otp reset password",
            html: `
<div style="
    background:#0f172a;
    width:90%;
    max-width:420px;
    margin:auto;
    padding:30px;
    border-radius:12px;
    font-family:Arial, sans-serif;
    color:#e2e8f0;
    box-shadow:0 6px 20px rgba(0,0,0,0.3);
">

    <!-- Logo / Brand -->
    <h2 style="
        text-align:center;
        color:#2563eb;
        margin-bottom:10px;
        letter-spacing:1px;
    ">
        ZayTrade
    </h2>

    <p style="text-align:center; font-size:13px; color:#94a3b8;">
        Secure Trading Platform
    </p>

    <hr style="border:none;height:1px;background:#1e293b;margin:20px 0;" />

    <!-- Greeting -->
    <p style="font-size:14px;">
        Hello <strong>${name}</strong>,
    </p>

    <p style="font-size:14px; color:#cbd5f5;">
        We received a request to reset your password. Use the OTP below to continue:
    </p>

    <!-- OTP Box -->
    <div style="
        background:#1e293b;
        border:1px solid #2563eb;
        text-align:center;
        padding:16px;
        margin:20px 0;
        border-radius:8px;
        font-size:22px;
        font-weight:bold;
        color:#2563eb;
        letter-spacing:4px;
    ">
        ${myotp}
    </div>

    <p style="font-size:13px; color:#94a3b8;">
        This code expires in <strong>10 minutes</strong>. Never share it with anyone.
    </p>

    <!-- Security Notice -->
    <div style="
        background:#020617;
        padding:12px;
        border-radius:6px;
        margin-top:15px;
        font-size:12px;
        color:#94a3b8;
    ">
        If you did not request this reset, please ignore this email or contact support immediately.
    </div>

    <!-- Footer -->
    <p style="text-align:center; font-size:11px; color:#64748b; margin-top:20px;">
        © ${new Date().getFullYear()} ZayTrade. All rights reserved.
    </p>

</div>
`

        });
        // console.log("OTP is send✅");


    } catch (error) {
        console.error("❌ Error:", error.stack);
    }
};
export default transporter;


