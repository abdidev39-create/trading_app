import nodemailer from 'nodemailer';

// In-memory store for OTPs (use a database like Redis in production)
const otpStore = new Map();

/**
 * Generate OTP
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} Generated OTP
 */
export function generateOTP(length = 6) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

/**
 * Create SMTP transporter
 * @returns {nodemailer.Transporter} Configured transporter
 */
function createTransporter() {
  const smtpConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password'
    }
  };
  
  return nodemailer.createTransport(smtpConfig);
}

/**
 * Send OTP Email
 * @param {string} email - Recipient email address
 * @param {string} purpose - Purpose of OTP (e.g., 'verification', 'password-reset')
 * @returns {Promise<object>} Result object with success status and OTP info
 */
export async function sendOTP(email, purpose = 'verification') {
  try {
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    
    // Store OTP with expiry
    otpStore.set(`${email}:${purpose}`, {
      otp,
      expiresAt,
      purpose,
      attempts: 0,
      maxAttempts: 5,
      createdAt: Date.now()
    });
    
    // Create transporter
    const transporter = createTransporter();
    
    // Determine email subject and template based on purpose
    let subject, html;
    switch (purpose) {
      case 'password-reset':
        subject = 'Password Reset OTP';
        html = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .otp-code { 
                font-size: 32px; 
                font-weight: bold; 
                color: #4CAF50; 
                text-align: center; 
                margin: 20px 0;
                letter-spacing: 10px;
              }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>You requested to reset your password. Use the OTP code below:</p>
                <div class="otp-code">${otp}</div>
                <p>This OTP is valid for <strong>10 minutes</strong>.</p>
                <p>If you didn't request this password reset, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>This is an automated message, please do not reply.</p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;
      case 'verification':
      default:
        subject = 'Email Verification OTP';
        html = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .otp-code { 
                font-size: 32px; 
                font-weight: bold; 
                color: #2196F3; 
                text-align: center; 
                margin: 20px 0;
                letter-spacing: 10px;
              }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Email Verification</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>Thank you for registering! Please verify your email address using the OTP code below:</p>
                <div class="otp-code">${otp}</div>
                <p>This OTP is valid for <strong>10 minutes</strong>.</p>
                <p>If you didn't create an account, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>This is an automated message, please do not reply.</p>
              </div>
            </div>
          </body>
          </html>
        `;
    }
    
    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || `"App Name" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: html,
      text: `Your OTP is: ${otp}. This OTP is valid for 10 minutes.`
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId,
      email: email,
      purpose: purpose,
      expiresIn: '10 minutes',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
}

/**
 * Verify OTP
 * @param {string} email - User's email
 * @param {string} otp - OTP to verify
 * @param {string} purpose - Purpose of OTP verification
 * @returns {object} Verification result
 */
export function verifyOTP(email, otp, purpose = 'verification') {
  const key = `${email}:${purpose}`;
  const storedOTP = otpStore.get(key);
  
  if (!storedOTP) {
    return {
      valid: false,
      message: 'OTP not found or expired',
      code: 'OTP_NOT_FOUND'
    };
  }
  
  // Check if OTP is expired
  if (Date.now() > storedOTP.expiresAt) {
    otpStore.delete(key);
    return {
      valid: false,
      message: 'OTP has expired',
      code: 'OTP_EXPIRED'
    };
  }
  
  // Check attempts
  if (storedOTP.attempts >= storedOTP.maxAttempts) {
    otpStore.delete(key);
    return {
      valid: false,
      message: 'Too many attempts. OTP has been invalidated',
      code: 'MAX_ATTEMPTS_REACHED'
    };
  }
  
  // Verify OTP
  if (storedOTP.otp === otp) {
    // Valid OTP - remove from store
    otpStore.delete(key);
    return {
      valid: true,
      message: 'OTP verified successfully',
      code: 'OTP_VERIFIED'
    };
  } else {
    // Increment attempt count
    storedOTP.attempts++;
    otpStore.set(key, storedOTP);
    
    return {
      valid: false,
      message: 'Invalid OTP',
      code: 'INVALID_OTP',
      attemptsLeft: storedOTP.maxAttempts - storedOTP.attempts
    };
  }
}

/**
 * Resend OTP
 * @param {string} email - User's email
 * @param {string} purpose - Purpose of OTP
 * @returns {Promise<object>} Result of resend operation
 */
export async function resendOTP(email, purpose = 'verification') {
  try {
    // Remove existing OTP if exists
    const key = `${email}:${purpose}`;
    otpStore.delete(key);
    
    // Send new OTP
    return await sendOTP(email, purpose);
    
  } catch (error) {
    console.error('Error resending OTP:', error);
    throw new Error(`Failed to resend OTP: ${error.message}`);
  }
}

/**
 * Reset/Invalidate OTP
 * @param {string} email - User's email
 * @param {string} purpose - Purpose of OTP
 * @returns {object} Success status with message
 */
export function resetOTP(email, purpose = 'verification') {
  const key = `${email}:${purpose}`;
  const deleted = otpStore.delete(key);
  
  return {
    success: deleted,
    message: deleted ? 'OTP has been reset successfully' : 'No OTP found to reset'
  };
}

/**
 * Get OTP info (for debugging or admin purposes)
 * @param {string} email - User's email
 * @param {string} purpose - Purpose of OTP
 * @returns {object} OTP information
 */
export function getOTPInfo(email, purpose = 'verification') {
  const key = `${email}:${purpose}`;
  const storedOTP = otpStore.get(key);
  
  if (!storedOTP) {
    return null;
  }
  
  return {
    email,
    purpose,
    attempts: storedOTP.attempts,
    maxAttempts: storedOTP.maxAttempts,
    createdAt: new Date(storedOTP.createdAt).toISOString(),
    expiresAt: new Date(storedOTP.expiresAt).toISOString(),
    timeRemaining: Math.max(0, Math.floor((storedOTP.expiresAt - Date.now()) / 1000 / 60)) + ' minutes'
  };
}

/**
 * Cleanup expired OTPs
 */
export function cleanupExpiredOTPs() {
  const now = Date.now();
  let cleanedCount = 0;
  
  for (const [key, value] of otpStore.entries()) {
    if (now > value.expiresAt) {
      otpStore.delete(key);
      cleanedCount++;
    }
  }
  
  return cleanedCount;
}

// Schedule cleanup every hour (optional)
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    const cleaned = cleanupExpiredOTPs();
    if (cleaned > 0) {
      console.log(`Cleaned up ${cleaned} expired OTPs`);
    }
  }, 60 * 60 * 1000); // Every hour
}