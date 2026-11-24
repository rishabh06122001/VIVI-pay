require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB=require("./config/db")

const userRoutes=require("./routes/userRoutes")

const app=express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});