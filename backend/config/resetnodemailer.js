import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    pool: true, // reuse connection (faster)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const ResetEmail = async (myotp, name, email) => {
    try {

        const info = await transporter.sendMail({
            from: process.env.E_SENDER,
            to: email,
            subject: "🔐 OTP Reset Password",
            html: `YOUR HTML HERE`
        });

        // return useful data
        return {
            success: true,
            messageId: info.messageId,
            response: info.response
        };

    } catch (error) {
        console.error("❌ Email Error:", error.stack);

        return {
            success: false,
            error: error.message
        };
    }
};

export default transporter;
