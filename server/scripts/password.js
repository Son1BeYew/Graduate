const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/account");
require("dotenv").config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const users = await User.find();
  for (const user of users) {
    if (!user.password.startsWith("$2a$")) {
      const hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;
      await user.save();
      console.log(`✅ Đã mã hóa mật khẩu cho: ${user.username}`);
    }
  }

  process.exit(0);
})();
