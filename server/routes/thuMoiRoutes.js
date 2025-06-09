const express = require("express");
const router = express.Router();
const { uploadThuMoi } = require("../controllers/thuMoiController");
const { verifyToken } = require("../middleware/authMiddleware"); // middleware xác thực

router.post("/upload", verifyToken, uploadThuMoi);

module.exports = router;
