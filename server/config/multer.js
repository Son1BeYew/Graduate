// server/config/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // đường dẫn tới config/cloudinary.js

// Cấu hình storage để upload lên folder "sinhvien" trên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sinhvien",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
