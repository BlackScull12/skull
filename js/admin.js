const dropZone = document.getElementById("dropZone");
const image = document.getElementById("image");
const preview = document.getElementById("preview");
const list = document.getElementById("productList");

dropZone.onclick = () => image.click();

image.onchange = () => {
  const r = new FileReader();
  r.onload = () => {
    preview.src = r.result;
    preview.style.display = "block";
  };
  r.readAsDataURL(image.files[0]);
};

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(p) {
  localStorage.setItem("products", JSON.stringify(p));
}

function saveProduct() {
  const p = {
    id: Date.now(),
    name: name.value,
    desc: desc.value,
    price: Number(price.value),
    image: preview.src,
    active: true
  };

  const products = getProducts();
  products.push(p);
  saveProducts(products);
  renderList();
}

function toggleProduct(id) {
  const p = getProducts();
  p.find(x => x.id === id).active ^= true;
  saveProducts(p);
  renderList();
}

function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
  renderList();
}

function renderList() {
  list.innerHTML = "";
  getProducts().forEach(p => {
    list.innerHTML += `
      <div class="admin-item">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <div class="toggle" onclick="toggleProduct(${p.id})">${p.active ? "ON" : "OFF"}</div>
        <div class="delete" onclick="deleteProduct(${p.id})">✕</div>
      </div>`;
  });
}

function saveDropDate() {
  localStorage.setItem("dropDate", dropDate.value);
}

function forceToggle() {
  localStorage.setItem("forceOpen",
    localStorage.getItem("forceOpen") !== "true"
  );
}

renderList();
