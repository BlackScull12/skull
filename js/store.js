const productsEl = document.getElementById("products");
const countdownEl = document.getElementById("countdown");
const timeEl = document.getElementById("time");

const forceOpen = localStorage.getItem("forceOpen") === "true";
const dropDate = localStorage.getItem("dropDate");

function isDropLive() {
  if (forceOpen) return true;
  if (!dropDate) return true;
  return new Date() >= new Date(dropDate);
}

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

function render() {
  productsEl.innerHTML = "";
  let products = JSON.parse(localStorage.getItem("products") || "[]")
    .filter(p => p.active);

  products.forEach(p => {
    productsEl.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${rates[currency].s}${Math.round(p.price * rates[currency].r)}</p>
        <a class="buy" href="checkout.html">BUY</a>
      </div>`;
  });
}

render();
