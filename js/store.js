const container = document.getElementById("products");

let products = JSON.parse(localStorage.getItem("products") || "[]");

// remove broken / incomplete products
products = products.filter(p =>
  p &&
  p.name &&
  p.price &&
  p.image &&
  p.image.startsWith("data:image")
);

// OPTIONAL: newest last (natural order)
products.forEach(renderProduct);

// OPTIONAL: newest first
// products.reverse().forEach(renderProduct);

function renderProduct(p) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p class="desc">${p.desc || ""}</p>
    <p class="price">${p.price}</p>
    <a class="buy" href="checkout.html">BUY</a>
  `;

  container.appendChild(card);
}

if (!products.length) {
  container.innerHTML = "<p class='empty'>NO PRODUCTS AVAILABLE</p>";
}
