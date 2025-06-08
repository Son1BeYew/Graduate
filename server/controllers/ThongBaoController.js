const mongoose = require("mongoose");
const ThongBao = require("../models/ThongBao");

// Lấy tất cả thông báo
exports.getAll = async (req, res) => {
  try {
    const danhSach = await ThongBao.find({ hienThi: true }).sort({
      ngayDang: -1,
    });
    res.json(danhSach);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Không thể tải danh sách", detail: err.message });
  }
};

// Lấy chi tiết thông báo theo ID
exports.getById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  try {
    const bai = await ThongBao.findById(id);
    if (!bai)
      return res.status(404).json({ message: "Không tìm thấy thông báo" });
    res.json(bai);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server", detail: err.message });
  }
};

// Tạo thông báo mới
exports.create = async (req, res) => {
  try {
    const newPost = new ThongBao(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Không thể tạo thông báo", detail: err.message });
  }
};

// Cập nhật thông báo
exports.update = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  try {
    const updated = await ThongBao.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy để cập nhật" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật", detail: err.message });
  }
};

// Xoá thông báo
exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  try {
    await ThongBao.findByIdAndDelete(id);
    res.json({ message: "Đã xoá thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xoá", detail: err.message });
  }
};
