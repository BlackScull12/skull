const ADMIN_PASS = "admin123"; // change this
const DROP_DATE = "2026-03-01T18:00:00";

document.getElementById("adminBubble")?.addEventListener("click", () => {
  const pass = prompt("Admin Password:");
  if (pass === ADMIN_PASS) {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  }
});

function isStoreOpen() {
  if (localStorage.getItem("admin") === "true") return true;
  return new Date() >= new Date(DROP_DATE);
}
