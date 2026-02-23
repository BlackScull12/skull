// js/store.js
if (!isStoreOpen()) {
  document.getElementById("status").innerText = "DROP NOT LIVE";
  throw "";
}

fetch("data/products.json")
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById("products");
    data.forEach(p => {
      container.innerHTML += `
        <div class="card">
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <p>${p.price}</p>
          <a href="checkout.html">BUY</a>
        </div>`;
    });
  });
