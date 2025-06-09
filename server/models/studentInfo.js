const mongoose = require("mongoose");

const StudentInfoSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },
  fullname: { type: String, required: true }, // Họ tên
  studentCode: { type: String, required: true }, // Mã số sinh viên (username)
  email: { type: String, required: true }, // Email
  educationProgram: { type: String }, // Chương trình
  educationLevel: { type: String }, // Hệ đào tạo
  faculty: { type: String }, // Khoa
  className: { type: String }, // Lớp
  courseYear: { type: Number }, // Niên khóa (vd: 2022)
  avatar: { type: String }, // Đường dẫn ảnh đại diện
});

module.exports = mongoose.model("StudentInfo", StudentInfoSchema);
