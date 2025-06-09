console.log(">> dangki.js bắt đầu chạy");

function initAvatarUpload() {
  const uploadInput = document.getElementById("uploadAvatar");
  const previewImage = document.getElementById("previewImage");

  if (!uploadInput || !previewImage) {
    console.warn("❌ Không tìm thấy #uploadAvatar hoặc #previewImage");
    return;
  }

  console.log("✅ Tìm thấy input và preview");

  uploadInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (ev) {
      console.log("📷 Đã chọn ảnh:", file.name);
      previewImage.src = ev.target.result;
    };

    reader.readAsDataURL(file);
  });
}

// Gọi khi HTML được render xong (vì script được load sau khi inject)
setTimeout(() => {
  initAvatarUpload();
}, 0);
