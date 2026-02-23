const container = document.getElementById("products");

let products = JSON.parse(localStorage.getItem("products") || "[]");
products = products.filter(p => p.active);

if (!products.length) {
  container.innerHTML = "<p class='empty'>STORE CLOSED</p>";
}

products.forEach(p => {
  container.innerHTML += `
    <div class="product-card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p class="desc">${p.desc || ""}</p>
      <p class="price">${p.price}</p>
      <a class="buy" href="checkout.html">BUY</a>
    </div>
  `;
});
