function loadThuMoiSinhVien() {
  const data = localStorage.getItem("studentInfo");
  if (data) {
    try {
      const student = JSON.parse(data);
      const nameSpan = document.getElementById("studentName");
      if (student?.fullname && nameSpan) {
        nameSpan.textContent = student.fullname;
      }
    } catch (e) {
      console.error("Lỗi xử lý studentInfo:", e);
    }
  }
}
