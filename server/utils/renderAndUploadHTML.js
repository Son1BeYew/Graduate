const puppeteer = require("puppeteer");
const cloudinary = require("../config/cloudinary");

async function renderAndUploadHTML(html) {
  const browser = await puppeteer.launch({
    headless: "new", // hoặc true tùy máy
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const screenshot = await page.screenshot({ type: "jpeg", fullPage: true });
  await browser.close();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "thu-moi-da-ghep" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(screenshot);
  });
}

module.exports = renderAndUploadHTML;
