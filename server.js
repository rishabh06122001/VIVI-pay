
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check (does not require MongoDB)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "ViviPay Backend is running"
  });
});

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

app.use("/api/users", userRoutes);

module.exports = app;
