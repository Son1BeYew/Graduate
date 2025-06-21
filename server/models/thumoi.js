  const mongoose = require("mongoose");

  const ThuMoiSchema = new mongoose.Schema({
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    imageUrl: { type: String, required: true }, // Đường dẫn ảnh trên Cloudinary
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model("ThuMoi", ThuMoiSchema);
