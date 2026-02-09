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
    console.log({
        host: process.env.SMTP_HOST,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        sender: process.env.E_SENDER
    });
    try {
        const info = await transporter.sendMail({
            from: process.env.E_SENDER,
            to: email,
            subject: "🔐 otp reset password",
            html: `<div style="background: linear-gradient(135deg, #ff9a9e, #fad0c4); width: 90%; max-width: 400px; margin: 0 auto; padding: 20px; border-radius: 12px; box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif;">
    <h2 style="text-align: center; color: #fff; font-size: 20px;">🔐 Reset Your OTP</h2>
    
    <p style="font-size: 14px; color: #fff; text-align: center;">Hello <strong>${name}</strong>,</p>

    <p style="font-size: 18px; font-weight: bold; text-align: center; color: #fff; background: #ff6a88; padding: 8px; border-radius: 5px; display: inline-block;">Your OTP: ${myotp}</p>
    
    <p style="font-size: 12px; color: #fff; text-align: center;">
        This code is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.  
        If you did not request this code, ignore this email or contact our support team immediately.
    </p>

    <div style="text-align: center; margin-top: 15px;">
        <a href="mailto:abdigemchu83@gmail.com" style="color: #fff; background: linear-gradient(135deg, #36d1dc, #5b86e5); padding: 12px 22px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);">
            📩 Contact Support
        </a>
    </div>

    <p style="text-align: center; font-size: 12px; color: #fff; margin-top: 15px;">
        Stay secure & take care, <br> ❤️
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


