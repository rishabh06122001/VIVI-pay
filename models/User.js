const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    otp: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);