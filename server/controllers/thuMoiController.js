const fs = require("fs");
const path = require("path");
const ThuMoi = require("../models/thumoi");
const Account = require("../models/account");
const renderAndUploadHTML = require("../utils/renderAndUploadHTML.js");

exports.uploadThuMoi = async (req, res) => {
  try {
    console.log("========== 📥 BẮT ĐẦU XỬ LÝ THƯ MỜI ==========");
    console.log("📄 req.body:", JSON.stringify(req.body, null, 2));
    console.log("🖼 req.file:", JSON.stringify(req.file, null, 2));

    const username = req.body.username;
    if (!username)
      return res.status(400).send("Thiếu username trong dữ liệu gửi lên.");
    if (!req.file) return res.status(400).send("Không nhận được file ảnh.");

    const account = await Account.findOne({ username });
    if (!account)
      return res
        .status(404)
        .send(`Không tìm thấy tài khoản cho username: ${username}`);

    const imageUrl = req.file.path;
    console.log("✅ Đường dẫn ảnh đã upload:", imageUrl);

    const thuMoi = new ThuMoi({ accountId: account._id, imageUrl });
    await thuMoi.save();
    console.log("✅ Đã lưu thư mời vào MongoDB:", thuMoi._id.toString());

    // 🔄 Load HTML template và chèn biến động
    const templatePath = path.join(
      __dirname,
      "../templates/thuMoiTemplate.html"
    );
    let html = fs.readFileSync(templatePath, "utf8");
    html = html.replace("{{imageUrl}}", imageUrl);

    // 📷 Render thành ảnh và upload
    const renderedImageUrl = await renderAndUploadHTML(html);
    console.log("✅ Ảnh thư mời đã render và upload:", renderedImageUrl);

    res.status(200).json({
      message: "Tạo thư mời thành công",
      imageUrl: renderedImageUrl,
    });
  } catch (err) {
    console.error("❌ Lỗi tạo thư mời:", err);
    res.status(500).send(`
      <html>
        <head><title>Lỗi</title></head>
        <body>
          <h2>500 - Lỗi Server</h2>
          <p><strong>${err.message}</strong></p>
          <pre>${err.stack}</pre>
        </body>
      </html>
    `);
  }
};
exports.getThuMoi = async (req, res) => {
  try {
    const { username } = req.query;

    let query = {};
    if (username) {
      const account = await Account.findOne({ username });
      if (!account)
        return res.status(404).json({ message: "Không tìm thấy tài khoản." });
      query.accountId = account._id;
    }

    const thuMois = await ThuMoi.find(query)
      .populate("accountId", "username") // chỉ lấy username
      .sort({ createdAt: -1 });

    res.status(200).json(thuMois);
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách thư mời:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
