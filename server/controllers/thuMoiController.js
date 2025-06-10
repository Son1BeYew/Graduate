const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const cloudinary = require("../config/cloudinary");
const ThuMoi = require("../models/thuMoi");
const stream = require("stream");

exports.uploadThuMoi = async (req, res) => {
  const { fullname, studentCode, avatarUrl } = req.body;
  const accountId = req.user._id; // Lấy từ middleware auth

  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/thuMoiTemplate.html"),
      { fullname, studentCode, avatarUrl }
    );

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html);
    const screenshot = await page.screenshot({ type: "png" });
    await browser.close();

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "thu-moi" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const newThuMoi = new ThuMoi({
          accountId,
          imageUrl: result.secure_url,
        });
        await newThuMoi.save();
        res.status(201).json({ imageUrl: result.secure_url });
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(screenshot);
    bufferStream.pipe(uploadStream);
  } catch (err) {
    console.error("Lỗi tạo thư mời:", err);
    res.status(500).json({ error: "Lỗi xử lý thư mời" });
  }
};
