function loadThongTin() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (!savedUser) {
    alert("Không có user");
    return;
  }

  fetch(`http://localhost:5000/api/student/${savedUser.username}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.message) {
        alert(data.message || "Không có dữ liệu");
        return;
      }

      document.getElementById("studentName").textContent =
        data.fullname || "...";
      document.getElementById("studentId").textContent =
        data.studentCode || "...";
      document.getElementById("studentEmail").textContent = data.email || "...";
      document.getElementById("educationProgram").textContent =
        data.educationProgram || "...";
      document.getElementById("educationLevel").textContent =
        data.educationLevel || "...";
      document.getElementById("faculty").textContent = data.faculty || "...";
      document.getElementById("studentClass").textContent =
        data.className || "...";
      document.getElementById("courseYear").textContent =
        data.courseYear || "...";

      if (data.avatar) {
        document.getElementById("studentAvatar").src = data.avatar;
      }
    })
    .catch((err) => {
      console.error("Lỗi khi lấy thông tin sinh viên:", err);
      alert("Không thể kết nối đến máy chủ.");
    });
}
