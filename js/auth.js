const ADMIN_PASS = "admin123";

document.getElementById("adminBubble")?.addEventListener("click", () => {
  const pass = prompt("Admin password:");
  if (pass === ADMIN_PASS) {
    localStorage.setItem("admin", "true");
    location.href = "admin.html";
  }
});
