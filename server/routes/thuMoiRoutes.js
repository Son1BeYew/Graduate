const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { uploadThuMoi, getThuMoi } = require("../controllers/thuMoiController");

router.post("/upload", upload.single("image"), uploadThuMoi);
router.get("/", getThuMoi); // ← thêm dòng này

module.exports = router;
