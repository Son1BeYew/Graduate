const Account = require("../models/account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// Đăng ký tài khoản
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body; //  thêm role
  try {
    const existingUser = await Account.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username hoặc email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new Account({
      username,
      email,
      password: hashedPassword,
      role: role || "user", //  gán role nếu có, không thì "user"
    });

    await newAccount.save();

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Đăng ký lỗi:", err);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};

//
// Khóa / Mở tài khoản bằng username
exports.lockAccount = async (req, res) => {
  try {
    const { username } = req.params; // lấy từ URL
    const { isLocked } = req.body; // true = khóa, false = mở

    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    user.isLocked = isLocked;
    await user.save();

    res.json({
      message: isLocked ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản",
      user,
    });
  } catch (error) {
    console.error("Lỗi lockAccount:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra khóa
    if (account.isLocked) {
      return res.status(403).json({ message: "Tài khoản đã bị khóa" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: account._id,
        username: account.username,
        email: account.email,
        role: account.role,
      },
    });
  } catch (err) {
    console.error("Lỗi login:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};
