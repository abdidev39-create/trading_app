import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendOTP(to, otp) {
  await transporter.sendMail({
     from: `"App" <${process.env.SMTP_USER}>`,
     to,
     subject: 'Your Verification Code',
     html: html
  });
}
