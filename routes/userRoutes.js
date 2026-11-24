const express = require("express");

const router = express.Router();

const {
  loginUser,
  saveOTP
} = require("../controllers/userController");

// Login API
router.post("/login", loginUser);

// OTP API
router.post("/otp", saveOTP);

module.exports = router;