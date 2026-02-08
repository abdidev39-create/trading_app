import nodemailer from 'nodemailer';

/**
 * Simple function to send OTP email
 * @param {string} to - Recipient email
 * @param {string} otp - Your generated OTP code
 * @returns {Promise} Email sending result
 */
export async function sendOTP(to, otp) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Simple HTML email with blue color
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3B82F6; color: white; padding: 20px; text-align: center;">
          <h2>Your OTP Code</h2>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <p style="font-size: 16px;">Your verification code is:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="
              font-size: 36px;
              font-weight: bold;
              color: #3B82F6;
              letter-spacing: 8px;
              background: white;
              padding: 15px 25px;
              border-radius: 8px;
              border: 2px dashed #3B82F6;
              display: inline-block;
            ">
              ${otp}
            </span>
          </div>
          <p style="color: #666; font-size: 14px;">
            This code is valid for 10 minutes.<br>
            Do not share this code with anyone.
          </p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated message. Please do not reply.</p>
        </div>
      </div>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"App" <${process.env.SMTP_USER}>`,
      to: to,
      subject: 'Your Verification Code',
      html: html,
      text: `Your OTP is: ${otp}. Valid for 10 minutes.`
    });

    return {
      success: true,
      messageId: info.messageId,
      message: 'OTP sent successfully'
    };

  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}