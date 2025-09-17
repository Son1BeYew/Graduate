(() => {
  const input = document.getElementById("avatarInput");
  const preview = document.getElementById("previewAvatar");
  const saveBtn = document.getElementById("saveAvatarBtn");
  const nameSpan = document.getElementById("studentName");
  const statusText = document.getElementById("uploadStatus");

  const studentRaw = localStorage.getItem("studentInfo");
  const userRaw = localStorage.getItem("user");

  const student = studentRaw ? JSON.parse(studentRaw) : {};
  const user = userRaw ? JSON.parse(userRaw) : {};
  const username = user?.username;

  if (student?.fullname && nameSpan) {
    nameSpan.textContent = student.fullname;
  }

  let selectedFile = null;

  input?.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = "block";
        statusText.textContent = ""; // Xoá trạng thái cũ nếu có
      };
      reader.readAsDataURL(file);
    }
  });

  saveBtn?.addEventListener("click", async () => {
    if (!selectedFile) return alert("❌ Vui lòng chọn ảnh.");
    if (!username) return alert("❌ Không tìm thấy username.");

    statusText.textContent = "⏳ Đang lưu ảnh, vui lòng chờ...";

    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/api/thu-moi/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        statusText.textContent = "✅ Ảnh thư mời đã được lưu!";
        student.thuMoiImage = result.imageUrl;
        localStorage.setItem("studentInfo", JSON.stringify(student));
      } else {
        statusText.textContent =
          "❌ Lỗi server: " + (result.message || "Không rõ lỗi");
      }
    } catch (err) {
      console.error("❌ Lỗi khi gửi ảnh:", err);
      statusText.textContent = "❌ Không thể kết nối tới server.";
    }
  });
})();
