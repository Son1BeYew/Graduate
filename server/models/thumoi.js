// models/ThuMoi.js
const mongoose = require("mongoose");

const ThuMoiSchema = new mongoose.Schema({
  // Tham chiếu đến Account
  account: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account",
    required: true 
  },
  // URL ảnh trả về từ Cloudinary
  imageUrl: { 
    type: String, 
    required: true 
  },
  // Nếu cần lưu public_id để xoá hoặc xử lý sau
  cloudinary_id: {
    type: String,
  },
  // Ngày tạo thư mời
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("ThuMoi", ThuMoiSchema);
