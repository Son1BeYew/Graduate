const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isLocked: { type: Boolean, default: false }, // cần thêm
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", AccountSchema);
