const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const profileService = require("../services/profile.service");

router.post("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, email, company, city } = req.body;

    await createProfile(req.user.userId, {
      name,
      email,
      company,
      city,
    });

    res.json({
      success: true,
      message: "Profile created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await getProfile(req.user.userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
