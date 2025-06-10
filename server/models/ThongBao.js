
const mongoose = require("mongoose");

const ThongBaoSchema = new mongoose.Schema({
  tieuDe: { type: String, required: true },
  moTaNgan: { type: String },
  noiDung: { type: String }, // HTML
  ngayDang: { type: Date, default: Date.now },
  fileDinhKem: { type: String },
  hinhAnh: { type: String },
  hienThi: { type: Boolean, default: true },
});

module.exports = mongoose.model("ThongBao", ThongBaoSchema);
