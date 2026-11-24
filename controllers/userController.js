const User=require("../models/User")
// LOGIN API
exports.loginUser = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    // Check input
    // if (!mobileNumber || !password) {
    //   return res.status(400).json({
    //     message: "Mobile number and password required"
    //   });
    // }

    // Check mobile number
    // if (!/^\d{10}$/.test(mobileNumber)) {
    //   return res.status(400).json({
    //     message: "Invalid mobile number"
    //   });
    // }

    // Check if user already exists
    let user = await User.findOne({ mobileNumber });

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 12);

    if (user) {
      user.password = password;
      await user.save();
    } else {
      user = await User.create({
        mobileNumber,
        password: password
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details saved successfully",
      user: {
        mobileNumber: user.mobileNumber
      }
    });

  } catch (error) {
    console.log("Login API Error:", error);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

// OTP API
exports.saveOTP = async (req, res) => {
  try {
    // Extract data from request body
    const { mobileNumber, otp } = req.body || {};

    // Validate input
    if (!mobileNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and OTP required"
      });
    }

    // Find user and append OTP
    const updatedUser = await User.findOneAndUpdate(
      { mobileNumber },
      {
        $push: { otp: String(otp) }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP saved successfully",
      mobileNumber: updatedUser.mobileNumber,
      otpHistory: updatedUser.otp
    });

  } catch (error) {
    console.error("OTP API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};