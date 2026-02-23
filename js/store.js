const products = JSON.parse(localStorage.getItem("products") || "[]");
const container = document.getElementById("products");

if (!products.length) {
  container.innerHTML = "NO PRODUCTS YET";
}

products.forEach(p => {
  container.innerHTML += `
    <div class="card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p>${p.price}</p>
      <a href="checkout.html">BUY</a>
    </div>
  `;
});
