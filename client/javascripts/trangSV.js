document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("user");
  const mssvSpan = document.getElementById("mssv");

  if (user) {
    const parsed = JSON.parse(user);
    mssvSpan.textContent = parsed.mssv || parsed.username || "Không rõ";
  } else {
    mssvSpan.textContent = "Chưa đăng nhập";
  }

  // ✅ Tải mục info hoặc thumoi theo hash URL
  const hash = window.location.hash;
  if (hash === "#info") {
    loadSection("trangchuSV.html", "info");
  } else if (hash === "#thumoi") {
    loadSection("thumoi.html", "info");
  }
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "trangchu.html";
}

async function showSection(id) {
  const target = document.getElementById(id);

  if (target && !target.innerHTML.trim()) {
    const res = await fetch("thongtincanhan.html");
    const html = await res.text();
    target.innerHTML = html;
  }
  toggleMenu(false);
}
function loadSection(file, containerId, event) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById(containerId);
      container.innerHTML = html;

      // ✅ Tải script tương ứng sau khi innerHTML đã hoàn tất
      setTimeout(() => {
        if (file === "dangkitotnghiep.html") {
          const script = document.createElement("script");
          script.src = "./javascripts/dangki.js";
          script.onload = () => console.log("✅ dangki.js loaded");
          document.body.appendChild(script);
        }

        if (file.includes("thumoi.html")) {
          const script = document.createElement("script");
          script.src = "./javascripts/thumoi.js";
          script.onload = () => console.log("✅ thumoi.js loaded");
          document.body.appendChild(script);
        }

        if (
          file === "thongtincanhan.html" &&
          typeof loadThongTin === "function"
        ) {
          loadThongTin();
        }
      }, 50); // đợi DOM cập nhật xong mới gắn script

      // ✅ Cập nhật tên sinh viên nếu có
      const data = localStorage.getItem("studentInfo");
      if (data) {
        const student = JSON.parse(data);
        const span = document.getElementById("studentName");
        if (student?.fullname && span) {
          span.textContent = student.fullname;
        }
      }

      // ✅ Highlight menu đang active
      document
        .querySelectorAll(".side-menu a")
        .forEach((el) => el.classList.remove("active"));
      if (event?.currentTarget) event.currentTarget.classList.add("active");
    })
    .catch((err) => {
      document.getElementById(
        containerId
      ).innerHTML = `<p>Lỗi khi tải nội dung.</p>`;
      console.error("❌ Lỗi khi load file:", err);
    });

  toggleMenu(false);
}
