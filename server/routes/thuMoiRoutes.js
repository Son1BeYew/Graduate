// routes/thuMoiRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const thuMoiCtrl = require("../controllers/thuMoiController");

// Tạo mới
router.post(
  "/",
  upload.single("image"),
  thuMoiCtrl.createThuMoi
);



module.exports = router;
