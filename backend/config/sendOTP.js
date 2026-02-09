import axios from "axios";

export const sendOTP = async (to, otp) => {

  try {

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.E_SENDER
        },
        to: [{ email: to }],
        subject: "Your OTP Code",
        htmlContent: `<h1>${otp}</h1>`
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
    console.error("API email error:", error.response?.data || error.message);
    return { success:false };
  }
};
