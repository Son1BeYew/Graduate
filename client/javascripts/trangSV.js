document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("user");
  const mssvSpan = document.getElementById("mssv");

  if (user) {
    const parsed = JSON.parse(user);
    mssvSpan.textContent = parsed.mssv || parsed.username || "Không rõ";
  } else {
    mssvSpan.textContent = "Chưa đăng nhập";
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

function loadSection(file, containerId) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById(containerId);
      container.innerHTML = html;

      // Gắn script thủ công sau khi nội dung được render
      if (file === "dangkitotnghiep.html") {
        setTimeout(() => {
          const script = document.createElement("script");
          script.src = "./javascripts/dangki.js";
          script.onload = () => console.log("✅ dangki.js loaded");
          document.body.appendChild(script);
        }, 100); // đợi DOM update xong
      }

      if (file === "thongtincanhan.html") {
        loadThongTin();
      }
    })
    .catch((err) => {
      document.getElementById(
        containerId
      ).innerHTML = `<p>Lỗi khi tải nội dung.</p>`;
      console.error("Lỗi khi load file:", err);
    });

  toggleMenu(false);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#info") {
    loadSection("trangchuSV.html", "info");
  }
});
