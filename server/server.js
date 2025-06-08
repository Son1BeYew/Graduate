const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

connectDB();

// Middleware cho JSON
app.use(express.json());

// Serve static files từ thư mục 'client'
app.use(express.static(path.join(__dirname, "../client")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dangnhap.html"));
});

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`)
);
