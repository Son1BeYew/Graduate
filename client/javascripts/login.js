document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("mssv").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Lưu token và thông tin người dùng
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Chuyển trang theo vai trò
        if (data.user.role === "admin") {
          window.location.href = "./adminDashboard.html";
        } else {
          window.location.href = "./trangSV.html#info";
        }
      } else {
        message.textContent = "❌ " + data.message;
      }
    } catch (err) {
      console.error("Lỗi:", err);
      message.textContent = "⚠️ Lỗi kết nối đến máy chủ.";
    }
  });
