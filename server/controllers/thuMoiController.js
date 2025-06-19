const ThuMoi = require("../models/ThuMoi");

exports.createThuMoi = async (req, res) => {
  try {
    const { accountId } = req.body;          // lấy accountId từ body
    if (!req.file) {
      return res.status(400).json({ message: "Chưa có ảnh upload" });
    }
    const newThuMoi = await ThuMoi.create({
      account: accountId,                    // lưu vào field account
      imageUrl: req.file.path,
      cloudinary_id: req.file.filename,
    });
    res.status(201).json(newThuMoi);
  } catch (err) {
    console.error("createThuMoi error:", err);
    res.status(500).json({ message: "Lưu thư mời thất bại" });
  }
};
