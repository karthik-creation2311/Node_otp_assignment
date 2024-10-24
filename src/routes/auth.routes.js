const express = require("express");
const router = express.Router();
const authService = require("../services/auth.service");

router.post("/send-otp", async (req, res) => {
  try {
    const { country_code, mobile_number } = req.body;

    if (!mobile_number || !country_code) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and country code are required",
      });
    }

    await sendOTP(country_code, mobile_number);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { mobile_number, otp } = req.body;

    const tokens = await verifyOTP(mobile_number, otp);

    if (!tokens) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    res.json({
      success: true,
      message: "OTP verified successfully",
      ...tokens,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    const tokens = await refreshToken(refresh_token);

    if (!tokens) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    res.json({
      success: true,
      message: "Token refreshed successfully",
      access_token: tokens.accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
