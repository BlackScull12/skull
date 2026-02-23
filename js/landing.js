const countdownEl = document.getElementById("countdown");
const timeEl = document.getElementById("time");
const enterBtn = document.getElementById("enterBtn");

const forceOpen = localStorage.getItem("forceOpen") === "true";
const dropDate = localStorage.getItem("dropDate");

function dropLive() {
  if (forceOpen) return true;
  if (!dropDate) return true;
  return new Date() >= new Date(dropDate);
}

function startCountdown() {
  if (!dropDate || forceOpen) return;

  countdownEl.classList.remove("hidden");

  const interval = setInterval(() => {
    const diff = new Date(dropDate) - new Date();

    if (diff <= 0) {
      clearInterval(interval);
      countdownEl.classList.add("hidden");
      enterBtn.classList.remove("hidden");
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    timeEl.textContent = `${d}D ${h}H ${m}M ${s}S`;
  }, 1000);
}

/* INIT */
if (dropLive()) {
  enterBtn.classList.remove("hidden");
} else {
  startCountdown();
}
