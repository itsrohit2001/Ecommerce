const express = require("express");
const { sendMail } = require("../utils/sendMail");
const router = express.Router();

const OTP_DATA = {};
const OTP_EXPIRY = 10 * 60 * 1000;
const OTP_RETRY_LIMIT = 5;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/request-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Email Address is invalid" });
  }

  const otp = generateOTP();
  const user_otp_data = {
    otp: otp,
    createdAt: Date.now(),
  };

  OTP_DATA[email] = user_otp_data;
  console.log(OTP_DATA);

  const htmlContent = `<!-- You can use this as the htmlContent for your sendMail function -->
<div style="max-width:480px;margin:0 auto;background:#f7f7fa;border-radius:12px;padding:32px 24px 24px 24px;font-family:'Segoe UI',Arial,sans-serif;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
  <div style="text-align:center;">
    <div style="font-size:32px;font-weight:700;color:#2563eb;letter-spacing:1px;margin-bottom:8px;">E-Commerce</div>
    <div style="font-size:18px;color:#333;margin-bottom:24px;">Your One-Time Password (OTP)</div>
    <div style="background:#fff;border-radius:8px;padding:24px 0;margin-bottom:24px;box-shadow:0 2px 8px rgba(37,99,235,0.07);">
      <span style="font-size:40px;letter-spacing:12px;font-weight:700;color:#2563eb;">${otp}</span>
    </div>
    <div style="font-size:16px;color:#444;margin-bottom:16px;">
      Please use the above OTP to verify your email address. <br>
      This OTP is valid for <b>10 minutes</b>.
    </div>
    <div style="font-size:14px;color:#888;margin-bottom:8px;">
      If you did not request this, you can safely ignore this email.
    </div>
    <div style="margin-top:32px;font-size:13px;color:#aaa;">
      &mdash; The E-Commerce Team
    </div>
  </div>
</div>`;

  const response = await sendMail(email, "OTP Request", htmlContent);
  if (response.success) {
    return res.json({ message: "OTP sent successfully" });
  }
  return res
    .status(500)
    .json({ message: "Failed to send OTP", error: response.error });
});

module.exports = router;
