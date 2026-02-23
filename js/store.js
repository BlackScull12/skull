const productsEl = document.getElementById("products");
const countdownEl = document.getElementById("countdown");
const timeEl = document.getElementById("time");

const dropDate = localStorage.getItem("dropDate");
const forceOpen = localStorage.getItem("forceOpen") === "true";

const rates = {
  INR: { r: 1, s: "₹" },
  USD: { r: 0.012, s: "$" },
  EUR: { r: 0.011, s: "€" },
  GBP: { r: 0.0095, s: "£" },
  JPY: { r: 1.8, s: "¥" },
  DZD: { r: 1.6, s: "د" }
};

let currency = "INR";

document.getElementById("currency").onchange = e => {
  currency = e.target.value;
  render();
};

function isLive() {
  if (forceOpen) return true;
  if (!dropDate) return true;
  return new Date() >= new Date(dropDate);
}

function startCountdown() {
  if (!dropDate || forceOpen || isLive()) return;

  countdownEl.classList.remove("hidden");

  const t = setInterval(() => {
    const diff = new Date(dropDate) - new Date();

    if (diff <= 0) {
      clearInterval(t);
      countdownEl.classList.add("hidden");
      render();
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);

    timeEl.textContent = `${d}D ${h}H ${m}M ${s}S`;
  }, 1000);
}

function render() {
  productsEl.innerHTML = "";

  if (!isLive()) return;

  JSON.parse(localStorage.getItem("products") || "[]")
    .filter(p => p.active)
    .forEach(p => {
      productsEl.innerHTML += `
        <div class="product-card">
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p>${rates[currency].s}${Math.round(p.price * rates[currency].r)}</p>
          <a class="buy" href="checkout.html">BUY</a>
        </div>`;
    });
}

startCountdown();
render();
